"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import Link from "next/link";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      setLoading(false);
      return;
    }

    setMessage("تم تسجيل الدخول بنجاح.");

    setLoading(false);
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-background px-24 py-64"
    >
      <div className="mx-auto w-full max-w-[520px]">
        <div className="rounded-2xl border border-border bg-surface p-32 shadow-floating">
          <div className="mb-32 text-center">
            <p className="text-sm font-semibold text-primary">
              منصة الضياء
            </p>

            <h1 className="mt-12 text-3xl font-bold text-text">
              تسجيل الدخول
            </h1>

            <p className="mt-12 text-text-soft">
              سجل دخولك للمتابعة إلى حسابك في منصة الضياء.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-20"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-8 block text-sm font-semibold text-text"
              >
                البريد الإلكتروني
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
                placeholder="example@email.com"
                className="h-48 w-full rounded-medium border border-border bg-background px-16 text-text outline-none transition-colors focus:border-primary"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-8 block text-sm font-semibold text-text"
              >
                كلمة المرور
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
                placeholder="اكتب كلمة المرور"
                className="h-48 w-full rounded-medium border border-border bg-background px-16 text-text outline-none transition-colors focus:border-primary"
              />
            </div>

            {error && (
              <div className="rounded-medium border border-red-500/30 bg-red-500/10 p-16 text-sm text-red-500">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-medium border border-primary/30 bg-primary/10 p-16 text-sm text-primary">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-48 w-full rounded-medium bg-primary px-24 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "جاري تسجيل الدخول..."
                : "تسجيل الدخول"}
            </button>
          </form>

          <div className="mt-24 text-center text-sm text-text-soft">
            ليس لديك حساب؟{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              إنشاء حساب جديد
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}