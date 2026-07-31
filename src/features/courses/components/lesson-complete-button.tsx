"use client";

import { useEffect, useState } from "react";

type LessonCompleteButtonProps = {
  lessonId: string;
};

export function LessonCompleteButton({
  lessonId,
}: LessonCompleteButtonProps) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(
      `lesson-completed-${lessonId}`,
    );

    setCompleted(saved === "true");
  }, [lessonId]);

  function handleComplete() {
    localStorage.setItem(
      `lesson-completed-${lessonId}`,
      "true",
    );

    setCompleted(true);

    window.dispatchEvent(
      new Event("lesson-progress-updated"),
    );
  }

  function handleUndo() {
    localStorage.removeItem(
      `lesson-completed-${lessonId}`,
    );

    setCompleted(false);

    window.dispatchEvent(
      new Event("lesson-progress-updated"),
    );
  }

  if (completed) {
    return (
      <div className="rounded-2xl border border-primary bg-surface p-24">
        <div className="flex flex-wrap items-center justify-between gap-16">
          <div>
            <p className="font-semibold text-text">
              ✅ تم إكمال الدرس
            </p>

            <p className="mt-8 text-sm text-text-soft">
              أحسنت! تم تسجيل هذا الدرس كمكتمل على هذا الجهاز.
            </p>
          </div>

          <button
            type="button"
            onClick={handleUndo}
            className="inline-flex h-44 items-center justify-center rounded-medium border border-border px-20 text-sm font-semibold text-text transition-colors hover:bg-background"
          >
            إلغاء الإكمال
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-24">
      <div className="flex flex-wrap items-center justify-between gap-16">
        <div>
          <p className="font-semibold text-text">
            هل أنهيت هذا الدرس؟
          </p>

          <p className="mt-8 text-sm text-text-soft">
            بعد الانتهاء من مشاهدة الدرس ومراجعة الملفات وحل الواجب،
            يمكنك تسجيل الدرس كمكتمل.
          </p>
        </div>

        <button
          type="button"
          onClick={handleComplete}
          className="inline-flex h-48 items-center justify-center rounded-medium bg-primary px-24 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          ✅ إكمال الدرس
        </button>
      </div>
    </div>
  );
}