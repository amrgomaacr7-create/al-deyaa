import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/styles/globals.css";

import Navbar from "@/shared/components/navigation/navbar";

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
    <html lang="ar" dir="rtl">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}