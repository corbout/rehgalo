"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/helpers";

const mobileItems = [
  { href: "/dashboard", label: "Home" },
  { href: "/giftees", label: "Giftees" },
  { href: "/calendar", label: "Calendar" },
  { href: "/saved", label: "Saved" },
  { href: "/settings/profile", label: "Settings" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-paper/95 backdrop-blur-xl border-t border-rule z-50 md:hidden">
      <div className="flex items-center justify-around px-2 py-2.5">
        {mobileItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1 transition-all",
                isActive ? "text-accent" : "text-ink-muted"
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-medium tracking-[0.1em] uppercase",
                  isActive && "border-b border-accent pb-0.5"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
