"use client";

import { useCallback, useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProgress = useCallback(async () => {
    setLoading(true);
    setError("");

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setCompletedLessons([]);
      setError("يجب تسجيل الدخول أولًا.");
      setLoading(false);
      return;
    }

    const { data, error: progressError } = await supabase
      .from("lesson_progress")
      .select("lesson_id, completed")
      .eq("student_id", user.id)
      .eq("completed", true);

    if (progressError) {
      console.error(
        "Failed to load course progress:",
        progressError,
      );

      setError("حدث خطأ أثناء تحميل تقدم الكورس.");
      setLoading(false);
      return;
    }

    const completedIds = (data ?? [])
      .map((item) => item.lesson_id)
      .filter((lessonId) =>
        lessons.some((lesson) => lesson.id === lessonId),
      );

    setCompletedLessons(completedIds);
    setLoading(false);
  }, [lessons]);

  useEffect(() => {
    loadProgress();

    const handleProgressUpdate = () => {
      loadProgress();
    };

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
  }, [loadProgress]);

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
            {loading
              ? "جاري تحميل التقدم..."
              : `${completedCount} من ${totalLessons} دروس مكتملة`}
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

      {error && (
        <p className="mt-16 text-sm text-red-500">
          {error}
        </p>
      )}

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
                {isCompleted
                  ? "✅ مكتمل"
                  : "⬜ لم يكتمل"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}