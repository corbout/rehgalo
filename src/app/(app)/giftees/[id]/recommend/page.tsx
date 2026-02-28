import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default async function RecommendPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: giftee } = await supabase
    .from("giftees")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!giftee) notFound();

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div>
        <Link
          href={`/giftees/${id}`}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-light hover:text-accent transition-colors font-body mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to {giftee.name}
        </Link>
        <h1 className="font-serif text-3xl font-bold text-ink">
          Recommendations
        </h1>
        <p className="font-editorial text-lg italic text-ink-light mt-1">
          AI-powered gift ideas for {giftee.name}
        </p>
        <div className="h-px bg-rule mt-6" />
      </div>

      {/* Placeholder Card */}
      <div className="border border-rule p-16 text-center">
        <div className="w-16 h-16 border border-rule flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-accent" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-ink mb-3">
          Recommendation Engine
        </h3>
        <p className="text-sm text-ink-light font-body max-w-md mx-auto leading-relaxed">
          The AI recommendation engine will search products, filter by{" "}
          {giftee.name}&apos;s preferences, and rank them using Claude AI. This
          feature requires the Skimlinks/Amazon API keys and Anthropic API key
          to be configured.
        </p>
      </div>
    </div>
  );
}
