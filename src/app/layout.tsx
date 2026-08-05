import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/styles/globals.css";

import Navbar from "@/shared/components/navigation/navbar";
import { ThemeProvider } from "@/shared/ui/theme-provider";

export const metadata: Metadata = {
  title: "Al-Deyaa",
  description: "Educational platform foundation for Al-Deyaa.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="light">
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}