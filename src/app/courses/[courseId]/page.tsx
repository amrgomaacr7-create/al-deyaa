import Link from "next/link";

import { CourseProgress } from "@/features/courses";
import { createClient } from "@/lib/supabase/server";
import { Container, Stack } from "@/shared/ui";

type CourseDetailsPageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

type Lesson = {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  lesson_order: number;
  type: string;
  video_url: string | null;
  is_published: boolean;
};

export default async function CourseDetailsPage({
  params,
}: CourseDetailsPageProps) {
  const { courseId } = await params;

  const supabase = await createClient();

  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, title, description, level, category")
    .eq("id", courseId)
    .eq("is_published", true)
    .maybeSingle();

  if (courseError) {
    console.error("Failed to load course:", courseError);
  }

  if (!course) {
    return (
      <main className="min-h-screen bg-background py-64">
        <Container size="desktop">
          <Stack gap={24}>
            <h1 className="text-4xl font-bold text-text">
              الكورس غير موجود
            </h1>

            <p className="text-lg text-text-soft">
              عذرًا، لم نتمكن من العثور على الكورس المطلوب.
            </p>

            <Link
              href="/courses"
              className="inline-flex h-48 w-fit items-center justify-center rounded-medium bg-primary px-24 text-sm font-semibold text-primary-foreground transition-colors duration-fast hover:bg-primary-hover"
            >
              العودة إلى الكورسات
            </Link>
          </Stack>
        </Container>
      </main>
    );
  }

  const { data: lessons, error: lessonsError } = await supabase
    .from("lessons")
    .select(
      "id, course_id, title, description, lesson_order, type, video_url, is_published",
    )
    .eq("course_id", course.id)
    .eq("is_published", true)
    .order("lesson_order", { ascending: true });

  if (lessonsError) {
    console.error("Failed to load lessons:", lessonsError);
  }

  const courseLessons: Lesson[] = lessons ?? [];

const progressLessons = courseLessons.map((lesson) => ({
  id: lesson.id,
  title: lesson.title,
  order: lesson.lesson_order,
}));

  return (
    <main className="min-h-screen bg-background py-64">
      <Container size="desktop">
        <Stack gap={48}>
          <CourseProgress
  lessons={progressLessons}
/>

          <Link
            href="/courses"
            className="w-fit text-sm font-semibold text-primary"
          >
            ← العودة إلى الكورسات
          </Link>

          <div className="max-w-[800px]">
            <p className="text-sm font-semibold text-primary">
              {course.category}
            </p>

            <h1 className="mt-12 text-4xl font-bold text-text sm:text-5xl">
              {course.title}
            </h1>

            <p className="mt-20 text-lg leading-8 text-text-soft">
              {course.description}
            </p>
          </div>

          <div className="grid gap-16 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface p-20">
              <p className="text-sm text-text-soft">
                المستوى
              </p>

              <p className="mt-8 font-semibold text-text">
                {course.level}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-20">
              <p className="text-sm text-text-soft">
                عدد الدروس
              </p>

              <p className="mt-8 font-semibold text-text">
                {courseLessons.length} درس
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-20">
              <p className="text-sm text-text-soft">
                حالة الكورس
              </p>

              <p className="mt-8 font-semibold text-primary">
                متاح للتعلم
              </p>
            </div>
          </div>

          <section>
            <div className="mb-24">
              <p className="text-sm font-semibold text-primary">
                محتوى الكورس
              </p>

              <h2 className="mt-8 text-2xl font-bold text-text">
                الدروس
              </h2>
            </div>

            <div className="grid gap-16">
              {courseLessons.map((lesson) => (
                <article
                  key={lesson.id}
                  className="flex flex-col gap-20 rounded-2xl border border-border bg-surface p-24 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-start gap-16">
                    <div className="flex h-48 w-48 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {lesson.lesson_order}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-text">
                        {lesson.title}
                      </h3>

                      <p className="mt-8 max-w-[700px] text-sm leading-7 text-text-soft">
                        {lesson.description}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/courses/${course.id}/lessons/${lesson.id}`}
                    className="inline-flex h-48 shrink-0 items-center justify-center rounded-medium bg-primary px-24 text-sm font-semibold text-primary-foreground transition-colors duration-fast hover:bg-primary-hover"
                  >
                    ابدأ الدرس
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </Stack>
      </Container>
    </main>
  );
}