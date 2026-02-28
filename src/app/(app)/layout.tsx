import { TopNav } from "@/components/ui/sidebar";
import { MobileNav } from "@/components/ui/mobile-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <TopNav />
      <main className="pt-16 pb-20 md:pb-0">
        <div className="max-w-[1320px] mx-auto px-6 md:px-12">{children}</div>
      </main>
      <MobileNav />
    </div>
  );
}
