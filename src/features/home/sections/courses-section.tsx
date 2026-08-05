import Link from "next/link";

import { Container, Stack } from "@/shared/ui";

const courses = [
  {
    title: "النحو العربي",
    description:
      "تعلّم قواعد النحو بطريقة مبسطة ومنظمة تساعدك على فهم الجملة العربية بشكل صحيح.",
    level: "مناسب للمراحل المختلفة",
  },
  {
    title: "القراءة والفهم",
    description:
      "طوّر مهارات القراءة والفهم وتحليل النصوص من خلال شرح واضح وتدريبات عملية.",
    level: "بناء مهارات القراءة",
  },
  {
    title: "التعبير والكتابة",
    description:
      "تعلّم كيف تعبّر عن أفكارك وتكتب بطريقة صحيحة ومنظمة باللغة العربية.",
    level: "تطوير مهارات الكتابة",
  },
];

export function CoursesSection() {
  return (
    <section className="bg-surface py-64">
      <Container size="desktop">
        <Stack gap={48}>
          <div className="max-w-[680px]">
            <p className="text-sm font-semibold text-primary">
              المسارات التعليمية
            </p>

            <h2 className="mt-8 text-3xl font-bold leading-tight text-text sm:text-4xl">
              تعلّم اللغة العربية بطريقة منظمة
            </h2>

            <p className="mt-16 text-lg leading-8 text-text-soft">
              اختر المسار المناسب لك وابدأ رحلة تعليمية مصممة لمساعدتك على
              فهم اللغة العربية وتطوير مهاراتك خطوة بخطوة.
            </p>
          </div>

          <div className="grid gap-24 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <article
                key={course.title}
                className="flex h-full flex-col rounded-2xl border border-border bg-background p-24 transition-transform duration-fast hover:-translate-y-4"
              >
                <Stack gap={16}>
                  <div className="flex h-56 w-56 items-center justify-center rounded-medium bg-primary/10">
                    <span className="text-2xl font-bold text-primary">
                      ع
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-text">
                      {course.title}
                    </h3>

                    <p className="mt-8 text-sm leading-7 text-text-soft">
                      {course.description}
                    </p>
                  </div>

                  <p className="text-sm font-medium text-primary">
                    {course.level}
                  </p>
                </Stack>
               
               <Link
                 href="/courses"
                 className="mt-24 inline-flex h-48 items-center justify-center rounded-medium border border-border bg-transparent px-20 text-sm font-semibold text-text transition-colors duration-fast hover:bg-surface"
                >
                 استكشف المسار
                </Link>
              </article>
            ))}
          </div>
        </Stack>
      </Container>
    </section>
  );
}