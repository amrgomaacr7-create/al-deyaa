import Link from "next/link";

import { courses, lessons, LessonCompleteButton } from "@/features/courses";
import { Container, Stack } from "@/shared/ui";

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

  const course = courses.find(
    (item) => item.id === courseId,
  );

  const lesson = lessons.find(
    (item) =>
      item.id === lessonId &&
      item.courseId === courseId,
  );

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
              className="inline-flex h-48 w-fit items-center justify-center rounded-medium bg-primary px-24 text-sm font-semibold text-primary-foreground"
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
              الدرس {lesson.order}
            </p>

            <h1 className="mt-12 text-4xl font-bold text-text">
              {lesson.title}
            </h1>

            <p className="mt-16 max-w-[720px] text-lg leading-8 text-text-soft">
              {lesson.description}
            </p>
          </div>

         {lesson.videoUrl ? (
  <div className="overflow-hidden rounded-2xl border border-border bg-black shadow-floating">
    <video
      className="aspect-video w-full"
      controls
      preload="metadata"
      src={lesson.videoUrl}
    >
      <track
        kind="captions"
        srcLang="ar"
        label="العربية"
      />

      متصفحك لا يدعم تشغيل الفيديو.
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
<div className="rounded-2xl border border-border bg-surface p-24">
  <div className="flex items-center justify-between gap-16">
    <div>
      <p className="font-semibold text-text">
        ملفات الدرس
      </p>
<div className="rounded-2xl border border-border bg-surface p-24">
  <p className="font-semibold text-text">
    📝 واجب الدرس
  </p>

  <p className="mt-8 text-lg font-semibold text-text">
    {lesson.homework.title}
  </p>

  <p className="mt-8 leading-8 text-text-soft">
    {lesson.homework.description}
  </p>

  <div className="mt-24">
    {lesson.homework.fileUrl ? (
      <Link
        href={lesson.homework.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-44 items-center justify-center rounded-medium bg-primary px-20 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        📄 فتح ملف الواجب
      </Link>
    ) : (
      <span className="text-sm text-text-soft">
        ملف الواجب غير متاح حاليًا.
      </span>
    )}
  </div>
</div>
      <p className="mt-8 text-sm text-text-soft">
        يمكنك تحميل أو عرض الملفات المرفقة بهذا الدرس.
      </p>
    </div>
  </div>

  <div className="mt-24">
    {lesson.resources.length > 0 ? (
      <div className="space-y-12">
        {lesson.resources.map((resource) => (
          <div
            key={resource.id}
            className="flex flex-wrap items-center justify-between gap-16 rounded-medium border border-border bg-background p-16"
          >
            <div>
              <p className="font-semibold text-text">
                📄 {resource.title}
              </p>

              <p className="mt-4 text-sm text-text-soft">
                ملف PDF
              </p>
            </div>

            {resource.url ? (
              <Link
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-44 items-center justify-center rounded-medium bg-primary px-20 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                عرض الملف
              </Link>
            ) : (
              <span className="text-sm text-text-soft">
                الملف غير متاح حاليًا
              </span>
            )}
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm text-text-soft">
        لا توجد ملفات مرفقة بهذا الدرس حاليًا.
      </p>
    )}
  </div>
</div>
          <div className="rounded-2xl border border-border bg-surface p-24">
            <p className="font-semibold text-text">
              عن هذا الدرس
            </p>

            <p className="mt-8 leading-8 text-text-soft">
              {lesson.description}
            </p>
          </div>
        </Stack>
      </Container>
    </main>
  );
}