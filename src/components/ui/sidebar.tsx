"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils/helpers";
import { LogOut, Settings, Share2 } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/giftees", label: "Giftees" },
  { href: "/calendar", label: "Calendar" },
  { href: "/saved", label: "Saved" },
  { href: "/circles", label: "Circles" },
];

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/92 backdrop-blur-xl border-b border-rule">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-ink flex items-center justify-center">
            <span className="font-serif text-sm font-bold text-paper">R</span>
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-ink">
            Rehgalo
          </span>
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-9">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-xs font-medium tracking-[0.12em] uppercase transition-colors relative",
                    isActive
                      ? "text-ink"
                      : "text-ink-light hover:text-ink"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-accent" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link
            href="/settings/profile"
            className="text-ink-light hover:text-ink transition-colors hidden md:block"
          >
            <Settings className="w-4 h-4" />
          </Link>
          <Link
            href="/settings/referrals"
            className="text-ink-light hover:text-ink transition-colors hidden md:block"
          >
            <Share2 className="w-4 h-4" />
          </Link>
          <button
            onClick={handleLogout}
            className="text-ink-light hover:text-accent transition-colors hidden md:block"
          >
            <LogOut className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center">
            <span className="text-paper text-xs font-medium">JC</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
