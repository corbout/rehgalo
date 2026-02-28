"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Save, Loader2, User } from "lucide-react";

export default function SettingsProfilePage() {
  const [profile, setProfile] = useState<{
    name: string;
    interests: string[];
    styles: string[];
    colors: string[];
    budget_min: number | null;
    budget_max: number | null;
    dislikes: string[];
    shareable_slug: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setProfile({
          name: data.name || "",
          interests: data.interests || [],
          styles: data.styles || [],
          colors: data.colors || [],
          budget_min: data.budget_min,
          budget_max: data.budget_max,
          dislikes: data.dislikes || [],
          shareable_slug: data.shareable_slug || "",
        });
      }
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("profiles")
      .update({
        name: profile.name,
        interests: profile.interests,
        styles: profile.styles,
        colors: profile.colors,
        budget_min: profile.budget_min,
        budget_max: profile.budget_max,
        dislikes: profile.dislikes,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-500 text-sm mt-1">
          Your gift preferences (so others know what to get you)
        </p>
      </div>

      <form onSubmit={handleSave}>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Interests
            </label>
            <input
              type="text"
              value={profile.interests.join(", ")}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  interests: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                })
              }
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
              placeholder="cooking, reading, hiking"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Styles
              </label>
              <input
                type="text"
                value={profile.styles.join(", ")}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    styles: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
                placeholder="minimalist, modern"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Colors
              </label>
              <input
                type="text"
                value={profile.colors.join(", ")}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    colors: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
                placeholder="blue, green"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Dislikes
            </label>
            <input
              type="text"
              value={profile.dislikes.join(", ")}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  dislikes: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                })
              }
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
              placeholder="candles, socks"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Budget Min ($)
              </label>
              <input
                type="number"
                value={profile.budget_min || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    budget_min: e.target.value
                      ? parseInt(e.target.value)
                      : null,
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Budget Max ($)
              </label>
              <input
                type="number"
                value={profile.budget_max || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    budget_max: e.target.value
                      ? parseInt(e.target.value)
                      : null,
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Your shareable profile</p>
            <code className="text-xs bg-gray-50 px-3 py-2 rounded-lg block text-gray-600">
              {process.env.NEXT_PUBLIC_APP_URL}/p/{profile.shareable_slug}
            </code>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-2.5 rounded-xl font-medium hover:from-rose-600 hover:to-amber-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : success ? (
              "Saved!"
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Profile
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
