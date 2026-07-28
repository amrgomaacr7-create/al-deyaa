import Image from "next/image";

import { Container, Stack } from "@/shared/ui";

export function TeacherIntroSection() {
  return (
    <section className="py-64">
      <Container size="desktop">
        <div className="grid items-center gap-48 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute inset-0 translate-x-16 translate-y-16 rounded-2xl bg-surface-raised" />

            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
              <Image
                src="/images/teacher/teacher-profile.jpeg"
                alt="مدرس اللغة العربية في منصة الضياء التعليمية"
                width={600}
                height={800}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          <Stack gap={24}>
            <div>
              <p className="text-sm font-semibold text-primary">
                عن المدرس
              </p>

              <h2 className="mt-8 text-3xl font-bold leading-tight text-text sm:text-4xl">
                خبرة في تعليم اللغة العربية
              </h2>
            </div>

            <p className="text-lg leading-8 text-text-soft">
              أقدّم تجربة تعليمية متخصصة في اللغة العربية، تعتمد على الشرح
              الواضح والمحتوى المنظم والمتابعة المستمرة، لمساعدة الطلاب على
              تطوير مهاراتهم وبناء أساس قوي في اللغة.
            </p>

            <div className="grid grid-cols-2 gap-16 sm:grid-cols-3">
              <div className="rounded-medium border border-border bg-surface p-16">
                <p className="text-2xl font-bold text-text">+10</p>
                <p className="mt-4 text-sm text-text-soft">
                  سنوات خبرة
                </p>
              </div>

              <div className="rounded-medium border border-border bg-surface p-16">
                <p className="text-2xl font-bold text-text">+1000</p>
                <p className="mt-4 text-sm text-text-soft">
                  طالب
                </p>
              </div>

              <div className="rounded-medium border border-border bg-surface p-16">
                <p className="text-2xl font-bold text-text">100%</p>
                <p className="mt-4 text-sm text-text-soft">
                  لغة عربية
                </p>
              </div>
            </div>
          </Stack>
        </div>
      </Container>
    </section>
  );
}