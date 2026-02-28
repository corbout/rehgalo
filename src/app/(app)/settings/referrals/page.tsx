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
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Referrals</h1>
        <p className="text-gray-500 text-sm mt-1">
          Invite friends and unlock premium features
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="text-center mb-6">
          <p className="text-4xl font-bold text-gray-900">{referralCount}</p>
          <p className="text-sm text-gray-500">people referred</p>
        </div>

        <div className="space-y-1.5 mb-6">
          <label className="text-sm font-medium text-gray-700">
            Your referral link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={referralUrl}
              className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-600"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">Reward Tiers</h3>
          {tiers.map((tier) => {
            const isUnlocked = referralCount >= tier.count;
            return (
              <div
                key={tier.count}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  isUnlocked ? "bg-green-50" : "bg-gray-50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isUnlocked ? "bg-green-100" : "bg-gray-200"
                  }`}
                >
                  <tier.icon
                    className={`w-4 h-4 ${
                      isUnlocked ? "text-green-600" : "text-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${
                      isUnlocked ? "text-green-900" : "text-gray-600"
                    }`}
                  >
                    {tier.label}
                  </p>
                  <p className="text-xs text-gray-500">{tier.description}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    isUnlocked
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-500"
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
  );
}
