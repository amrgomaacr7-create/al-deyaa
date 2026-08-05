import Link from "next/link";

import { LessonCompleteButton } from "@/features/courses";
import { Container, Stack } from "@/shared/ui";
import { createClient } from "@/lib/supabase/server";

type LessonPageProps = {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
};

export default async function LessonPage({
  params,
}: LessonPageProps) {
  const { courseId, lessonId } = await params;

  const supabase = await createClient();

  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, title, category")
    .eq("id", courseId)
    .eq("is_published", true)
    .maybeSingle();

  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", lessonId)
    .eq("course_id", courseId)
    .eq("is_published", true)
    .maybeSingle();

  if (courseError) {
    console.error("Failed to load course:", courseError);
  }

  if (lessonError) {
    console.error("Failed to load lesson:", lessonError);
  }

  if (!course || !lesson) {
    return (
      <main className="min-h-screen bg-background py-64">
        <Container size="desktop">
          <Stack gap={24}>
            <h1 className="text-4xl font-bold text-text">
              الدرس غير موجود
            </h1>

            <p className="text-lg text-text-soft">
              عذرًا، لم نتمكن من العثور على الدرس المطلوب.
            </p>

            <Link
              href="/courses"
              className="inline-flex h-48 w-fit items-center justify-center rounded-medium bg-primary px-24 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              العودة إلى الكورسات
            </Link>
          </Stack>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-64">
      <Container size="desktop">
        <Stack gap={32}>
          <Link
            href={`/courses/${course.id}`}
            className="w-fit text-sm font-semibold text-primary"
          >
            ← العودة إلى {course.title}
          </Link>

          <div>
            <p className="text-sm font-semibold text-primary">
              الدرس {lesson.order_number}
            </p>

            <h1 className="mt-12 text-4xl font-bold text-text">
              {lesson.title}
            </h1>

            <p className="mt-16 max-w-[720px] text-lg leading-8 text-text-soft">
              {lesson.description}
            </p>
          </div>

          {lesson.video_url ? (
            <div className="overflow-hidden rounded-2xl border border-border bg-black shadow-floating">
              <video
                className="aspect-video w-full"
                controls
                preload="metadata"
                src={lesson.video_url}
              >
                المتصفح الخاص بك لا يدعم تشغيل الفيديو.
              </video>
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-2xl border border-border bg-surface-raised">
              <div className="text-center">
                <p className="text-xl font-bold text-text">
                  الفيديو غير متاح حاليًا
                </p>

                <p className="mt-8 text-sm text-text-soft">
                  سيتم إضافة فيديو هذا الدرس قريبًا.
                </p>
              </div>
            </div>
          )}

          <LessonCompleteButton lessonId={lesson.id} />

          <section className="rounded-2xl border border-border bg-surface p-24">
            <div>
              <p className="font-semibold text-text">
                ملفات الدرس
              </p>

              <p className="mt-8 text-sm text-text-soft">
                يمكنك تحميل أو عرض الملفات المرفقة بهذا الدرس.
              </p>
            </div>

            <div className="mt-24">
              <p className="text-sm text-text-soft">
                لا توجد ملفات مرفقة بهذا الدرس حاليًا.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-24">
            <p className="font-semibold text-text">
              واجب الدرس
            </p>

            <p className="mt-8 text-sm text-text-soft">
              سيتم إضافة واجب الدرس من لوحة تحكم المدرس.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-surface p-24">
            <p className="font-semibold text-text">
              عن هذا الدرس
            </p>

            <p className="mt-8 leading-8 text-text-soft">
              {lesson.description}
            </p>
          </section>
        </Stack>
      </Container>
    </main>
  );
}