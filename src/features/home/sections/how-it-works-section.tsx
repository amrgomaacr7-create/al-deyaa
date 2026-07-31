import { Container, Stack } from "@/shared/ui";

const steps = [
  {
    number: "01",
    title: "أنشئ حسابك",
    description:
      "سجّل حسابك على منصة الضياء وابدأ في تجهيز رحلتك التعليمية.",
  },
  {
    number: "02",
    title: "اختر المسار المناسب",
    description:
      "استعرض المسارات التعليمية واختر المحتوى المناسب لمستواك واحتياجاتك.",
  },
  {
    number: "03",
    title: "ابدأ التعلم",
    description:
      "ابدأ دروسك وتابع المحتوى بشكل منظم خطوة بخطوة.",
  },
  {
    number: "04",
    title: "تابع تقدمك",
    description:
      "راقب تقدمك واستمر في تطوير مهاراتك حتى تحقق أهدافك التعليمية.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-surface py-64">
      <Container size="desktop">
        <Stack gap={48}>
          <div className="max-w-[680px]">
            <p className="text-sm font-semibold text-primary">
              كيف تعمل المنصة؟
            </p>

            <h2 className="mt-8 text-3xl font-bold leading-tight text-text sm:text-4xl">
              ابدأ رحلتك التعليمية في خطوات بسيطة
            </h2>

            <p className="mt-16 text-lg leading-8 text-text-soft">
              صممنا تجربة الضياء لتكون واضحة وبسيطة، من أول تسجيلك وحتى متابعة
              تقدمك في رحلتك التعليمية.
            </p>
          </div>

          <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <article
                key={step.number}
                className="relative rounded-2xl border border-border bg-background p-24"
              >
                <div className="flex h-48 w-48 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {step.number}
                </div>

                <h3 className="mt-24 text-xl font-bold text-text">
                  {step.title}
                </h3>

                <p className="mt-12 text-sm leading-7 text-text-soft">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </Stack>
      </Container>
    </section>
  );
}