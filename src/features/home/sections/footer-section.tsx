import Link from "next/link";

import { Container, Stack } from "@/shared/ui";

export function FooterSection() {
  return (
    <footer className="border-t border-border bg-surface py-48">
      <Container size="desktop">
        <div className="grid gap-40 md:grid-cols-2 lg:grid-cols-4">
          <Stack gap={16}>
            <Link
              href="/"
              className="text-xl font-bold text-text"
            >
              الضياء
            </Link>

            <p className="max-w-[320px] text-sm leading-7 text-text-soft">
              منصة تعليمية متخصصة في تعليم اللغة العربية، نقدم تجربة تعليمية
              منظمة تساعدك على التعلم والتقدم بثقة.
            </p>
          </Stack>

          <Stack gap={16}>
            <h3 className="font-semibold text-text">
              المنصة
            </h3>

            <Link
              href="/"
              className="text-sm text-text-soft transition-colors hover:text-primary"
            >
              الرئيسية
            </Link>

            <Link
              href="/"
              className="text-sm text-text-soft transition-colors hover:text-primary"
            >
              الكورسات
            </Link>

            <Link
              href="/"
              className="text-sm text-text-soft transition-colors hover:text-primary"
            >
              عن المدرس
            </Link>
          </Stack>

          <Stack gap={16}>
            <h3 className="font-semibold text-text">
              المساعدة
            </h3>

            <Link
              href="/"
              className="text-sm text-text-soft transition-colors hover:text-primary"
            >
              الأسئلة الشائعة
            </Link>

            <Link
              href="/"
              className="text-sm text-text-soft transition-colors hover:text-primary"
            >
              تواصل معنا
            </Link>
          </Stack>

          <Stack gap={16}>
            <h3 className="font-semibold text-text">
              تواصل معنا
            </h3>

            <p className="text-sm text-text-soft">
              مصر
            </p>

            <p className="text-sm text-text-soft">
              سنضيف وسائل التواصل هنا لاحقًا.
            </p>
          </Stack>
        </div>

        <div className="mt-48 border-t border-border pt-24">
          <p className="text-center text-sm text-text-soft">
            © {new Date().getFullYear()} منصة الضياء. جميع الحقوق محفوظة.
          </p>
        </div>
      </Container>
    </footer>
  );
}