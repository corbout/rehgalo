import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Share2, Gift, Bell, CircleDot, Trophy } from "lucide-react";

const tiers = [
  {
    count: 0,
    label: "Free Tier",
    description: "Core app with AI recommendations",
    icon: Gift,
    color: "gray",
  },
  {
    count: 3,
    label: "Price Alerts",
    description: "Get notified when prices drop",
    icon: Bell,
    color: "amber",
  },
  {
    count: 6,
    label: "Gift Circles",
    description: "Coordinate gifts with family",
    icon: CircleDot,
    color: "purple",
  },
  {
    count: 10,
    label: "All Features + Badge",
    description: "Everything unlocked",
    icon: Trophy,
    color: "rose",
  },
];

export default async function ReferralsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("referral_code, referral_count")
    .eq("user_id", user.id)
    .single();

  const referralCount = profile?.referral_count || 0;
  const referralUrl = `${process.env.NEXT_PUBLIC_APP_URL}/signup?ref=${profile?.referral_code}`;

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      {/* Page Header */}
      <div>
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body mb-2">
          Growth
        </p>
        <h1 className="font-serif text-3xl font-bold text-ink">
          Referrals
        </h1>
        <p className="font-editorial text-lg italic text-ink-light mt-1">
          Invite friends and unlock premium features
        </p>
        <div className="h-px bg-rule mt-6" />
      </div>

      <div className="border border-rule p-8 space-y-8">
        {/* Count Display */}
        <div className="text-center pb-8 border-b border-rule">
          <p className="font-serif text-5xl font-bold text-ink">{referralCount}</p>
          <p className="text-sm text-ink-muted font-editorial italic mt-1">
            people referred
          </p>
        </div>

        {/* Referral Link */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body">
            Your referral link
          </label>
          <input
            type="text"
            readOnly
            value={referralUrl}
            className="input-editorial text-ink-light"
          />
        </div>

        {/* Reward Tiers */}
        <div>
          <div className="section-header">
            <h2>Reward Tiers</h2>
          </div>
          <div>
            {tiers.map((tier) => {
              const isUnlocked = referralCount >= tier.count;
              return (
                <div
                  key={tier.count}
                  className={`flex items-center gap-4 py-4 border-b border-rule ${
                    isUnlocked ? "bg-paper-warm -mx-4 px-4" : ""
                  }`}
                >
                  <div
                    className={`w-9 h-9 border flex items-center justify-center ${
                      isUnlocked ? "border-accent" : "border-rule"
                    }`}
                  >
                    <tier.icon
                      className={`w-4 h-4 ${
                        isUnlocked ? "text-accent" : "text-ink-muted"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold font-body ${
                        isUnlocked ? "text-ink" : "text-ink-light"
                      }`}
                    >
                      {tier.label}
                    </p>
                    <p className="text-xs text-ink-muted font-body">
                      {tier.description}
                    </p>
                  </div>
                  <span
                    className={`badge-urgency ${
                      isUnlocked ? "badge-high" : "badge-low"
                    }`}
                  >
                    {isUnlocked ? "Unlocked" : `${tier.count} refs`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
