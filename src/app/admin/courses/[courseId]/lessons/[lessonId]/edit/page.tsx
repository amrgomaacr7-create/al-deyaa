
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Container, Stack } from "@/shared/ui";

type EditLessonPageProps = {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
};

const LESSON_FILES_BUCKET = "lesson-files";

const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
] as const;

function getFileExtension(fileName: string): string {
  const extension = fileName
    .split(".")
    .pop()
    ?.toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  return extension || "bin";
}

function isAllowedVideoType(file: File): boolean {
  return ALLOWED_VIDEO_TYPES.includes(
    file.type as (typeof ALLOWED_VIDEO_TYPES)[number],
  );
}

function isAllowedPdfType(file: File): boolean {
  return file.type === "application/pdf";
}

function isFileProvided(
  file: FormDataEntryValue | null,
): file is File {
  return (
    file instanceof File &&
    file.size > 0 &&
    file.name.trim().length > 0
  );
}

async function removeStorageFile(
  supabaseClient: Awaited<ReturnType<typeof createClient>>,
  filePath: string | null,
  label: string,
): Promise<void> {
  if (!filePath) {
    return;
  }

  const { error } = await supabaseClient.storage
    .from(LESSON_FILES_BUCKET)
    .remove([filePath]);

  if (error) {
    console.error(`Failed to remove old ${label}:`, error);
  }
}

function getStoragePublicUrl(
  supabaseClient: Awaited<ReturnType<typeof createClient>>,
  filePath: string | null,
): string | null {
  if (!filePath) {
    return null;
  }

  const { data } = supabaseClient.storage
    .from(LESSON_FILES_BUCKET)
    .getPublicUrl(filePath);

  return data.publicUrl || null;
}

export default async function EditLessonPage({
  params,
}: EditLessonPageProps) {
  const { courseId, lessonId } = await params;
  const supabase = await createClient();

  // 1. التحقق من المستخدم
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. التحقق من صلاحيات الأدمن
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Failed to load admin profile:", profileError);
  }

  if (!profile?.is_admin) {
    redirect("/");
  }

  // 3. جلب بيانات الكورس
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, title")
    .eq("id", courseId)
    .maybeSingle();

  if (courseError) console.error("Failed to load course:", courseError);
  if (!course) notFound();

  // 4. جلب بيانات الدرس
  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .select(`
        id,
        course_id,
        title,
        description,
        lesson_order,
        type,
        video_url,
        video_source,
        video_file_path,
        pdf_source,
        pdf_url,
        pdf_file_path,
        is_published
      `)
    .eq("id", lessonId)
    .eq("course_id", courseId)
    .maybeSingle();

  if (lessonError) console.error("Failed to load lesson:", lessonError);
  if (!lesson) notFound();

  const currentLesson = lesson;

  // جلب الروابط الحالية وعرضها
  const existingVideoUrl = getStoragePublicUrl(supabase, currentLesson.video_file_path);
  const existingPdfUrl = getStoragePublicUrl(supabase, currentLesson.pdf_file_path);

  // دالة الحفظ
  async function updateLesson(formData: FormData) {
    "use server";
    // تعريف عميل جديد مخصص للـ Server Action
    const supabaseAction = await createClient();

    const { data: { user } } = await supabaseAction.auth.getUser();
    if (!user) redirect("/login");

    const { data: adminProfile } = await supabaseAction
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .maybeSingle();

    if (!adminProfile?.is_admin) redirect("/");

    // استخراج وتجهيز البيانات
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const lessonOrder = Number(formData.get("lesson_order") ?? 1);
    const type = String(formData.get("type") ?? "video").trim();
    const videoSource = currentLesson.video_source ?? "upload";
    const pdfSource = currentLesson.pdf_source ?? "upload";
    const isPublished = formData.get("is_published") === "on";

    const videoFile = formData.get("video_file");
    const pdfFile = formData.get("pdf_file");

    // التحقق من صحة البيانات
    if (!title) throw new Error("عنوان الدرس مطلوب.");
    if (!Number.isInteger(lessonOrder) || lessonOrder < 1) throw new Error("ترتيب الدرس يجب أن يكون رقمًا صحيحًا يبدأ من 1.");
    if (!["video", "pdf", "text"].includes(type)) throw new Error("نوع الدرس غير صالح.");
    if (type === "video" && !["url", "upload"].includes(videoSource)) throw new Error("مصدر الفيديو غير صالح.");
if (
  type === "pdf" &&
  !currentLesson.pdf_file_path &&
  !isFileProvided(pdfFile)
) {
  throw new Error("يجب رفع ملف PDF لأول مرة.");
}
    
    if (videoSource === "upload" && isFileProvided(videoFile) && !isAllowedVideoType(videoFile)) {
      throw new Error("نوع ملف الفيديو غير مدعوم. استخدم MP4 أو WebM أو OGG أو MOV.");
    }
    if (pdfSource === "upload" && isFileProvided(pdfFile) && !isAllowedPdfType(pdfFile)) {
      throw new Error("يجب رفع ملف PDF فقط.");
    }

   // المتغيرات النهائية
let finalVideoUrl: string | null = null;
const  finalVideoSource = "upload";
let finalVideoFilePath: string | null = null;

let finalPdfUrl: string | null = null;
let finalPdfSource = "upload";
let finalPdfFilePath: string | null = null;

// --- معالجة الفيديو ---
if (type === "video" && isFileProvided(videoFile)) {
  const safeExtension = getFileExtension(videoFile.name);

  const videoPath = `lessons/${lessonId}/video/${crypto.randomUUID()}.${safeExtension}`;

  const { error: uploadError } = await supabaseAction.storage
    .from(LESSON_FILES_BUCKET)
    .upload(videoPath, videoFile, {
      cacheControl: "3600",
      upsert: false,
      contentType: videoFile.type,
    });

  if (uploadError) {
    throw new Error(`فشل رفع الفيديو: ${uploadError.message}`);
  }

  if (currentLesson.video_file_path) {
    await removeStorageFile(
      supabaseAction,
      currentLesson.video_file_path,
      "video",
    );
  }

  const { data } = supabaseAction.storage
    .from(LESSON_FILES_BUCKET)
    .getPublicUrl(videoPath);

  finalVideoUrl = data.publicUrl;
  finalVideoFilePath = videoPath;
}

// --- معالجة الـ PDF ---
if (type === "pdf") {
  if (isFileProvided(pdfFile)) {
    const safeExtension = getFileExtension(pdfFile.name);

    const pdfPath = `lessons/${lessonId}/pdf/${crypto.randomUUID()}.${safeExtension}`;

    const { error: uploadError } = await supabaseAction.storage
      .from(LESSON_FILES_BUCKET)
      .upload(pdfPath, pdfFile, {
        cacheControl: "3600",
        upsert: false,
        contentType: "application/pdf",
      });

    if (uploadError) {
      throw new Error(`فشل رفع ملف PDF: ${uploadError.message}`);
    }

    if (currentLesson.pdf_file_path) {
      await removeStorageFile(
        supabaseAction,
        currentLesson.pdf_file_path,
        "PDF",
      );
    }

    const { data } = supabaseAction.storage
      .from(LESSON_FILES_BUCKET)
      .getPublicUrl(pdfPath);

    finalPdfUrl = data.publicUrl;
    finalPdfFilePath = pdfPath;
  } else {
    finalPdfUrl = currentLesson.pdf_url;
    finalPdfFilePath = currentLesson.pdf_file_path;
    finalPdfSource = currentLesson.pdf_source ?? "upload";
  }
} else {
  if (currentLesson.pdf_file_path) {
    await removeStorageFile(
      supabaseAction,
      currentLesson.pdf_file_path,
      "PDF",
    );
  }

  finalPdfUrl = null;
  finalPdfSource = "upload";
  finalPdfFilePath = null;
}

    // تحديث قاعدة البيانات
    const { error: updateError } = await supabaseAction
      .from("lessons")
      .update({
        title,
        description: description || null,
        lesson_order: lessonOrder,
        type,
       video_url: finalVideoUrl,
       video_source: finalVideoSource,
       video_file_path: finalVideoFilePath,

       pdf_url: finalPdfUrl,
       pdf_source: finalPdfSource,
       pdf_file_path: finalPdfFilePath,
        is_published: isPublished,
      })
      .eq("id", lessonId)
      .eq("course_id", courseId);

    if (updateError) {
      throw new Error(`حدث خطأ أثناء تعديل الدرس: ${updateError.message}`);
    }

    redirect(`/admin/courses/${courseId}/lessons`);
  }

  return (
    <main dir="rtl" className="min-h-screen bg-background py-64">
      <Container size="desktop">
        <Stack gap={32}>
          <Link
            href={`/admin/courses/${courseId}/lessons`}
            className="w-fit text-sm font-semibold text-primary"
          >
            ← العودة إلى دروس الكورس
          </Link>

          <div>
            <p className="text-sm font-semibold text-primary">
              لوحة تحكم الضياء
            </p>
            <h1 className="mt-12 text-4xl font-bold text-text">
              تعديل الدرس
            </h1>
            <p className="mt-16 text-lg text-text-soft">
              تعديل درس داخل كورس:{" "}
              <span className="font-semibold text-primary">
                {course.title}
              </span>
            </p>
          </div>

          <form
            action={updateLesson}
            className="rounded-2xl border border-border bg-surface p-24 sm:p-32"
          >
            <Stack gap={24}>
              <div>
                <label
                  htmlFor="title"
                  className="text-sm font-semibold text-text"
                >
                  عنوان الدرس
                </label>
               <input 
                  id="title"
                  name="title"
                  type="text"
                  required
                  defaultValue={currentLesson.title}
                  className="mt-8 h-48 w-full rounded-medium border border-border bg-background px-16 text-sm text-text outline-none focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-text"
                >
                  وصف الدرس
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  defaultValue={currentLesson.description ?? ""}
                  className="mt-8 w-full rounded-medium border border-border bg-background p-16 text-sm leading-7 text-text outline-none focus:border-primary"
                />
              </div>

              <div className="grid gap-24 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="lesson_order"
                    className="text-sm font-semibold text-text"
                  >
                    ترتيب الدرس
                  </label>
                  <input
                    id="lesson_order"
                    name="lesson_order"
                    type="number"
                    min="1"
                    required
                    defaultValue={currentLesson.lesson_order}
                    className="mt-8 h-48 w-full rounded-medium border border-border bg-background px-16 text-sm text-text outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="text-sm font-semibold text-text"
                  >
                    نوع الدرس
                  </label>
                  <select
                    id="type"   
                    name="type"
                    defaultValue={currentLesson.type ?? "video"}
                    className="mt-8 h-48 w-full rounded-medium border border-border bg-background px-16 text-sm text-text outline-none focus:border-primary"
                  >
                    <option value="video">فيديو</option>
                    <option value="pdf">PDF</option>
                    <option value="text">نص</option>
                  </select>
                </div>
              </div>

              <div className="rounded-xl border border-border p-20">
                <h2 className="text-lg font-bold text-text">إعدادات الفيديو</h2>

                {currentLesson.video_file_path && existingVideoUrl && (
                     
<div className="mt-20">
                    <p className="mb-12 text-sm font-semibold text-primary">
                      فيديو مرفوع حاليًا
                    </p>
                    <video
                      src={existingVideoUrl}
                      controls
                      className="h-[400px] w-full rounded-xl border border-border bg-black"
                    />
                    <div className="mt-12 flex flex-wrap gap-12">
                      <a
                        href={existingVideoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-44 items-center justify-center rounded-medium bg-primary px-20 text-sm font-semibold text-primary-foreground"
                      >
                        فتح الفيديو
                      </a>
                      <span className="flex items-center text-xs text-text-soft">
                        الملف: {currentLesson.video_file_path}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-20">
                  <label
                    htmlFor="video_file"
                    className="text-sm font-semibold text-text"
                  >
                    رفع فيديو جديد
                  </label>
                  <input
                    id="video_file"
                    name="video_file"
                    type="file"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime"
                    className="mt-8 block w-full rounded-medium border border-border bg-background p-12 text-sm text-text"
                  />
                  <p className="mt-8 text-xs text-text-soft">
                    اترك الحقل فارغًا للاحتفاظ بالفيديو الحالي.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border p-20">
                <h2 className="text-lg font-bold text-text">إعدادات PDF</h2>

                {currentLesson.pdf_file_path && existingPdfUrl && (
                  <div className="mt-20">
                    <p className="mb-12 text-sm font-semibold text-primary">
                      ملف PDF المرفوع حاليًا
                    </p>
                    <iframe
                      src={existingPdfUrl}
                      title="PDF Preview"
                      className="h-[600px] w-full rounded-xl border border-border bg-white"
                    />
                    <div className="mt-12 flex flex-wrap gap-12">
                      <a
                        href={existingPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-44 items-center justify-center rounded-medium bg-primary px-20 text-sm font-semibold text-primary-foreground"
                      >
                        فتح ملف PDF
                      </a>
                      <span className="flex items-center text-xs text-text-soft">
                        الملف: {currentLesson.pdf_file_path}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-20">
                  <label
                    htmlFor="pdf_file"
                    className="text-sm font-semibold text-text"
                  >
                    رفع ملف PDF جديد
                  </label>
                  <input
                    id="pdf_file"
                    name="pdf_file"
                    type="file"
                    accept="application/pdf,.pdf"
                    className="mt-8 block w-full rounded-medium border border-border bg-background p-12 text-sm text-text"
                  />
                  <p className="mt-8 text-xs text-text-soft">
                    اترك الحقل فارغًا للاحتفاظ بملف PDF الحالي.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <input
                  id="is_published"
                  name="is_published"
                  type="checkbox"
                  defaultChecked={currentLesson.is_published}
                  className="h-18 w-18 accent-primary"
                />
                <label
                  htmlFor="is_published"
                  className="text-sm font-semibold text-text"
                >
                  نشر الدرس للطلاب
                </label>
              </div>

              <div className="flex flex-wrap gap-12 pt-8">
                <button
                  type="submit"
                  className="inline-flex h-48 items-center justify-center rounded-medium bg-primary px-24 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  حفظ التعديلات
                </button>

                <Link
                  href={`/admin/courses/${courseId}/lessons`}
                  className="inline-flex h-48 items-center justify-center rounded-medium border border-border px-24 text-sm font-semibold text-text transition-colors hover:bg-background"
                >
                  إلغاء
                </Link>
              </div>
            </Stack>
          </form>
        </Stack>
      </Container>
    </main>
  );
}