import Link from "next/link";

import { Container, Stack } from "@/shared/ui";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <Container size="desktop">
        <div className="grid min-h-[calc(100vh-80px)] items-center gap-48 py-64 lg:grid-cols-2">
          <Stack gap={24}>
            <div className="inline-flex w-fit rounded-pill border border-border bg-surface px-16 py-8">
              <span className="text-sm font-medium text-primary">
                منصة الضياء التعليمية
              </span>
            </div>

            <div className="max-w-[680px]">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-text sm:text-5xl lg:text-6xl">
                تعلّم اللغة العربية
                <span className="block text-primary">
                  بطريقة أفضل
                </span>
              </h1>
            </div>

            <p className="max-w-[560px] text-lg leading-8 text-text-soft">
              منصة تعليمية متخصصة في تعليم اللغة العربية، تجمع بين المحتوى
              المنظم والمتابعة الذكية وتجربة تعلم مصممة لتساعدك على التقدم
              بثقة.
            </p>

          <div className="flex flex-wrap gap-12">
            <Link
              href="/"
              className="inline-flex h-48 items-center justify-center rounded-medium bg-primary px-24 text-sm font-semibold text-primary-foreground transition-colors duration-fast hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              ابدأ رحلتك التعليمية
            </Link>
          
            <Link
              href="/"
              className="inline-flex h-48 items-center justify-center rounded-medium border border-border bg-transparent px-24 text-sm font-semibold text-text transition-colors duration-fast hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              استكشف الكورسات
            </Link>
          </div>
          
            <div className="flex flex-wrap gap-24 pt-16">
              <div>
                <p className="text-2xl font-bold text-text">+10</p>
                <p className="text-sm text-text-soft">
                  سنوات من الخبرة
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-text">+1000</p>
                <p className="text-sm text-text-soft">
                  طالب
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-text">100%</p>
                <p className="text-sm text-text-soft">
                  تركيز على اللغة العربية
                </p>
              </div>
            </div>
          </Stack>

          <div className="relative hidden min-h-[520px] lg:block">
            <div className="absolute inset-0 rounded-2xl bg-surface-raised shadow-floating" />

            <div className="absolute inset-24 rounded-xl border border-border bg-background-elevated p-32">
              <Stack gap={24}>
                <div>
                  <p className="text-sm font-medium text-text-soft">
                    رحلتك التعليمية
                  </p>

                  <p className="mt-8 text-3xl font-bold text-text">
                    ابدأ من هنا
                  </p>
                </div>

                <div className="h-px w-full bg-border" />

                <Stack gap={16}>
                  <div className="rounded-medium border border-border bg-surface p-16">
                    <p className="font-semibold text-text">
                      محتوى تعليمي منظم
                    </p>

                    <p className="mt-4 text-sm text-text-soft">
                      دروس ومحتوى مصمم لمساعدتك على التعلم خطوة بخطوة.
                    </p>
                  </div>

                  <div className="rounded-medium border border-border bg-surface p-16">
                    <p className="font-semibold text-text">
                      متابعة مستمرة
                    </p>

                    <p className="mt-4 text-sm text-text-soft">
                      تابع تقدمك واعرف دائمًا الخطوة التالية في رحلتك.
                    </p>
                  </div>

                  <div className="rounded-medium border border-border bg-surface p-16">
                    <p className="font-semibold text-text">
                      تجربة تعلم مركزة
                    </p>

                    <p className="mt-4 text-sm text-text-soft">
                      بيئة تعليمية تساعدك على التركيز وتحقيق أفضل استفادة.
                    </p>
                  </div>
                </Stack>
              </Stack>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}