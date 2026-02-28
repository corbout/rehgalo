"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/helpers";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Bookmark,
  Settings,
} from "lucide-react";

const mobileItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/giftees", label: "Giftees", icon: Users },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/settings/profile", label: "Settings", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-30 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {mobileItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all min-w-[56px]",
                isActive ? "text-rose-600" : "text-gray-400"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
