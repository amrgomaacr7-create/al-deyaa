"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "./theme-provider";

type ThemeProviderWrapperProps = {
  children: ReactNode;
};

export default function ThemeProviderWrapper({
  children,
}: ThemeProviderWrapperProps) {
  return (
    <ThemeProvider defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}