import { Container, Stack } from "@/shared/ui";
import { CourseCard } from "@/features/courses";
import { createClient } from "@/lib/supabase/server";

export default async function CoursesPage() {
  const supabase = await createClient();

  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to load courses:", error);
  }

  return (
    <main className="min-h-screen bg-background py-64">
      <Container size="desktop">
        <Stack gap={48}>
          <div className="max-w-[680px]">
            <p className="text-sm font-semibold text-primary">
              المسارات التعليمية
            </p>

            <h1 className="mt-8 text-4xl font-bold text-text sm:text-5xl">
              الكورسات التعليمية
            </h1>

            <p className="mt-16 text-lg leading-8 text-text-soft">
              استكشف المسارات التعليمية المتاحة وابدأ رحلتك في تعلم اللغة
              العربية بطريقة منظمة.
            </p>
          </div>

          <div className="grid gap-24 md:grid-cols-2 lg:grid-cols-3">
            {courses?.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          </div>
        </Stack>
      </Container>
    </main>
  );
}