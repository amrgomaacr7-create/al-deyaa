import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Container, Stack } from "@/shared/ui";

type NewLessonPageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export default async function NewLessonPage({
  params,
}: NewLessonPageProps) {
  const { courseId } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.is_admin) {
    redirect("/");
  }

  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, title")
    .eq("id", courseId)
    .maybeSingle();

  if (courseError) {
    console.error("Failed to load course:", courseError);
  }

  if (!course) {
    notFound();
  }

  async function createLesson(formData: FormData) {
    "use server";

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile?.is_admin) {
      redirect("/");
    }

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

    const videoUrl = String(
      formData.get("video_url") ?? "",
    ).trim();

    const isPublished =
      formData.get("is_published") === "on";

    if (!title) {
      throw new Error("عنوان الدرس مطلوب.");
    }

    if (!Number.isInteger(lessonOrder) || lessonOrder < 1) {
      throw new Error(
        "ترتيب الدرس يجب أن يكون رقمًا صحيحًا يبدأ من 1.",
      );
    }

    const { error } = await supabase
      .from("lessons")
      .insert({
        course_id: courseId,
        title,
        description: description || null,
        lesson_order: lessonOrder,
        type,
        video_url: videoUrl || null,
        is_published: isPublished,
      });

    if (error) {
      console.error("Failed to create lesson:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      throw new Error(
        `حدث خطأ أثناء إنشاء الدرس: ${error.message}`,
      );
    }

    redirect(`/admin/courses/${courseId}/lessons`);
  }

  return (
    <main className="min-h-screen bg-background py-64">
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
              إضافة درس جديد
            </h1>

            <p className="mt-16 text-lg text-text-soft">
              إضافة درس جديد إلى كورس:
              {" "}
              <span className="font-semibold text-primary">
                {course.title}
              </span>
            </p>
          </div>

          <form
            action={createLesson}
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
                  placeholder="مثال: المبتدأ والخبر"
                  className="mt-8 h-48 w-full rounded-medium border border-border bg-background px-16 text-sm text-text outline-none transition-colors focus:border-primary"
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
                  placeholder="اكتب وصفًا مختصرًا للدرس..."
                  className="mt-8 w-full rounded-medium border border-border bg-background p-16 text-sm leading-7 text-text outline-none transition-colors focus:border-primary"
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
                    defaultValue="1"
                    required
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
                    defaultValue="video"
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
                  placeholder="https://youtube.com/..."
                  dir="ltr"
                  className="mt-8 h-48 w-full rounded-medium border border-border bg-background px-16 text-sm text-text outline-none transition-colors focus:border-primary"
                />

                <p className="mt-8 text-xs text-text-soft">
                  اتركه فارغًا إذا كان الدرس من نوع PDF أو نص.
                </p>
              </div>

              <div className="flex items-center gap-12">
                <input
                  id="is_published"
                  name="is_published"
                  type="checkbox"
                  defaultChecked
                  className="h-18 w-18 accent-primary"
                />

                <label
                  htmlFor="is_published"
                  className="text-sm font-semibold text-text"
                >
                  نشر الدرس للطلاب مباشرة
                </label>
              </div>

              <div className="flex flex-wrap gap-12 pt-8">
                <button
                  type="submit"
                  className="inline-flex h-48 items-center justify-center rounded-medium bg-primary px-24 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  إنشاء الدرس
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