"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Mail } from "lucide-react";

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          referral_code: ref || undefined,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="space-y-10">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3">
            <div className="w-10 h-10 bg-ink flex items-center justify-center">
              <span className="text-white font-serif text-lg font-bold leading-none">
                R
              </span>
            </div>
            <span className="text-2xl font-serif font-semibold text-ink tracking-tight">
              Rehgalo
            </span>
          </div>
        </div>

        {/* Confirmation Card */}
        <div className="border border-rule p-10 text-center space-y-5">
          <div className="w-12 h-12 border border-rule flex items-center justify-center mx-auto">
            <Mail className="w-5 h-5 text-accent" />
          </div>
          <h2 className="text-2xl font-serif font-semibold text-ink">
            Check Your Email
          </h2>
          <p className="text-sm font-body text-ink-light leading-relaxed">
            We sent a confirmation link to{" "}
            <strong className="text-ink font-medium">{email}</strong>. Click the
            link to activate your account.
          </p>
        </div>
      </div>
    );
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
        <h1 className="text-4xl font-serif font-semibold text-ink">
          Create Account
        </h1>
        <p className="font-editorial italic text-ink-light text-lg">
          Begin your journey in thoughtful gifting
        </p>
        {ref && (
          <p className="text-sm font-body text-accent border-l-2 border-accent bg-paper-warm inline-block px-3 py-1.5 mt-3">
            Referred by a friend
          </p>
        )}
      </div>

      {/* Form Card */}
      <form onSubmit={handleSignup}>
        <div className="border border-rule p-8 space-y-6">
          {error && (
            <div className="border-l-2 border-accent bg-paper-warm px-4 py-3 text-sm text-ink">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-xs font-medium tracking-[0.12em] uppercase text-ink-light"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-editorial w-full"
              placeholder="Your name"
              required
            />
          </div>

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
              placeholder="Min 6 characters"
              minLength={6}
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
              "Create Account"
            )}
          </button>
        </div>
      </form>

      {/* Bottom Link */}
      <p className="text-center text-sm font-body text-ink-light">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-accent hover:text-accent-hover font-medium underline underline-offset-2"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
