"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export function AddOccasionForm({
  giftees,
}: {
  giftees: { id: string; name: string }[];
}) {
  const [gifteeId, setGifteeId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!gifteeId || !name || !date) return;
    setLoading(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("occasions").insert({
      user_id: user.id,
      giftee_id: gifteeId,
      name,
      date,
      recurring,
    });

    setGifteeId("");
    setName("");
    setDate("");
    setRecurring(false);
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
      <div>
        <label className="text-xs font-medium tracking-[0.12em] uppercase text-ink-light block mb-2">
          Giftee
        </label>
        <select value={gifteeId} onChange={(e) => setGifteeId(e.target.value)}
          className="input-editorial" required>
          <option value="">Select...</option>
          {giftees.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium tracking-[0.12em] uppercase text-ink-light block mb-2">
          Occasion Name
        </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
          className="input-editorial" placeholder="Mom's Birthday" required />
      </div>
      <div>
        <label className="text-xs font-medium tracking-[0.12em] uppercase text-ink-light block mb-2">
          Date
        </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
          className="input-editorial" required />
      </div>
      <div>
        <label className="flex items-center gap-2 text-xs font-medium tracking-[0.1em] uppercase text-ink-light cursor-pointer">
          <input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)}
            className="accent-[var(--accent)]" />
          Recurring yearly
        </label>
      </div>
      <button type="submit" disabled={loading}
        className="btn-accent justify-center disabled:opacity-50">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add →"}
      </button>
    </form>
  );
}
