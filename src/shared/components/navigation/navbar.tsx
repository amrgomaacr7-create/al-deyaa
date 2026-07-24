"use client";

import Link from "next/link";
import type { Route } from "next";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";

import { Button, cn } from "@/shared/ui";

const navigationItems = [
  { label: "الرئيسية", href: "/" },
  { label: "الكورسات", href: "/" },
  { label: "عن المدرس", href: "/" },
  { label: "تواصل معنا", href: "/" }
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((current) => !current);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((current) => !current);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border",
        "bg-background/95 backdrop-blur-md",
        "supports-[backdrop-filter]:bg-background/80"
      )}
    >
      <div className="mx-auto flex min-h-72 max-w-[1280px] items-center justify-between px-16 md:px-24">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-text transition-colors duration-fast hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          aria-label="الضياء - الصفحة الرئيسية"
        >
          الضياء
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-24 md:flex"
          aria-label="التنقل الرئيسي"
        >
          {navigationItems.map((item) => (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href as Route}
              className="text-sm font-medium text-text-soft transition-colors duration-fast hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-12 md:flex">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          <Button variant="ghost" size="sm">
            تسجيل الدخول
          </Button>

          <Button variant="primary" size="sm">
            إنشاء حساب
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-8 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-border bg-background px-16 py-16 md:hidden"
          aria-label="التنقل على الهاتف"
        >
          <div className="flex flex-col gap-8">
            {navigationItems.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href as Route}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-medium px-12 py-8 text-sm font-medium text-text transition-colors duration-fast hover:bg-background-elevated hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-8 flex flex-col gap-8 border-t border-border pt-16">
              <Button variant="ghost" size="md">
                تسجيل الدخول
              </Button>

              <Button variant="primary" size="md">
                إنشاء حساب
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;