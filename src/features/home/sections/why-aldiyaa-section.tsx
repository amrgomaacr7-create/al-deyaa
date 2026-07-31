import { Container, Stack } from "@/shared/ui";

const benefits = [
  {
    number: "01",
    title: "تعلم مركز",
    description:
      "بيئة تعليمية مصممة لمساعدتك على التركيز في التعلم وتقليل كل ما يسبب التشتت.",
  },
  {
    number: "02",
    title: "محتوى منظم",
    description:
      "دروس ومسارات تعليمية مرتبة بشكل واضح تساعدك على التقدم خطوة بخطوة.",
  },
  {
    number: "03",
    title: "متابعة مستمرة",
    description:
      "تابع تقدمك واعرف دائمًا أين وصلت وما هي الخطوة التالية في رحلتك التعليمية.",
  },
  {
    number: "04",
    title: "تعليم متخصص",
    description:
      "منصة متخصصة في تعليم اللغة العربية مع تجربة مصممة لتناسب احتياجات الطالب.",
  },
];

export function WhyAlDiyaaSection() {
  return (
    <section className="bg-background py-64">
      <Container size="desktop">
        <Stack gap={48}>
          <div className="max-w-[680px]">
            <p className="text-sm font-semibold text-primary">
              لماذا الضياء؟
            </p>

            <h2 className="mt-8 text-3xl font-bold leading-tight text-text sm:text-4xl">
              تجربة تعليمية مصممة لتساعدك على التقدم
            </h2>

            <p className="mt-16 text-lg leading-8 text-text-soft">
              في الضياء، لا نركز فقط على تقديم المحتوى، بل نهتم ببناء تجربة
              تعليمية تساعدك على الفهم والاستمرار وتحقيق أفضل استفادة من وقتك.
            </p>
          </div>

          <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <article
                key={benefit.number}
                className="rounded-2xl border border-border bg-surface p-24 transition-transform duration-fast hover:-translate-y-4"
              >
                <span className="text-sm font-bold text-primary">
                  {benefit.number}
                </span>

                <h3 className="mt-24 text-xl font-bold text-text">
                  {benefit.title}
                </h3>

                <p className="mt-12 text-sm leading-7 text-text-soft">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </Stack>
      </Container>
    </section>
  );
}