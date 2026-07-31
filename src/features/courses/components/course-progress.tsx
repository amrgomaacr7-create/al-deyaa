"use client";

import { useEffect, useState } from "react";

type CourseProgressProps = {
  lessons: readonly {
    id: string;
    title: string;
    order: number;
  }[];
};

export function CourseProgress({
  lessons,
}: CourseProgressProps) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
  const updateProgress = () => {
    const completed = lessons
      .filter(
        (lesson) =>
          localStorage.getItem(
            `lesson-completed-${lesson.id}`,
          ) === "true",
      )
      .map((lesson) => lesson.id);

    setCompletedLessons(completed);
  };

  const handleProgressUpdate = () => {
    updateProgress();
  };

  updateProgress();

  window.addEventListener(
    "lesson-progress-updated",
    handleProgressUpdate,
  );

  return () => {
    window.removeEventListener(
      "lesson-progress-updated",
      handleProgressUpdate,
    );
  };
}, [lessons]);

  const totalLessons = lessons.length;

  const completedCount = completedLessons.length;

  const progress =
    totalLessons > 0
      ? Math.round((completedCount / totalLessons) * 100)
      : 0;

  return (
    <div className="rounded-2xl border border-border bg-surface p-24">
      <div className="flex items-center justify-between gap-16">
        <div>
          <p className="text-sm font-semibold text-primary">
            تقدمك في الكورس
          </p>

          <p className="mt-8 text-lg font-bold text-text">
            {completedCount} من {totalLessons} دروس مكتملة
          </p>
        </div>

        <p className="text-2xl font-bold text-primary">
          {progress}%
        </p>
      </div>

      <div className="mt-16 h-8 overflow-hidden rounded-full bg-background">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-24 space-y-12">
        {lessons.map((lesson) => {
          const isCompleted =
            completedLessons.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              className="flex items-center justify-between gap-16"
            >
              <p className="text-sm text-text">
                {lesson.order}. {lesson.title}
              </p>

              <span
                className={
                  isCompleted
                    ? "text-sm font-semibold text-primary"
                    : "text-sm text-text-soft"
                }
              >
                {isCompleted ? "✅ مكتمل" : "⬜ لم يكتمل"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}