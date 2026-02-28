import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CircleDot, Lock } from "lucide-react";

export default async function CirclesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("referral_count")
    .eq("user_id", user.id)
    .single();

  const referralCount = profile?.referral_count || 0;
  const isUnlocked = referralCount >= 6;

  if (!isUnlocked) {
    return (
      <div className="space-y-10">
        {/* Page Header */}
        <div>
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body mb-2">
            Community
          </p>
          <h1 className="font-serif text-3xl font-bold text-ink">
            Gift Circles
          </h1>
          <p className="font-editorial text-lg italic text-ink-light mt-1">
            Coordinate gift-giving with family and friends
          </p>
          <div className="h-px bg-rule mt-6" />
        </div>

        {/* Locked State */}
        <div className="border border-rule p-16 text-center">
          <div className="w-16 h-16 border border-rule flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-ink-muted" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-ink mb-2">
            Locked Feature
          </h3>
          <p className="text-sm text-ink-light font-body max-w-sm mx-auto mb-6 leading-relaxed">
            Gift Circles unlock at 6 referrals. You currently have{" "}
            {referralCount}. Share your referral code to unlock!
          </p>
          <div className="w-full max-w-xs mx-auto bg-paper-warm h-1 overflow-hidden">
            <div
              className="bg-accent h-full transition-all"
              style={{ width: `${Math.min((referralCount / 6) * 100, 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-ink-muted mt-3 font-body tracking-[0.08em]">
            {referralCount}/6 referrals
          </p>
        </div>
      </div>
    );
  }

  const { data: circles } = await supabase
    .from("gift_circles")
    .select("*, giftees(name), circle_members(count)")
    .eq("created_by", user.id);

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div>
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body mb-2">
          Community
        </p>
        <h1 className="font-serif text-3xl font-bold text-ink">
          Gift Circles
        </h1>
        <p className="font-editorial text-lg italic text-ink-light mt-1">
          Coordinate gift-giving with family and friends
        </p>
        <div className="h-px bg-rule mt-6" />
      </div>

      {circles && circles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {circles.map((circle) => (
            <div
              key={circle.id}
              className="editorial-card p-6"
            >
              <h3 className="font-serif text-lg font-semibold text-ink">
                {circle.name}
              </h3>
              <p className="text-xs text-ink-muted font-editorial italic mt-1">
                For {(circle.giftees as { name: string } | null)?.name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-rule p-16 text-center">
          <div className="w-16 h-16 border border-rule flex items-center justify-center mx-auto mb-6">
            <CircleDot className="w-8 h-8 text-ink-muted" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-ink mb-2">
            No circles yet
          </h3>
          <p className="text-sm text-ink-light font-body">
            Create a circle to coordinate gifts with others.
          </p>
        </div>
      )}
    </div>
  );
}
