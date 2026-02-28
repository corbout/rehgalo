"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export function AddMentionForm({ gifteeId }: { gifteeId: string }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
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
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="input-editorial flex-1"
        placeholder='e.g. "She mentioned wanting new garden gloves"'
      />
      <button
        type="submit"
        disabled={loading || !content.trim()}
        className="btn-accent disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add"}
      </button>
    </form>
  );
}
