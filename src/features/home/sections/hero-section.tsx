import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import { Container, Stack } from "@/shared/ui";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[420px] rounded-full bg-primary/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 size-[420px] rounded-full bg-accent/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/2 top-1/3 -z-10 size-64 translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
      />

      <Container size="desktop">
        <div className="grid min-h-[calc(100vh-72px)] items-center gap-48 py-64 lg:grid-cols-2">
          {/* Hero Content */}
          <Stack gap={24}>
            {/* Badge */}
            <div className="animate-[fadeIn_0.5s_ease-out] inline-flex w-fit items-center gap-8 rounded-pill border border-primary/20 bg-primary-muted px-16 py-8">
              <Sparkles
                aria-hidden="true"
                className="size-16 text-accent"
              />

              <span className="text-sm font-semibold text-primary">
                منصة الضياء التعليمية
              </span>
            </div>

            {/* Heading */}
            <div className="max-w-[700px]">
              <h1 className="text-4xl font-bold leading-[1.2] tracking-tight text-text sm:text-5xl lg:text-6xl">
                تعلّم اللغة العربية
                <span className="mt-8 block text-primary">
                  بطريقة أفضل
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="max-w-[600px] text-lg leading-8 text-text-soft">
              منصة تعليمية متخصصة في تعليم اللغة العربية، تجمع بين المحتوى
              المنظم والمتابعة الذكية وتجربة تعلم مصممة لتساعدك على التقدم
              بثقة، خطوة بخطوة.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-12">
              <Link
                href="/courses"
                className="group inline-flex h-48 items-center justify-center gap-8 rounded-medium bg-primary px-24 text-sm font-semibold text-surface-raised shadow-soft transition-all duration-normal hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                <span>ابدأ رحلتك التعليمية</span>

                <ArrowLeft
                  aria-hidden="true"
                  className="size-16 transition-transform duration-normal group-hover:-translate-x-1"
                />
              </Link>

              <Link
                href="/courses"
                className="inline-flex h-48 items-center justify-center gap-8 rounded-medium border border-border bg-surface-raised px-24 text-sm font-semibold text-text shadow-soft transition-all duration-normal hover:-translate-y-0.5 hover:border-border-strong hover:bg-background-elevated hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                <BookOpen
                  aria-hidden="true"
                  className="size-16 text-primary"
                />

                <span>استكشف الكورسات</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-12 pt-16">
              <div className="min-w-[130px] rounded-large border border-border bg-surface-raised/80 px-16 py-12 shadow-soft backdrop-blur-sm">
                <p className="text-2xl font-bold text-text">
                  +10
                </p>

                <p className="mt-4 text-sm text-text-soft">
                  سنوات من الخبرة
                </p>
              </div>

              <div className="min-w-[130px] rounded-large border border-border bg-surface-raised/80 px-16 py-12 shadow-soft backdrop-blur-sm">
                <p className="text-2xl font-bold text-text">
                  +1000
                </p>

                <p className="mt-4 text-sm text-text-soft">
                  طالب
                </p>
              </div>

              <div className="min-w-[150px] rounded-large border border-border bg-surface-raised/80 px-16 py-12 shadow-soft backdrop-blur-sm">
                <p className="text-2xl font-bold text-primary">
                  100%
                </p>

                <p className="mt-4 text-sm text-text-soft">
                  تركيز على اللغة العربية
                </p>
              </div>
            </div>
          </Stack>

          {/* Visual Side */}
          <div className="relative hidden min-h-[560px] lg:block">
            {/* Main Card Shadow */}
            <div
              aria-hidden="true"
              className="absolute inset-12 rounded-[2rem] bg-primary/10 blur-2xl"
            />

            {/* Main Visual Card */}
            <div className="absolute inset-0 rounded-[2rem] border border-border bg-surface-raised/90 p-12 shadow-floating backdrop-blur-xl">
              <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-border bg-background-elevated p-32">
                {/* Decorative Circle */}
                <div
                  aria-hidden="true"
                  className="absolute -left-24 -top-24 size-64 rounded-full bg-primary/10 blur-2xl"
                />

                <div
                  aria-hidden="true"
                  className="absolute -bottom-24 -right-24 size-64 rounded-full bg-accent/10 blur-2xl"
                />

                <Stack
                  gap={24}
                  className="relative z-10 h-full"
                >
                  {/* Visual Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-text-soft">
                        رحلتك التعليمية
                      </p>

                      <p className="mt-8 text-3xl font-bold text-text">
                        ابدأ من هنا
                      </p>
                    </div>

                    <div className="flex size-48 items-center justify-center rounded-large bg-primary-muted text-primary">
                      <GraduationCap
                        aria-hidden="true"
                        className="size-24"
                      />
                    </div>
                  </div>

                  <div className="h-px w-full bg-border" />

                  {/* Progress Card */}
                  <div className="rounded-xl border border-primary/20 bg-primary-muted/60 p-20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-text-soft">
                          مستوى التقدم
                        </p>

                        <p className="mt-4 text-xl font-bold text-text">
                          مستعد للبدء؟
                        </p>
                      </div>

                      <div className="text-left">
                        <p className="text-2xl font-bold text-primary">
                          0%
                        </p>
                      </div>
                    </div>

                    <div className="mt-16 h-8 overflow-hidden rounded-pill bg-border">
                      <div className="h-full w-[8%] rounded-pill bg-primary" />
                    </div>
                  </div>

                  {/* Features */}
                  <Stack gap={12}>
                    <div className="group flex items-center gap-12 rounded-large border border-border bg-surface p-16 transition-all duration-normal hover:-translate-x-1 hover:border-primary/30 hover:shadow-soft">
                      <div className="flex size-40 shrink-0 items-center justify-center rounded-medium bg-primary-muted text-primary">
                        <CheckCircle2
                          aria-hidden="true"
                          className="size-20"
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-text">
                          محتوى تعليمي منظم
                        </p>

                        <p className="mt-4 text-sm text-text-soft">
                          دروس مصممة لتتعلم خطوة بخطوة.
                        </p>
                      </div>
                    </div>

                    <div className="group flex items-center gap-12 rounded-large border border-border bg-surface p-16 transition-all duration-normal hover:-translate-x-1 hover:border-primary/30 hover:shadow-soft">
                      <div className="flex size-40 shrink-0 items-center justify-center rounded-medium bg-accent-muted text-accent">
                        <GraduationCap
                          aria-hidden="true"
                          className="size-20"
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-text">
                          متابعة مستمرة
                        </p>

                        <p className="mt-4 text-sm text-text-soft">
                          اعرف دائمًا خطوتك التالية.
                        </p>
                      </div>
                    </div>

                    <div className="group flex items-center gap-12 rounded-large border border-border bg-surface p-16 transition-all duration-normal hover:-translate-x-1 hover:border-primary/30 hover:shadow-soft">
                      <div className="flex size-40 shrink-0 items-center justify-center rounded-medium bg-secondary-muted text-secondary">
                        <BookOpen
                          aria-hidden="true"
                          className="size-20"
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-text">
                          تجربة تعلم مركزة
                        </p>

                        <p className="mt-4 text-sm text-text-soft">
                          بيئة تساعدك على التركيز والاستفادة.
                        </p>
                      </div>
                    </div>
                  </Stack>
                </Stack>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -right-20 top-72 flex items-center gap-12 rounded-xl border border-border bg-surface-raised px-16 py-12 shadow-large">
              <div className="flex size-40 items-center justify-center rounded-medium bg-primary-muted text-primary">
                <CheckCircle2
                  aria-hidden="true"
                  className="size-20"
                />
              </div>

              <div>
                <p className="text-xs text-text-soft">
                  تعلم بثقة
                </p>

                <p className="text-sm font-bold text-text">
                  خطوة بخطوة
                </p>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-16 -left-20 flex items-center gap-12 rounded-xl border border-border bg-surface-raised px-16 py-12 shadow-large">
              <div className="flex size-40 items-center justify-center rounded-medium bg-accent-muted text-accent">
                <Sparkles
                  aria-hidden="true"
                  className="size-20"
                />
              </div>

              <div>
                <p className="text-xs text-text-soft">
                  منصة متخصصة
                </p>

                <p className="text-sm font-bold text-text">
                  للغة العربية
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}