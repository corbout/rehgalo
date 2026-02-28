"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Gift, Save, Loader2, Check } from "lucide-react";

type GifteeProfile = {
  id: string;
  name: string;
  interests: string[] | null;
  styles: string[] | null;
  colors: string[] | null;
  dislikes: string[] | null;
  budget_min: number | null;
  budget_max: number | null;
  profile_completed_by: string | null;
};

export default function PublicProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [profile, setProfile] = useState<GifteeProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [interests, setInterests] = useState("");
  const [styles, setStyles] = useState("");
  const [colors, setColors] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("giftees")
        .select("id, name, interests, styles, colors, dislikes, budget_min, budget_max, profile_completed_by")
        .eq("shareable_slug", slug)
        .single();

      if (!data) {
        setNotFound(true);
      } else {
        setProfile(data);
        setInterests(data.interests?.join(", ") || "");
        setStyles(data.styles?.join(", ") || "");
        setColors(data.colors?.join(", ") || "");
        setDislikes(data.dislikes?.join(", ") || "");
        setBudgetMin(data.budget_min?.toString() || "");
        setBudgetMax(data.budget_max?.toString() || "");
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);

    const supabase = createClient();
    await supabase
      .from("giftees")
      .update({
        interests: interests ? interests.split(",").map((s) => s.trim()) : null,
        styles: styles ? styles.split(",").map((s) => s.trim()) : null,
        colors: colors ? colors.split(",").map((s) => s.trim()) : null,
        dislikes: dislikes ? dislikes.split(",").map((s) => s.trim()) : null,
        budget_min: budgetMin ? parseInt(budgetMin) : null,
        budget_max: budgetMax ? parseInt(budgetMax) : null,
        profile_completed_by: "giftee",
        updated_at: new Date().toISOString(),
      })
      .eq("shareable_slug", slug);

    setSaving(false);
    setSaved(true);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rose-400" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Profile not found
          </h1>
          <p className="text-gray-500">
            This link may be invalid or expired.
          </p>
        </div>
      </div>
    );
  }

  if (saved) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Profile Updated!
          </h2>
          <p className="text-sm text-gray-500">
            Thanks for filling in your preferences, {profile?.name}. This will
            help them find the perfect gift for you!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Hi {profile?.name}!
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Someone wants to get you the perfect gift. Fill in your preferences
            to help them out!
          </p>
        </div>

        <form onSubmit={handleSave}>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                What are you into?
              </label>
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
                placeholder="cooking, reading, hiking, tech..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Style preferences
                </label>
                <input
                  type="text"
                  value={styles}
                  onChange={(e) => setStyles(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
                  placeholder="minimalist, cozy"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Favorite colors
                </label>
                <input
                  type="text"
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
                  placeholder="blue, earth tones"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Anything you DON&apos;T want?
              </label>
              <input
                type="text"
                value={dislikes}
                onChange={(e) => setDislikes(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
                placeholder="candles, socks, gift cards"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Budget min ($)
                </label>
                <input
                  type="number"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
                  placeholder="25"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Budget max ($)
                </label>
                <input
                  type="number"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
                  placeholder="100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-2.5 rounded-xl font-medium hover:from-rose-600 hover:to-amber-600 transition-all shadow-lg shadow-rose-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save My Preferences
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-gray-400">
          Powered by Rehgalo
        </p>
      </div>
    </div>
  );
}
