"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage(
      "تم إنشاء الحساب بنجاح. تحقق من بريدك الإلكتروني لتأكيد الحساب.",
    );

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-background px-24 py-64">
      <div className="mx-auto w-full max-w-[520px]">
        <div className="rounded-2xl border border-border bg-surface p-32 shadow-floating">
          <div className="mb-32 text-center">
            <p className="text-sm font-semibold text-primary">
              منصة الضياء
            </p>

            <h1 className="mt-12 text-3xl font-bold text-text">
              إنشاء حساب جديد
            </h1>

            <p className="mt-12 text-text-soft">
              أنشئ حسابك وابدأ رحلتك التعليمية مع الضياء.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-20">
            <div>
              <label
                htmlFor="name"
                className="mb-8 block text-sm font-semibold text-text"
              >
                الاسم
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                placeholder="اكتب اسمك"
                className="h-48 w-full rounded-medium border border-border bg-background px-16 text-text outline-none transition-colors focus:border-primary"
              />
            </div>

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
                onChange={(event) => setEmail(event.target.value)}
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
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
                placeholder="6 أحرف على الأقل"
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
              {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
            </button>
          </form>

          <div className="mt-24 text-center text-sm text-text-soft">
             لديك حساب بالفعل؟
            </div>
        </div>
      </div>
    </main>
  );
}