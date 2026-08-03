import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { Container, Stack } from "@/shared/ui";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-background py-64">
        <Container size="desktop">
          <div className="rounded-2xl border border-border bg-surface p-32">
            <h1 className="text-3xl font-bold text-text">
              يجب تسجيل الدخول
            </h1>

            <p className="mt-12 text-text-soft">
              يجب تسجيل الدخول للوصول إلى لوحة تحكم الضياء.
            </p>
          </div>
        </Container>
      </main>
    );
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
    return (
      <main className="min-h-screen bg-background py-64">
        <Container size="desktop">
          <div className="rounded-2xl border border-border bg-surface p-32">
            <h1 className="text-3xl font-bold text-text">
              غير مصرح لك بالدخول
            </h1>

            <p className="mt-12 text-text-soft">
              هذه الصفحة متاحة للمشرف فقط.
            </p>
          </div>
        </Container>
      </main>
    );
  }

  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .select(
      "id, title, description, level, category, is_published, created_at",
    )
    .order("created_at", { ascending: false });

  if (coursesError) {
    console.error("Failed to load admin courses:", coursesError);
  }

  const adminCourses = courses ?? [];

  return (
    <main className="min-h-screen bg-background py-64">
      <Container size="desktop">
        <Stack gap={32}>
          {/* Header */}
          <div>
            <p className="text-sm font-semibold text-primary">
              لوحة تحكم الضياء
            </p>

            <h1 className="mt-12 text-4xl font-bold text-text">
              إدارة المنصة
            </h1>

            <p className="mt-16 text-lg text-text-soft">
              من هنا يمكنك إدارة الكورسات والمحتوى التعليمي الخاص بالضياء.
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-16 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-24">
              <p className="text-sm text-text-soft">
                إجمالي الكورسات
              </p>

              <p className="mt-8 text-3xl font-bold text-text">
                {adminCourses.length}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-24">
              <p className="text-sm text-text-soft">
                الكورسات المنشورة
              </p>

              <p className="mt-8 text-3xl font-bold text-primary">
                {adminCourses.filter(
                  (course) => course.is_published,
                ).length}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-24">
              <p className="text-sm text-text-soft">
                الكورسات المخفية
              </p>

              <p className="mt-8 text-3xl font-bold text-text">
                {adminCourses.filter(
                  (course) => !course.is_published,
                ).length}
              </p>
            </div>
          </div>

          {/* Courses */}
          <section className="rounded-2xl border border-border bg-surface p-24">
            <div className="flex flex-col gap-16 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-primary">
                  المحتوى التعليمي
                </p>

                <h2 className="mt-8 text-2xl font-bold text-text">
                  الكورسات
                </h2>
              </div>

              <Link
  href="/admin/courses/new"
  className="inline-flex h-48 items-center justify-center rounded-medium bg-primary px-24 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
>
  + إضافة كورس جديد
</Link>
            </div>

            <div className="mt-24 grid gap-16">
              {adminCourses.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-32 text-center">
                  <p className="font-semibold text-text">
                    لا توجد كورسات حاليًا
                  </p>

                  <p className="mt-8 text-sm text-text-soft">
                    يمكنك إضافة أول كورس للمنصة من زر إضافة كورس جديد.
                  </p>
                </div>
              ) : (
                adminCourses.map((course) => (
                  <article
                    key={course.id}
                    className="rounded-xl border border-border bg-background p-20"
                  >
                    <div className="flex flex-col gap-20 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-8">
                          <h3 className="text-lg font-bold text-text">
                            {course.title}
                          </h3>

                          <span
                            className={
                              course.is_published
                                ? "rounded-full bg-primary/10 px-12 py-4 text-xs font-semibold text-primary"
                                : "rounded-full bg-surface-raised px-12 py-4 text-xs font-semibold text-text-soft"
                            }
                          >
                            {course.is_published
                              ? "منشور"
                              : "مخفي"}
                          </span>
                        </div>

                        <p className="mt-8 text-sm text-text-soft">
                          {course.description ||
                            "لا يوجد وصف لهذا الكورس."}
                        </p>

                        <div className="mt-12 flex flex-wrap gap-12 text-xs text-text-soft">
                          <span>
                            المستوى: {course.level || "غير محدد"}
                          </span>

                          <span>
                            التصنيف: {course.category || "غير محدد"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-8">
                        <button
                          type="button"
                          className="inline-flex h-44 items-center justify-center rounded-medium border border-border px-16 text-sm font-semibold text-text transition-colors hover:bg-surface"
                        >
                          إدارة الدروس
                        </button>

                        <button
                          type="button"
                          className="inline-flex h-44 items-center justify-center rounded-medium border border-border px-16 text-sm font-semibold text-text transition-colors hover:bg-surface"
                        >
                          تعديل
                        </button>

                        <button
                          type="button"
                          className="inline-flex h-44 items-center justify-center rounded-medium border border-red-500/30 px-16 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/10"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          {/* Admin info */}
          <div className="rounded-2xl border border-border bg-surface p-24">
            <p className="text-sm text-text-soft">
              حساب المشرف الحالي
            </p>

            <p className="mt-8 break-all font-mono text-sm text-primary">
              {user.id}
            </p>
          </div>
        </Stack>
      </Container>
    </main>
  );
}