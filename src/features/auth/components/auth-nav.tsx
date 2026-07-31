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

        console.log("Auth user:", user);
        console.log("Auth error:", error);

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
        console.log("Auth state changed:", session?.user);

        setUser(session?.user ?? null);
        setLoading(false);
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    setUser(null);
  }

  if (loading) {
    return (
      <div className="flex items-center gap-12">
        <Link
          href="/login"
          className="inline-flex h-44 items-center justify-center rounded-medium border-2 border-red-500 bg-white px-20 text-sm font-bold text-black"
        >
          تسجيل الدخول
        </Link>

        <Link
          href="/register"
          className="inline-flex h-44 items-center justify-center rounded-medium bg-yellow-400 px-20 text-sm font-bold text-black"
        >
          إنشاء حساب
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-12">
        <Link
          href="/login"
          className="inline-flex h-44 items-center justify-center rounded-medium border border-border px-20 text-sm font-semibold text-text transition-colors hover:bg-surface"
        >
          تسجيل الدخول
        </Link>

        <Link
          href="/register"
          className="inline-flex h-44 items-center justify-center rounded-medium bg-primary px-20 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          إنشاء حساب
        </Link>
      </div>
    );
  }

  const name =
    user.user_metadata?.full_name ||
    user.email ||
    "الطالب";

  return (
    <div className="flex items-center gap-12">
      <span className="text-sm font-semibold text-text">
        مرحبًا، {name}
      </span>

      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex h-44 items-center justify-center rounded-medium border border-border px-20 text-sm font-semibold text-text transition-colors hover:bg-surface"
      >
        تسجيل الخروج
      </button>
    </div>
  );
}