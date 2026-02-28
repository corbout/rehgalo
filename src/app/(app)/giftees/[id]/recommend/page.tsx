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
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href={`/giftees/${id}`}
          className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Recommendations for {giftee.name}
          </h1>
          <p className="text-gray-500 text-sm">
            AI-powered gift ideas based on their profile
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-rose-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Recommendation Engine
        </h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          The AI recommendation engine will search products, filter by{" "}
          {giftee.name}&apos;s preferences, and rank them using Claude AI. This
          feature requires the Skimlinks/Amazon API keys and Anthropic API key
          to be configured.
        </p>
      </div>
    </div>
  );
}
