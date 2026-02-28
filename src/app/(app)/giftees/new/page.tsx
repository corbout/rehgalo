"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { generateSlug } from "@/lib/utils/helpers";

const relationships = [
  "mom", "dad", "sister", "brother", "spouse", "partner",
  "friend", "coworker", "boss", "child", "grandparent", "other",
];

export default function NewGifteePage() {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState("");
  const [styles, setStyles] = useState("");
  const [colors, setColors] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) { router.push("/login"); return; }

    const { error: insertError } = await supabase.from("giftees").insert({
      user_id: user.id,
      name,
      relationship: relationship || null,
      age: age ? parseInt(age) : null,
      gender: gender || null,
      interests: interests ? interests.split(",").map((s) => s.trim()) : null,
      styles: styles ? styles.split(",").map((s) => s.trim()) : null,
      colors: colors ? colors.split(",").map((s) => s.trim()) : null,
      budget_min: budgetMin ? parseInt(budgetMin) : null,
      budget_max: budgetMax ? parseInt(budgetMax) : null,
      dislikes: dislikes ? dislikes.split(",").map((s) => s.trim()) : null,
      notes: notes || null,
      shareable_slug: generateSlug(),
    });

    if (insertError) { setError(insertError.message); setLoading(false); return; }

    router.push("/giftees");
    router.refresh();
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* ── Header ── */}
      <div className="pt-12 pb-8 border-b border-rule">
        <Link
          href="/giftees"
          className="text-[11px] font-medium tracking-[0.12em] uppercase text-ink-light hover:text-accent transition-colors"
        >
          &larr; Back to Giftees
        </Link>
        <h1 className="font-serif text-4xl font-normal tracking-tight text-ink mt-4">
          Add a <em>Giftee</em>
        </h1>
        <p className="font-editorial text-lg italic text-ink-light mt-1">
          Create a profile for someone you buy gifts for
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10">
        {error && (
          <div className="border-l-2 border-accent bg-paper-warm px-4 py-3 text-sm text-ink mb-8">
            {error}
          </div>
        )}

        {/* ── Basic Info ── */}
        <div className="section-header">
          <h2>Basic Info</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="text-xs font-medium tracking-[0.12em] uppercase text-ink-light block mb-2">
              Name *
            </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="input-editorial" placeholder="Their name" required />
          </div>
          <div>
            <label className="text-xs font-medium tracking-[0.12em] uppercase text-ink-light block mb-2">
              Relationship
            </label>
            <select value={relationship} onChange={(e) => setRelationship(e.target.value)}
              className="input-editorial">
              <option value="">Select...</option>
              {relationships.map((r) => (
                <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium tracking-[0.12em] uppercase text-ink-light block mb-2">
              Age
            </label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)}
              className="input-editorial" placeholder="Their age" min="0" max="120" />
          </div>
          <div>
            <label className="text-xs font-medium tracking-[0.12em] uppercase text-ink-light block mb-2">
              Gender
            </label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}
              className="input-editorial">
              <option value="">Select...</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-binary</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* ── Preferences ── */}
        <div className="section-header">
          <h2>Preferences</h2>
        </div>
        <div className="space-y-6 mb-10">
          <div>
            <label className="text-xs font-medium tracking-[0.12em] uppercase text-ink-light block mb-2">
              Interests
            </label>
            <input type="text" value={interests} onChange={(e) => setInterests(e.target.value)}
              className="input-editorial" placeholder="cooking, reading, hiking (comma separated)" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-medium tracking-[0.12em] uppercase text-ink-light block mb-2">
                Styles
              </label>
              <input type="text" value={styles} onChange={(e) => setStyles(e.target.value)}
                className="input-editorial" placeholder="minimalist, modern" />
            </div>
            <div>
              <label className="text-xs font-medium tracking-[0.12em] uppercase text-ink-light block mb-2">
                Colors
              </label>
              <input type="text" value={colors} onChange={(e) => setColors(e.target.value)}
                className="input-editorial" placeholder="blue, green, neutral" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium tracking-[0.12em] uppercase text-ink-light block mb-2">
              Dislikes
            </label>
            <input type="text" value={dislikes} onChange={(e) => setDislikes(e.target.value)}
              className="input-editorial" placeholder="candles, socks, generic gift cards" />
          </div>
        </div>

        {/* ── Budget ── */}
        <div className="section-header">
          <h2>Budget Range</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-10">
          <div>
            <label className="text-xs font-medium tracking-[0.12em] uppercase text-ink-light block mb-2">
              Min ($)
            </label>
            <input type="number" value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)}
              className="input-editorial" placeholder="25" min="0" />
          </div>
          <div>
            <label className="text-xs font-medium tracking-[0.12em] uppercase text-ink-light block mb-2">
              Max ($)
            </label>
            <input type="number" value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)}
              className="input-editorial" placeholder="100" min="0" />
          </div>
        </div>

        {/* ── Notes ── */}
        <div className="section-header">
          <h2>Notes</h2>
        </div>
        <div className="mb-10">
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
            className="input-editorial" rows={4}
            placeholder="Any other notes about this person..." />
        </div>

        <button type="submit" disabled={loading}
          className="btn-accent w-full justify-center disabled:opacity-50">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Save Giftee →"
          )}
        </button>
      </form>
    </div>
  );
}
