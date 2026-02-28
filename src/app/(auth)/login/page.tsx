"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="space-y-10">
      {/* Logo */}
      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-10 h-10 bg-ink flex items-center justify-center">
            <span className="text-white font-serif text-lg font-bold leading-none">
              R
            </span>
          </div>
          <span className="text-2xl font-serif font-semibold text-ink tracking-tight">
            Rehgalo
          </span>
        </Link>
      </div>

      {/* Heading */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-serif font-semibold text-ink">Sign In</h1>
        <p className="font-editorial italic text-ink-light text-lg">
          Welcome back to thoughtful gifting
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleLogin}>
        <div className="border border-rule p-8 space-y-6">
          {error && (
            <div className="border-l-2 border-accent bg-paper-warm px-4 py-3 text-sm text-ink">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-xs font-medium tracking-[0.12em] uppercase text-ink-light"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-editorial w-full"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-xs font-medium tracking-[0.12em] uppercase text-ink-light"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-editorial w-full"
              placeholder="Your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-accent w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>

      {/* Bottom Link */}
      <p className="text-center text-sm font-body text-ink-light">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-accent hover:text-accent-hover font-medium underline underline-offset-2"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
