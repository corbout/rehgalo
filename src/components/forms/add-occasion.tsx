"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Plus, Loader2 } from "lucide-react";

const occasionTypes = [
  "birthday",
  "anniversary",
  "christmas",
  "valentine",
  "mothers_day",
  "fathers_day",
  "graduation",
  "wedding",
  "housewarming",
  "other",
];

export function AddOccasionForm({
  giftees,
}: {
  giftees: { id: string; name: string }[];
}) {
  const [gifteeId, setGifteeId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!gifteeId || !name || !date) return;
    setLoading(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("occasions").insert({
      user_id: user.id,
      giftee_id: gifteeId,
      name,
      type: type || null,
      date,
      recurring,
    });

    setGifteeId("");
    setName("");
    setType("");
    setDate("");
    setRecurring(false);
    setLoading(false);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end"
    >
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-600">Giftee</label>
        <select
          value={gifteeId}
          onChange={(e) => setGifteeId(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none text-sm"
          required
        >
          <option value="">Select...</option>
          {giftees.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-600">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none text-sm"
          placeholder="Mom's Birthday"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-600">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none text-sm"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
          <input
            type="checkbox"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
            className="rounded border-gray-300 text-rose-500 focus:ring-rose-200"
          />
          Recurring yearly
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-amber-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-amber-600 transition-colors disabled:opacity-50 flex items-center gap-1.5 justify-center"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Plus className="w-4 h-4" /> Add
          </>
        )}
      </button>
    </form>
  );
}
