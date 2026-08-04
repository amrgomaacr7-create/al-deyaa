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

function getFileExtension(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase();
  return extension || "bin";
}

function isAllowedVideoType(file: File) {
  return [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/quicktime",
  ].includes(file.type);
}

function isAllowedPdfType(file: File) {
  return file.type === "application/pdf";
}

function isFileProvided(
  file: FormDataEntryValue | null,
): file is File {
  return (
    file instanceof File &&
    file.size > 0 &&
    file.name.length > 0
  );
}

export default async function EditLessonPage({
  params,
}: EditLessonPageProps) {
  const { courseId, lessonId } = await params;

  const supabase = await createClient();

  // ================================
  // Authentication
  // ================================

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // ================================
  // Admin Check
  // ================================

  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .maybeSingle();

  if (profileError) {
    console.error(
      "Failed to load admin profile:",
      profileError,
    );
  }

  if (!profile?.is_admin) {
    redirect("/");
  }

  // ================================
  // Load Course
  // ================================

  const { data: course, error: courseError } =
    await supabase
      .from("courses")
      .select("id, title")
      .eq("id", courseId)
      .maybeSingle();

  if (courseError) {
    console.error(
      "Failed to load course:",
      courseError,
    );
  }

  if (!course) {
    notFound();
  }

  // ================================
  // Load Lesson
  // ================================

  const { data: lesson, error: lessonError } =
    await supabase
      .from("lessons")
      .select(
        `
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
        `,
      )
      .eq("id", lessonId)
      .eq("course_id", courseId)
      .maybeSingle();

  if (lessonError) {
    console.error(
      "Failed to load lesson:",
      lessonError,
    );
  }

  // مهم جدًا:
  // بعد هذا الشرط TypeScript يعرف أن lesson موجود
  if (!lesson) {
  notFound();
}

const currentLesson = lesson;

  // ================================
  // Update Lesson
  // ================================

  async function updateLesson(formData: FormData) {
    "use server";

    const supabase = await createClient();

    // ================================
    // Authentication
    // ================================

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    // ================================
    // Admin Check
    // ================================

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile?.is_admin) {
      redirect("/");
    }

    // ================================
    // Basic Fields
    // ================================

    const title = String(
      formData.get("title") ?? "",
    ).trim();

    const description = String(
      formData.get("description") ?? "",
    ).trim();

    const lessonOrder = Number(
      formData.get("lesson_order") ?? 1,
    );

    const type = String(
      formData.get("type") ?? "video",
    ).trim();

    const videoSource = String(
      formData.get("video_source") ?? "url",
    ).trim();

    const videoUrl = String(
      formData.get("video_url") ?? "",
    ).trim();

    const pdfSource = String(
      formData.get("pdf_source") ?? "url",
    ).trim();

    const pdfUrl = String(
      formData.get("pdf_url") ?? "",
    ).trim();

    const isPublished =
      formData.get("is_published") === "on";

    const videoFile = formData.get("video_file");

    const pdfFile = formData.get("pdf_file");

    // ================================
    // Validation
    // ================================

    if (!title) {
      throw new Error("عنوان الدرس مطلوب.");
    }

    if (
      !Number.isInteger(lessonOrder) ||
      lessonOrder < 1
    ) {
      throw new Error(
        "ترتيب الدرس يجب أن يكون رقمًا صحيحًا يبدأ من 1.",
      );
    }

    if (
      type === "video" &&
      videoSource === "url" &&
      !videoUrl
    ) {
      throw new Error(
        "يجب إدخال رابط الفيديو.",
      );
    }

    if (
      type === "pdf" &&
      pdfSource === "url" &&
      !pdfUrl
    ) {
      throw new Error(
        "يجب إدخال رابط ملف PDF.",
      );
    }

    if (
      videoSource === "upload" &&
      isFileProvided(videoFile) &&
      !isAllowedVideoType(videoFile)
    ) {
      throw new Error(
        "نوع ملف الفيديو غير مدعوم. استخدم MP4 أو WebM أو OGG أو MOV.",
      );
    }

    if (
      pdfSource === "upload" &&
      isFileProvided(pdfFile) &&
      !isAllowedPdfType(pdfFile)
    ) {
      throw new Error(
        "يجب رفع ملف PDF فقط.",
      );
    }

    // ================================
    // Initialize Final Values
    // ================================

    let finalVideoUrl =
      currentLesson.video_url ?? "";

    let finalVideoSource =
      currentLesson.video_source ?? "url";

    let finalVideoFilePath =
     currentLesson.video_file_path ?? null;

    let finalPdfUrl =
     currentLesson.pdf_url ?? "";

    let finalPdfSource =
     currentLesson.pdf_source ?? "url";

    let finalPdfFilePath =
      currentLesson.pdf_file_path ?? null;

    // ================================
    // Video URL Mode
    // ================================

    if (
      type === "video" &&
      videoSource === "url"
    ) {
      finalVideoSource = "url";
      finalVideoUrl = videoUrl;
      finalVideoFilePath = null;

      // حذف الفيديو القديم من Storage
      if (currentLesson.video_file_path) {
  const {
    error: removeOldVideoError,
  } = await supabase.storage
    .from(LESSON_FILES_BUCKET)
    .remove([
      currentLesson.video_file_path,
    ]);

  if (removeOldVideoError) {
    console.error(
      "Failed to remove old video:",
      removeOldVideoError,
    );
  }
}
    }

    // ================================
    // Video Upload Mode
    // ================================

    if (
      type === "video" &&
      videoSource === "upload"
    ) {
      finalVideoSource = "upload";

      if (isFileProvided(videoFile)) {
        const safeExtension =
          getFileExtension(videoFile.name);

        const videoPath =
          `lessons/${lessonId}/video/${crypto.randomUUID()}.${safeExtension}`;

        const {
          error: uploadError,
        } = await supabase.storage
          .from(LESSON_FILES_BUCKET)
          .upload(
            videoPath,
            videoFile,
            {
              cacheControl: "3600",
              upsert: false,
              contentType: videoFile.type,
            },
          );

        if (uploadError) {
          console.error(
            "Failed to upload video:",
            uploadError,
          );

          throw new Error(
            `فشل رفع الفيديو: ${uploadError.message}`,
          );
        }

        // حذف الفيديو القديم بعد نجاح الرفع
        if (currentLesson.video_file_path) {
  const {
    error: removeOldVideoError,
  } = await supabase.storage
    .from(LESSON_FILES_BUCKET)
    .remove([
      currentLesson.video_file_path,
    ]);

  if (removeOldVideoError) {
    console.error(
      "Failed to remove old video:",
      removeOldVideoError,
    );
  }
}

        const {
          data: publicVideoData,
        } = supabase.storage
          .from(LESSON_FILES_BUCKET)
          .getPublicUrl(videoPath);

        finalVideoFilePath =
          videoPath;

        finalVideoUrl =
          publicVideoData.publicUrl;
      }
    }

    // ================================
    // PDF URL Mode
    // ================================

    if (
      type === "pdf" &&
      pdfSource === "url"
    ) {
      finalPdfSource = "url";
      finalPdfUrl = pdfUrl;
      finalPdfFilePath = null;

      // حذف ملف PDF القديم
      if (currentLesson.pdf_file_path) {
  const {
    error: removeOldPdfError,
  } = await supabase.storage
    .from(LESSON_FILES_BUCKET)
    .remove([
      currentLesson.pdf_file_path,
    ]);

  if (removeOldPdfError) {
    console.error(
      "Failed to remove old PDF:",
      removeOldPdfError,
    );
  }
}
    }

    // ================================
    // PDF Upload Mode
    // ================================

    if (
      type === "pdf" &&
      pdfSource === "upload"
    ) {
      finalPdfSource = "upload";

      if (isFileProvided(pdfFile)) {
        const safeExtension =
          getFileExtension(pdfFile.name);

        const pdfPath =
          `lessons/${lessonId}/pdf/${crypto.randomUUID()}.${safeExtension}`;

        const {
          error: uploadError,
        } = await supabase.storage
          .from(LESSON_FILES_BUCKET)
          .upload(
            pdfPath,
            pdfFile,
            {
              cacheControl: "3600",
              upsert: false,
              contentType:
                "application/pdf",
            },
          );

        if (uploadError) {
          console.error(
            "Failed to upload PDF:",
            uploadError,
          );

          throw new Error(
            `فشل رفع ملف PDF: ${uploadError.message}`,
          );
        }

        // حذف ملف PDF القديم بعد نجاح الرفع
        if (currentLesson.pdf_file_path) {
  const {
    error: removeOldPdfError,
  } = await supabase.storage
    .from(LESSON_FILES_BUCKET)
    .remove([
      currentLesson.pdf_file_path,
    ]);

  if (removeOldPdfError) {
    console.error(
      "Failed to remove old PDF:",
      removeOldPdfError,
    );
  }
}

        const {
          data: publicPdfData,
        } = supabase.storage
          .from(LESSON_FILES_BUCKET)
          .getPublicUrl(pdfPath);

        finalPdfFilePath =
          pdfPath;

        finalPdfUrl =
          publicPdfData.publicUrl;
      }
    }

    // ================================
    // Clear Unused Content
    // ================================

    if (type !== "video") {
      finalVideoUrl = "";
      finalVideoSource = "url";
      finalVideoFilePath = null;
    }

    if (type !== "pdf") {
      finalPdfUrl = "";
      finalPdfSource = "url";
      finalPdfFilePath = null;
    }

    // ================================
    // Update Database
    // ================================

    const {
      error,
    } = await supabase
      .from("lessons")
      .update({
        title,
        description:
          description || null,

        lesson_order:
          lessonOrder,

        type,

        video_url:
          finalVideoUrl || null,

        video_source:
          finalVideoSource,

        video_file_path:
          finalVideoFilePath,

        pdf_source:
          finalPdfSource,

        pdf_url:
          finalPdfUrl || null,

        pdf_file_path:
          finalPdfFilePath,

        is_published:
          isPublished,
      })
      .eq("id", lessonId)
      .eq("course_id", courseId);

    if (error) {
      console.error(
        "Failed to update lesson:",
        {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
      );

      throw new Error(
        `حدث خطأ أثناء تعديل الدرس: ${error.message}`,
      );
    }

    // ================================
    // Redirect
    // ================================

    redirect(
      `/admin/courses/${courseId}/lessons`,
    );
  }

  return (
    <main className="min-h-screen bg-background py-64">
      <Container size="desktop">
        <Stack gap={32}>

          {/* Back */}
          <Link
            href={`/admin/courses/${courseId}/lessons`}
            className="w-fit text-sm font-semibold text-primary"
          >
            ← العودة إلى دروس الكورس
          </Link>

          {/* Header */}
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

          {/* Form */}
          <form
            action={updateLesson}
            encType="multipart/form-data"
            className="rounded-2xl border border-border bg-surface p-24 sm:p-32"
          >
            <Stack gap={24}>

              {/* Title */}
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
                  defaultValue={lesson.title}
                  className="mt-8 h-48 w-full rounded-medium border border-border bg-background px-16 text-sm text-text outline-none transition-colors focus:border-primary"
                />
              </div>

              {/* Description */}
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
                  defaultValue={
                    lesson.description ?? ""
                  }
                  className="mt-8 w-full rounded-medium border border-border bg-background p-16 text-sm leading-7 text-text outline-none transition-colors focus:border-primary"
                />
              </div>

              {/* Order + Type */}
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
                    defaultValue={
                      lesson.lesson_order
                    }
                    className="mt-8 h-48 w-full rounded-medium border border-border bg-background px-16 text-sm text-text outline-none transition-colors focus:border-primary"
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
                    defaultValue={
                      lesson.type || "video"
                    }
                    className="mt-8 h-48 w-full rounded-medium border border-border bg-background px-16 text-sm text-text outline-none transition-colors focus:border-primary"
                  >
                    <option value="video">
                      فيديو
                    </option>

                    <option value="pdf">
                      PDF
                    </option>

                    <option value="text">
                      نص
                    </option>
                  </select>
                </div>

              </div>

              {/* Video Source */}
              <div>
                <label
                  htmlFor="video_source"
                  className="text-sm font-semibold text-text"
                >
                  مصدر الفيديو
                </label>

                <select
                  id="video_source"
                  name="video_source"
                  defaultValue={
                    lesson.video_source || "url"
                  }
                  className="mt-8 h-48 w-full rounded-medium border border-border bg-background px-16 text-sm text-text outline-none transition-colors focus:border-primary"
                >
                  <option value="url">
                    رابط فيديو
                  </option>

                  <option value="upload">
                    رفع فيديو إلى المنصة
                  </option>
                </select>
              </div>

              {/* Video URL */}
              <div>
                <label
                  htmlFor="video_url"
                  className="text-sm font-semibold text-text"
                >
                  رابط الفيديو
                </label>

                <input
                  id="video_url"
                  name="video_url"
                  type="url"
                  defaultValue={
                    lesson.video_url ?? ""
                  }
                  placeholder="https://youtube.com/..."
                  dir="ltr"
                  className="mt-8 h-48 w-full rounded-medium border border-border bg-background px-16 text-sm text-text outline-none transition-colors focus:border-primary"
                />

                <p className="mt-8 text-xs text-text-soft">
                  استخدم هذا الحقل إذا اخترت مصدر الفيديو: رابط فيديو.
                </p>
              </div>

              {/* Video Upload */}
              <div>
                <label
                  htmlFor="video_file"
                  className="text-sm font-semibold text-text"
                >
                  رفع فيديو
                </label>

                <input
                  id="video_file"
                  name="video_file"
                  type="file"
                  accept="video/mp4,video/webm,video/ogg,video/quicktime"
                  className="mt-8 block w-full rounded-medium border border-border bg-background p-12 text-sm text-text"
                />

                <p className="mt-8 text-xs text-text-soft">
                  يمكنك رفع فيديو MP4 أو WebM أو OGG أو MOV.
                  اتركه فارغًا للاحتفاظ بالفيديو الحالي.
                </p>

                {lesson.video_file_path && (
                  <p className="mt-8 text-xs text-primary">
                    يوجد فيديو مرفوع حاليًا لهذا الدرس.
                  </p>
                )}
              </div>

              {/* PDF Source */}
              <div>
                <label
                  htmlFor="pdf_source"
                  className="text-sm font-semibold text-text"
                >
                  مصدر ملف PDF
                </label>

                <select
                  id="pdf_source"
                  name="pdf_source"
                  defaultValue={
                    lesson.pdf_source || "url"
                  }
                  className="mt-8 h-48 w-full rounded-medium border border-border bg-background px-16 text-sm text-text outline-none transition-colors focus:border-primary"
                >
                  <option value="url">
                    رابط PDF
                  </option>

                  <option value="upload">
                    رفع PDF إلى المنصة
                  </option>
                </select>
              </div>

              {/* PDF URL */}
              <div>
                <label
                  htmlFor="pdf_url"
                  className="text-sm font-semibold text-text"
                >
                  رابط ملف PDF
                </label>

                <input
                  id="pdf_url"
                  name="pdf_url"
                  type="url"
                  defaultValue={
                    lesson.pdf_url ?? ""
                  }
                  placeholder="https://example.com/file.pdf"
                  dir="ltr"
                  className="mt-8 h-48 w-full rounded-medium border border-border bg-background px-16 text-sm text-text outline-none transition-colors focus:border-primary"
                />

                <p className="mt-8 text-xs text-text-soft">
                  استخدم هذا الحقل إذا اخترت مصدر PDF: رابط.
                </p>
              </div>

              {/* PDF Upload */}
              <div>
                <label
                  htmlFor="pdf_file"
                  className="text-sm font-semibold text-text"
                >
                  رفع ملف PDF
                </label>

                <input
                  id="pdf_file"
                  name="pdf_file"
                  type="file"
                  accept="application/pdf,.pdf"
                  className="mt-8 block w-full rounded-medium border border-border bg-background p-12 text-sm text-text"
                />

                <p className="mt-8 text-xs text-text-soft">
                  يمكنك رفع ملف PDF مباشرة إلى منصة الضياء.
                  اتركه فارغًا للاحتفاظ بالملف الحالي.
                </p>

                {lesson.pdf_file_path && (
                  <p className="mt-8 text-xs text-primary">
                    يوجد ملف PDF مرفوع حاليًا لهذا الدرس.
                  </p>
                )}
              </div>

              {/* Published */}
              <div className="flex items-center gap-12">
                <input
                  id="is_published"
                  name="is_published"
                  type="checkbox"
                  defaultChecked={
                    lesson.is_published
                  }
                  className="h-18 w-18 accent-primary"
                />

                <label
                  htmlFor="is_published"
                  className="text-sm font-semibold text-text"
                >
                  نشر الدرس للطلاب
                </label>
              </div>

              {/* Buttons */}
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