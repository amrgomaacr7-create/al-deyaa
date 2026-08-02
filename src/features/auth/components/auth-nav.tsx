"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";

type User = {
  email?: string;
  user_metadata?: {
    full_name?: string;
  };
};

export function AuthNav() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function loadUser() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          setUser(null);
        } else {
          setUser(user);
        }
      } catch (error) {
        console.error("Auth loading error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    const supabase = createClient();

    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  /*
   * Loading State
   * نفس شكل أزرار الـ Auth النهائية
   * لتجنب تغيير شكل الـ Navbar أثناء التحميل
   */
  if (loading) {
    return (
      <div className="flex items-center gap-12">
        <div
          className="h-44 w-112 animate-pulse rounded-medium border border-border bg-surface"
          aria-hidden="true"
        />

        <div
          className="h-44 w-112 animate-pulse rounded-medium bg-primary/40"
          aria-hidden="true"
        />
      </div>
    );
  }

  /*
   * Guest User
   * المستخدم غير مسجل الدخول
   */
  if (!user) {
    return (
      <div className="flex items-center gap-12">
        {/* Login */}
        <Link
          href="/login"
          className="
            inline-flex
            h-44
            items-center
            justify-center
            rounded-medium
            border
            border-primary
            bg-transparent
            px-20
            text-sm
            font-semibold
            text-primary
            transition-all
            duration-fast
            hover:bg-primary
            hover:text-primary-foreground
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-focus-ring
          "
        >
          تسجيل الدخول
        </Link>

        {/* Register */}
        <Link
          href="/register"
          className="
            inline-flex
            h-44
            items-center
            justify-center
            rounded-medium
            bg-primary
            px-20
            text-sm
            font-semibold
            text-primary-foreground
            transition-all
            duration-fast
            hover:bg-primary-hover
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-focus-ring
          "
        >
          إنشاء حساب
        </Link>
      </div>
    );
  }

  /*
   * Logged-in User
   */
  const name =
    user.user_metadata?.full_name ||
    user.email ||
    "الطالب";

  return (
    <div className="flex items-center gap-12">
      {/* User Welcome */}
      <span className="text-sm font-semibold text-text">
        مرحبًا، {name}
      </span>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="
          inline-flex
          h-44
          items-center
          justify-center
          rounded-medium
          border
          border-border
          bg-transparent
          px-20
          text-sm
          font-semibold
          text-text
          transition-all
          duration-fast
          hover:border-danger
          hover:bg-danger
          hover:text-white
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-focus-ring
        "
      >
        تسجيل الخروج
      </button>
    </div>
  );
}

export default AuthNav;