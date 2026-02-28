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
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gift Circles</h1>
          <p className="text-gray-500 text-sm mt-1">
            Coordinate gift-giving with family and friends
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Locked Feature
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto mb-4">
            Gift Circles unlock at 6 referrals. You currently have{" "}
            {referralCount}. Share your referral code to unlock!
          </p>
          <div className="w-full max-w-xs mx-auto bg-gray-50 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full transition-all"
              style={{ width: `${Math.min((referralCount / 6) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gift Circles</h1>
        <p className="text-gray-500 text-sm mt-1">
          Coordinate gift-giving with family and friends
        </p>
      </div>

      {circles && circles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {circles.map((circle) => (
            <div
              key={circle.id}
              className="bg-white rounded-2xl border border-gray-100 p-5"
            >
              <h3 className="font-semibold text-gray-900">{circle.name}</h3>
              <p className="text-xs text-gray-500 mt-1">
                For {(circle.giftees as { name: string } | null)?.name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CircleDot className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            No circles yet
          </h3>
          <p className="text-sm text-gray-500">
            Create a circle to coordinate gifts with others.
          </p>
        </div>
      )}
    </div>
  );
}
