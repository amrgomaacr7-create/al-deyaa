import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { Container, Stack } from "@/shared/ui";

type EditCoursePageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export default async function EditCoursePage({
  params,
}: EditCoursePageProps) {
  const { courseId } = await params;

  const supabase = await createClient();

  // التأكد من تسجيل الدخول
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // التأكد من أن المستخدم Admin
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

  // جلب بيانات الكورس
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select(
      "id, title, description, level, category, slug, thumbnail_url, is_published",
    )
    .eq("id", courseId)
    .maybeSingle();

  if (courseError) {
    console.error(
      "Failed to load course:",
      courseError,
    );
  }

  if (!course) {
    notFound();
  }

  async function updateCourse(formData: FormData) {
    "use server";

    const supabase = await createClient();

    // التأكد من تسجيل الدخول
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    // التأكد من صلاحيات Admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile?.is_admin) {
      redirect("/");
    }

    const title = String(
      formData.get("title") ?? "",
    ).trim();

    const description = String(
      formData.get("description") ?? "",
    ).trim();

    const level = String(
      formData.get("level") ?? "",
    ).trim();

    const category = String(
      formData.get("category") ?? "",
    ).trim();

    const slug = String(
      formData.get("slug") ?? "",
    ).trim();

    const thumbnailUrl = String(
      formData.get("thumbnail_url") ?? "",
    ).trim();

    const isPublished =
      formData.get("is_published") === "on";

    if (!title || !slug) {
      throw new Error(
        "اسم الكورس والرابط المختصر مطلوبان.",
      );
    }

    const { error } = await supabase
      .from("courses")
      .update({
        title,
        description: description || null,
        level: level || null,
        category: category || null,
        slug,
        thumbnail_url: thumbnailUrl || null,
        is_published: isPublished,
      })
      .eq("id", courseId);

    if (error) {
      console.error(
        "Failed to update course:",
        {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
      );

      throw new Error(
        `حدث خطأ أثناء تعديل الكورس: ${error.message}`,
      );
    }

    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-background py-64">
      <Container size="desktop">
        <Stack gap={32}>
          {/* العودة إلى لوحة التحكم */}
          <Link
            href="/admin"
            className="w-fit text-sm font-semibold text-primary"
          >
            ← العودة إلى لوحة التحكم
          </Link>

          {/* عنوان الصفحة */}
          <div>
            <p className="text-sm font-semibold text-primary">
              لوحة تحكم الضياء
            </p>

            <h1 className="mt-12 text-4xl font-bold text-text">
              تعديل الكورس
            </h1>

            <p className="mt-16 text-lg text-text-soft">
              قم بتعديل بيانات الكورس ثم اضغط على حفظ التعديلات.
            </p>
          </div>

          {/* نموذج تعديل الكورس */}
          <form
            action={updateCourse}
            className="rounded-2xl border border-border bg-surface p-24 sm:p-32"
          >
            <Stack gap={24}>
              {/* اسم الكورس */}
              <div>
                <label
                  htmlFor="title"
                  className="text-sm font-semibold text-text"
                >
                  اسم الكورس
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  defaultValue={course.title}
                  placeholder="مثال: النحو العربي"
                  className="mt-8 h-48 w-full rounded-medium border border-border bg-background px-16 text-sm text-text outline-none transition-colors focus:border-primary"
                />
              </div>

              {/* وصف الكورس */}
              <div>
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-text"
                >
                  وصف الكورس
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  defaultValue={course.description ?? ""}
                  placeholder="اكتب وصفًا مختصرًا للكورس..."
                  className="mt-8 w-full rounded-medium border border-border bg-background p-16 text-sm leading-7 text-text outline-none transition-colors focus:border-primary"
                />
              </div>

              {/* المستوى والتصنيف */}
              <div className="grid gap-24 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="level"
                    className="text-sm font-semibold text-text"
                  >
                    المستوى
                  </label>

                  <input
                    id="level"
                    name="level"
                    type="text"
                    defaultValue={course.level ?? ""}
                    placeholder="مثال: الصف السادس الابتدائي"
                    className="mt-8 h-48 w-full rounded-medium border border-border bg-background px-16 text-sm text-text outline-none transition-colors focus:border-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="text-sm font-semibold text-text"
                  >
                    التصنيف
                  </label>

                  <input
                    id="category"
                    name="category"
                    type="text"
                    defaultValue={course.category ?? ""}
                    placeholder="مثال: اللغة العربية"
                    className="mt-8 h-48 w-full rounded-medium border border-border bg-background px-16 text-sm text-text outline-none transition-colors focus:border-primary"
                  />
                </div>
              </div>

              {/* Slug */}
              <div>
                <label
                  htmlFor="slug"
                  className="text-sm font-semibold text-text"
                >
                  الرابط المختصر Slug
                </label>

                <input
                  id="slug"
                  name="slug"
                  type="text"
                  required
                  defaultValue={course.slug}
                  placeholder="مثال: arabic-grade-6"
                  dir="ltr"
                  className="mt-8 h-48 w-full rounded-medium border border-border bg-background px-16 text-sm text-text outline-none transition-colors focus:border-primary"
                />

                <p className="mt-8 text-xs text-text-soft">
                  استخدم حروفًا إنجليزية صغيرة وأرقامًا وشرطة فقط.
                </p>
              </div>

              {/* صورة الكورس */}
              <div>
                <label
                  htmlFor="thumbnail_url"
                  className="text-sm font-semibold text-text"
                >
                  رابط صورة الكورس
                </label>

                <input
                  id="thumbnail_url"
                  name="thumbnail_url"
                  type="url"
                  defaultValue={course.thumbnail_url ?? ""}
                  placeholder="https://example.com/image.jpg"
                  dir="ltr"
                  className="mt-8 h-48 w-full rounded-medium border border-border bg-background px-16 text-sm text-text outline-none transition-colors focus:border-primary"
                />
              </div>

              {/* حالة النشر */}
              <div className="flex items-center gap-12">
                <input
                  id="is_published"
                  name="is_published"
                  type="checkbox"
                  defaultChecked={course.is_published}
                  className="h-18 w-18 accent-primary"
                />

                <label
                  htmlFor="is_published"
                  className="text-sm font-semibold text-text"
                >
                  نشر الكورس للطلاب
                </label>
              </div>

              {/* الأزرار */}
              <div className="flex flex-wrap gap-12 pt-8">
                <button
                  type="submit"
                  className="inline-flex h-48 items-center justify-center rounded-medium bg-primary px-24 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  حفظ التعديلات
                </button>

                <Link
                  href="/admin"
                  className="inline-flex h-48 items-center justify-center rounded-medium border border-border px-24 text-sm font-semibold text-text transition-colors hover:bg-background"
                >
                  إلغاء
                </Link>
              </div>
            </Stack>
          </form>
        </Stack>
      </Container>
    </main>
  );
}