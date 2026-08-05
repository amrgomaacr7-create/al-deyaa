import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Container, Stack } from "@/shared/ui";

type LessonsPageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export default async function AdminLessonsPage({
  params,
}: LessonsPageProps) {
  const { courseId } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

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

  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select(
      "id, title, description, level, category, is_published",
    )
    .eq("id", courseId)
    .maybeSingle();

  if (courseError) {
    console.error("Failed to load course:", courseError);
  }

  if (!course) {
    notFound();
  }

  const { data: lessons, error: lessonsError } = await supabase
    .from("lessons")
    .select(
      "id, course_id, title, description, lesson_order, type, video_url, is_published",
    )
    .eq("course_id", courseId)
    .order("lesson_order", { ascending: true });

  if (lessonsError) {
    console.error("Failed to load lessons:", lessonsError);
  }

  const courseLessons = lessons ?? [];

  async function deleteLesson(formData: FormData) {
    "use server";

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const { data: profile, error: profileError } = await supabase
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

    const lessonId = String(
      formData.get("lesson_id") ?? "",
    ).trim();

    if (!lessonId) {
      throw new Error("معرف الدرس غير موجود.");
    }

    const { error: deleteError } = await supabase
      .from("lessons")
      .delete()
      .eq("id", lessonId)
      .eq("course_id", courseId);

    if (deleteError) {
      console.error("Failed to delete lesson:", {
        message: deleteError.message,
        details: deleteError.details,
        hint: deleteError.hint,
        code: deleteError.code,
      });

      throw new Error(
        `حدث خطأ أثناء حذف الدرس: ${deleteError.message}`,
      );
    }

    redirect(`/admin/courses/${courseId}/lessons`);
  }

  return (
    <main className="min-h-screen bg-background py-64">
      <Container size="desktop">
        <Stack gap={32}>
          <Link
            href="/admin"
            className="w-fit text-sm font-semibold text-primary"
          >
            ← العودة إلى لوحة التحكم
          </Link>

          <div>
            <p className="text-sm font-semibold text-primary">
              إدارة المحتوى التعليمي
            </p>

            <h1 className="mt-12 text-4xl font-bold text-text">
              {course.title}
            </h1>

            <p className="mt-16 max-w-[800px] text-lg leading-8 text-text-soft">
              {course.description ||
                "لا يوجد وصف لهذا الكورس."}
            </p>
          </div>

          <div className="grid gap-16 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-24">
              <p className="text-sm text-text-soft">
                إجمالي الدروس
              </p>

              <p className="mt-8 text-3xl font-bold text-text">
                {courseLessons.length}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-24">
              <p className="text-sm text-text-soft">
                الدروس المنشورة
              </p>

              <p className="mt-8 text-3xl font-bold text-primary">
                {
                  courseLessons.filter(
                    (lesson) => lesson.is_published,
                  ).length
                }
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-24">
              <p className="text-sm text-text-soft">
                الدروس المخفية
              </p>

              <p className="mt-8 text-3xl font-bold text-text">
                {
                  courseLessons.filter(
                    (lesson) => !lesson.is_published,
                  ).length
                }
              </p>
            </div>
          </div>

          <section className="rounded-2xl border border-border bg-surface p-24">
            <div className="flex flex-col gap-16 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">
                  محتوى الكورس
                </p>

                <h2 className="mt-8 text-2xl font-bold text-text">
                  الدروس
                </h2>
              </div>

              <Link
                href={`/admin/courses/${courseId}/lessons/new`}
                className="inline-flex h-48 items-center justify-center rounded-medium bg-primary px-24 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                + إضافة درس جديد
              </Link>
            </div>

            <div className="mt-24 grid gap-16">
              {courseLessons.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-32 text-center">
                  <p className="font-semibold text-text">
                    لا توجد دروس حاليًا
                  </p>

                  <p className="mt-8 text-sm text-text-soft">
                    يمكنك إضافة أول درس لهذا الكورس من زر إضافة درس جديد.
                  </p>
                </div>
              ) : (
                courseLessons.map((lesson) => (
                  <article
                    key={lesson.id}
                    className="rounded-xl border border-border bg-background p-20"
                  >
                    <div className="flex flex-col gap-20 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start gap-16">
                        <div className="flex h-48 w-48 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {lesson.lesson_order}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-8">
                            <h3 className="text-lg font-bold text-text">
                              {lesson.title}
                            </h3>

                            <span
                              className={
                                lesson.is_published
                                  ? "rounded-full bg-primary/10 px-12 py-4 text-xs font-semibold text-primary"
                                  : "rounded-full bg-surface-raised px-12 py-4 text-xs font-semibold text-text-soft"
                              }
                            >
                              {lesson.is_published
                                ? "منشور"
                                : "مخفي"}
                            </span>
                          </div>

                          <p className="mt-8 text-sm text-text-soft">
                            {lesson.description ||
                              "لا يوجد وصف لهذا الدرس."}
                          </p>

                          <div className="mt-12 flex flex-wrap gap-12 text-xs text-text-soft">
                            <span>
                              النوع: {lesson.type || "غير محدد"}
                            </span>

                            <span>
                              الفيديو:{" "}
                              {lesson.video_url
                                ? "متاح"
                                : "غير متاح"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-8">
                        <Link
                          href={`/courses/${courseId}/lessons/${lesson.id}`}
                          className="inline-flex h-44 items-center justify-center rounded-medium border border-border px-16 text-sm font-semibold text-text transition-colors hover:bg-surface"
                        >
                          معاينة
                        </Link>

                        <Link
                          href={`/admin/courses/${courseId}/lessons/${lesson.id}/edit`}
                          className="inline-flex h-44 items-center justify-center rounded-medium border border-border px-16 text-sm font-semibold text-text transition-colors hover:bg-surface"
                        >
                          تعديل
                        </Link>

                        <form action={deleteLesson}>
                          <input
                            type="hidden"
                            name="lesson_id"
                            value={lesson.id}
                          />

                          <button
                            type="submit"
                            className="inline-flex h-44 items-center justify-center rounded-medium border border-red-500/30 px-16 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/10"
                          >
                            حذف
                          </button>
                        </form>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </Stack>
      </Container>
    </main>
  );
}