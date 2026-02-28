import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Gift,
  MessageSquare,
  CalendarDays,
  Sparkles,
  History,
  ExternalLink,
  Copy,
} from "lucide-react";
import { AddMentionForm } from "@/components/forms/add-mention";

export default async function GifteeDetailPage({
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

  const { data: mentions } = await supabase
    .from("mentions")
    .select("*")
    .eq("giftee_id", id)
    .order("created_at", { ascending: false })
    .limit(10);

  const { data: occasions } = await supabase
    .from("occasions")
    .select("*")
    .eq("giftee_id", id)
    .order("date", { ascending: true });

  const { data: giftHistory } = await supabase
    .from("gift_history")
    .select("*")
    .eq("giftee_id", id)
    .order("purchased_at", { ascending: false })
    .limit(5);

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/p/${giftee.shareable_slug}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/giftees"
          className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{giftee.name}</h1>
          <p className="text-gray-500 text-sm capitalize">
            {giftee.relationship || "Other"}
            {giftee.age ? ` · ${giftee.age} years old` : ""}
          </p>
        </div>
        <Link
          href={`/giftees/${id}/recommend`}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:from-rose-600 hover:to-amber-600 transition-all shadow-lg shadow-rose-500/20"
        >
          <Sparkles className="w-4 h-4" /> Get Recommendations
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h2 className="font-semibold text-gray-900">Profile</h2>

            {giftee.interests && giftee.interests.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1.5">
                  Interests
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {giftee.interests.map((interest) => (
                    <span
                      key={interest}
                      className="text-xs bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {giftee.styles && giftee.styles.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1.5">
                  Styles
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {giftee.styles.map((style) => (
                    <span
                      key={style}
                      className="text-xs bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {giftee.dislikes && giftee.dislikes.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1.5">
                  Dislikes
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {giftee.dislikes.map((dislike) => (
                    <span
                      key={dislike}
                      className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                    >
                      {dislike}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(giftee.budget_min || giftee.budget_max) && (
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Budget
                </p>
                <p className="text-sm text-gray-900">
                  ${giftee.budget_min || 0} - ${giftee.budget_max || "∞"}
                </p>
              </div>
            )}

            {giftee.notes && (
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Notes</p>
                <p className="text-sm text-gray-700">{giftee.notes}</p>
              </div>
            )}

            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500 mb-2">
                Share this profile
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 text-xs bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 text-gray-600"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                Send this link to {giftee.name} so they can fill in their own
                preferences
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Mention */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-purple-500" />
              They Mentioned...
            </h2>
            <AddMentionForm gifteeId={id} />
            {mentions && mentions.length > 0 && (
              <div className="mt-4 space-y-2">
                {mentions.map((mention) => (
                  <div
                    key={mention.id}
                    className="flex items-start gap-3 py-2 border-t border-gray-50"
                  >
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        &ldquo;{mention.content}&rdquo;
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(mention.created_at!).toLocaleDateString()}
                      </p>
                    </div>
                    {mention.used && (
                      <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                        Used
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Occasions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
              <CalendarDays className="w-4 h-4 text-amber-500" />
              Occasions
            </h2>
            {occasions && occasions.length > 0 ? (
              <div className="space-y-2">
                {occasions.map((occasion) => (
                  <div
                    key={occasion.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {occasion.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(occasion.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                        })}
                        {occasion.recurring && " · Recurring"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No occasions added yet.</p>
            )}
          </div>

          {/* Gift History */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
              <History className="w-4 h-4 text-green-500" />
              Gift History
            </h2>
            {giftHistory && giftHistory.length > 0 ? (
              <div className="space-y-3">
                {giftHistory.map((gift) => (
                  <div
                    key={gift.id}
                    className="flex items-center gap-3 py-2 border-t border-gray-50"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {gift.product_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {gift.retailer} · $
                        {gift.product_price?.toFixed(2)} ·{" "}
                        {new Date(gift.purchased_at!).toLocaleDateString()}
                      </p>
                    </div>
                    {gift.feedback && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          gift.feedback === "loved"
                            ? "bg-green-50 text-green-600"
                            : gift.feedback === "liked"
                              ? "bg-blue-50 text-blue-600"
                              : gift.feedback === "meh"
                                ? "bg-yellow-50 text-yellow-600"
                                : "bg-red-50 text-red-600"
                        }`}
                      >
                        {gift.feedback}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No gifts logged yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
