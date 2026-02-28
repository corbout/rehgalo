"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Plus, Loader2 } from "lucide-react";

export function AddMentionForm({ gifteeId }: { gifteeId: string }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("mentions").insert({
      user_id: user.id,
      giftee_id: gifteeId,
      content: content.trim(),
    });

    setContent("");
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-sm"
        placeholder='e.g. "She mentioned wanting new garden gloves"'
      />
      <button
        type="submit"
        disabled={loading || !content.trim()}
        className="bg-purple-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-purple-600 transition-colors disabled:opacity-50 flex items-center gap-1.5"
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
