import Link from "next/link";

import { Container, Stack } from "@/shared/ui";

export function CtaSection() {
  return (
    <section className="bg-primary py-64">
      <Container size="desktop">
        <div className="mx-auto max-w-[800px] text-center">
          <Stack gap={24}>
            <h2 className="text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl lg:text-5xl">
              ابدأ رحلتك في تعلم اللغة العربية اليوم
            </h2>

            <p className="text-lg leading-8 text-primary-foreground/80">
              انضم إلى منصة الضياء وابدأ رحلة تعليمية منظمة تساعدك على تطوير
              مهاراتك في اللغة العربية خطوة بخطوة.
            </p>

            <div className="flex flex-wrap justify-center gap-12">
              <Link
                href="/"
                className="inline-flex h-48 items-center justify-center rounded-medium bg-background px-24 text-sm font-semibold text-text transition-colors duration-fast hover:bg-surface"
              >
                ابدأ رحلتك التعليمية
              </Link>

              <Link
                href="/"
                className="inline-flex h-48 items-center justify-center rounded-medium border border-primary-foreground/30 px-24 text-sm font-semibold text-primary-foreground transition-colors duration-fast hover:bg-primary-hover"
              >
                تعرف على المنصة
              </Link>
            </div>
          </Stack>
        </div>
      </Container>
    </section>
  );
}