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
        <Loader2 className="w-6 h-6 animate-spin text-ink-muted" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      {/* Page Header */}
      <div>
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body mb-2">
          Settings
        </p>
        <h1 className="font-serif text-3xl font-bold text-ink">
          Your Profile
        </h1>
        <p className="font-editorial text-lg italic text-ink-light mt-1">
          Your gift preferences, so others know what to get you
        </p>
        <div className="h-px bg-rule mt-6" />
      </div>

      <form onSubmit={handleSave}>
        <div className="border border-rule p-8 space-y-6">
          <div className="section-header !mb-0">
            <h2>Personal Details</h2>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body">
              Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="input-editorial"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body">
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
              className="input-editorial"
              placeholder="cooking, reading, hiking"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body">
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
                className="input-editorial"
                placeholder="minimalist, modern"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body">
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
                className="input-editorial"
                placeholder="blue, green"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body">
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
              className="input-editorial"
              placeholder="candles, socks"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body">
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
                className="input-editorial"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body">
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
                className="input-editorial"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-rule">
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body mb-2">
              Your shareable profile
            </p>
            <code className="text-xs bg-paper-warm px-4 py-2.5 block text-ink-light font-body border border-rule">
              {process.env.NEXT_PUBLIC_APP_URL}/p/{profile.shareable_slug}
            </code>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-accent w-full justify-center disabled:opacity-50"
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
