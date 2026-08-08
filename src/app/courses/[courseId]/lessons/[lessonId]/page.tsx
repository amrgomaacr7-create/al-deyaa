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
      <main
        dir="rtl"
        className="min-h-screen bg-background py-64"
      >
        <Container size="desktop">
          <Stack gap={24}>
            <h1 className="text-3xl font-bold text-text">
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
    <main
      dir="rtl"
      className="min-h-screen bg-background py-64"
    >
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
              الدرس {lesson.lesson_order ?? lesson.order_number}
            </p>

            <h1 className="mt-12 text-4xl font-bold text-text">
              {lesson.title}
            </h1>

            {lesson.description && (
              <p className="mt-16 max-w-[720px] text-lg leading-8 text-text-soft">
                {lesson.description}
              </p>
            )}
          </div>

          {/* =========================
              محتوى الدرس
          ========================= */}

          <section className="rounded-2xl border border-border bg-surface p-24">
            <div>
              <p className="text-lg font-bold text-text">
                محتوى الدرس
              </p>

              <p className="mt-8 text-sm text-text-soft">
                شاهد الفيديو وراجع ملف PDF الخاص بالدرس من نفس الصفحة.
              </p>
            </div>

            <div className="mt-24">
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
            </div>

            {/* =========================
                PDF
            ========================= */}

            {lesson.pdf_url && (
              <div className="mt-32">
                <div className="mb-16">
                  <p className="text-lg font-bold text-text">
                    ملف الدرس PDF
                  </p>

                  <p className="mt-8 text-sm text-text-soft">
                    يمكنك مراجعة الملف مباشرة من هنا أو تحميله.
                  </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border bg-white">
                  <iframe
                    src={lesson.pdf_url}
                    title={`PDF - ${lesson.title}`}
                    className="h-[700px] w-full"
                  />
                </div>

                <div className="mt-16 flex flex-wrap gap-12">
                  <a
                    href={lesson.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-48 items-center justify-center rounded-medium bg-primary px-24 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
                  >
                    📄 فتح PDF
                  </a>

                  <a
                    href={lesson.pdf_url}
                    download
                    className="inline-flex h-48 items-center justify-center rounded-medium border border-border px-24 text-sm font-semibold text-text transition-colors hover:bg-background"
                  >
                    تحميل PDF
                  </a>
                </div>
              </div>
            )}
          </section>

          <LessonCompleteButton lessonId={lesson.id} />

          {/* =========================
              الواجب
          ========================= */}

          <section className="rounded-2xl border border-border bg-surface p-24">
            <p className="font-semibold text-text">
              واجب الدرس
            </p>

            <p className="mt-8 text-sm text-text-soft">
              سيتم إضافة واجب الدرس من لوحة تحكم المدرس.
            </p>
          </section>

          {/* =========================
              عن الدرس
          ========================= */}

          <section className="rounded-2xl border border-border bg-surface p-24">
            <p className="font-semibold text-text">
              عن هذا الدرس
            </p>

            <p className="mt-8 leading-8 text-text-soft">
              {lesson.description ||
                "لا يوجد وصف إضافي لهذا الدرس حاليًا."}
            </p>
          </section>
        </Stack>
      </Container>
    </main>
  );
}