"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

type LessonCompleteButtonProps = {
  lessonId: string;
};

export function LessonCompleteButton({
  lessonId,
}: LessonCompleteButtonProps) {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProgress() {
      setLoading(true);
      setError("");

      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("يجب تسجيل الدخول أولًا.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("lesson_progress")
        .select("completed")
        .eq("student_id", user.id)
        .eq("lesson_id", lessonId)
        .maybeSingle();

      if (error) {
  const errorInfo = {
    message: error.message ?? "Unknown error",
    details: error.details ?? "No details",
    hint: error.hint ?? "No hint",
    code: error.code ?? "No code",
  };

  console.error(
    "FAILED TO COMPLETE LESSON:",
    JSON.stringify(errorInfo, null, 2),
  );

  alert(
    `Supabase Error\n\nCode: ${errorInfo.code}\nMessage: ${errorInfo.message}\nDetails: ${errorInfo.details}\nHint: ${errorInfo.hint}`,
  );

  setError(
    `خطأ: ${errorInfo.message}`,
  );

  setSaving(false);
  return;
}

      setCompleted(data?.completed === true);
      setLoading(false);
    }

    loadProgress();
  }, [lessonId]);

  async function handleComplete() {
    setSaving(true);
    setError("");

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("يجب تسجيل الدخول أولًا.");
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("lesson_progress")
      .upsert(
        {
          student_id: user.id,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "student_id,lesson_id",
        },
      );

    if (error) {
  console.error(
    "FAILED TO COMPLETE LESSON:",
    String(error),
  );

  console.error(
    "ERROR MESSAGE:",
    String(error.message),
  );

  console.error(
    "ERROR CODE:",
    String(error.code),
  );

  console.error(
    "ERROR DETAILS:",
    String(error.details),
  );

  console.error(
    "ERROR HINT:",
    String(error.hint),
  );

  alert(
    [
      `Code: ${String(error.code)}`,
      `Message: ${String(error.message)}`,
      `Details: ${String(error.details)}`,
      `Hint: ${String(error.hint)}`,
    ].join("\n"),
  );

  setError("حدث خطأ أثناء حفظ تقدمك.");
  setSaving(false);
  return;
}
    setCompleted(true);

    window.dispatchEvent(
      new Event("lesson-progress-updated"),
    );

    setSaving(false);
  }

  async function handleUndo() {
    setSaving(true);
    setError("");

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("يجب تسجيل الدخول أولًا.");
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("lesson_progress")
      .update({
        completed: false,
        completed_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq("student_id", user.id)
      .eq("lesson_id", lessonId);

    if (error) {
      console.error("Failed to undo lesson progress:", error);
      setError("حدث خطأ أثناء إلغاء إكمال الدرس.");
      setSaving(false);
      return;
    }

    setCompleted(false);

    window.dispatchEvent(
      new Event("lesson-progress-updated"),
    );

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-24">
        <p className="text-sm text-text-soft">
          جاري تحميل تقدم الدرس...
        </p>
      </div>
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
              تم حفظ تقدمك في حسابك.
            </p>
          </div>

          <button
            type="button"
            onClick={handleUndo}
            disabled={saving}
            className="inline-flex h-44 items-center justify-center rounded-medium border border-border px-20 text-sm font-semibold text-text transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "جاري الحفظ..." : "إلغاء الإكمال"}
          </button>
        </div>

        {error && (
          <p className="mt-16 text-sm text-red-500">
            {error}
          </p>
        )}
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
          disabled={saving}
          className="inline-flex h-48 items-center justify-center rounded-medium bg-primary px-24 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "جاري الحفظ..." : "✅ إكمال الدرس"}
        </button>
      </div>

      {error && (
        <p className="mt-16 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}