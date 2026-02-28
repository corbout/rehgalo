"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils/helpers";
import {
  Gift,
  LayoutDashboard,
  Users,
  CalendarDays,
  Bookmark,
  CircleDot,
  Settings,
  LogOut,
  Share2,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/giftees", label: "Giftees", icon: Users },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/circles", label: "Circles", icon: CircleDot },
];

const bottomItems = [
  { href: "/settings/profile", label: "Settings", icon: Settings },
  { href: "/settings/referrals", label: "Referrals", icon: Share2 },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-30">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-gradient-to-br from-rose-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20">
            <Gift className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
            Rehgalo
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-gradient-to-r from-rose-50 to-amber-50 text-rose-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "w-4.5 h-4.5",
                  isActive ? "text-rose-500" : "text-gray-400"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4 space-y-1">
        {bottomItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-gradient-to-r from-rose-50 to-amber-50 text-rose-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "w-4.5 h-4.5",
                  isActive ? "text-rose-500" : "text-gray-400"
                )}
              />
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all w-full"
        >
          <LogOut className="w-4.5 h-4.5 text-gray-400" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
