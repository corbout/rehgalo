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
    <div className="space-y-10">
      {/* Page Header */}
      <div>
        <Link
          href="/giftees"
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-light hover:text-accent transition-colors font-body mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Giftees
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              {giftee.name}
            </h1>
            <p className="font-editorial text-lg italic text-ink-light mt-1">
              {giftee.relationship || "Other"}
              {giftee.age ? ` -- ${giftee.age} years old` : ""}
            </p>
          </div>
          <Link
            href={`/giftees/${id}/recommend`}
            className="btn-accent"
          >
            <Sparkles className="w-4 h-4" /> Get Recommendations
          </Link>
        </div>
        <div className="h-px bg-rule mt-6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Sidebar -- Profile Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="border border-rule p-6 space-y-6">
            <div className="section-header !mb-0">
              <h2>Profile</h2>
            </div>

            {giftee.interests && giftee.interests.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body mb-2">
                  Interests
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {giftee.interests.map((interest: string) => (
                    <span key={interest} className="tag-editorial">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {giftee.styles && giftee.styles.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body mb-2">
                  Styles
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {giftee.styles.map((style: string) => (
                    <span key={style} className="tag-editorial">
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {giftee.dislikes && giftee.dislikes.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body mb-2">
                  Dislikes
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {giftee.dislikes.map((dislike: string) => (
                    <span key={dislike} className="tag-editorial">
                      {dislike}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(giftee.budget_min || giftee.budget_max) && (
              <div>
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body mb-1">
                  Budget
                </p>
                <p className="text-sm text-ink font-body">
                  ${giftee.budget_min || 0} - ${giftee.budget_max || "\u221E"}
                </p>
              </div>
            )}

            {giftee.notes && (
              <div>
                <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body mb-1">
                  Notes
                </p>
                <p className="text-sm text-ink-light font-body leading-relaxed">
                  {giftee.notes}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-rule">
              <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body mb-2">
                Share this profile
              </p>
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="input-editorial text-xs text-ink-light"
              />
              <p className="text-[10px] text-ink-muted mt-1.5 font-body">
                Send this link to {giftee.name} so they can fill in their own
                preferences
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Add Mention */}
          <div>
            <div className="section-header">
              <h2>They Mentioned&hellip;</h2>
            </div>
            <AddMentionForm gifteeId={id} />
            {mentions && mentions.length > 0 && (
              <div className="mt-6 space-y-0">
                {mentions.map((mention) => (
                  <div
                    key={mention.id}
                    className="py-5 border-t border-rule"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="pull-quote pl-6 flex-1">
                        {mention.content}
                      </div>
                      {mention.used && (
                        <span className="badge-urgency badge-low whitespace-nowrap">
                          Used
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-ink-muted mt-2 pl-6 font-body">
                      {new Date(mention.created_at!).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Occasions */}
          <div>
            <div className="section-header">
              <h2>Occasions</h2>
            </div>
            {occasions && occasions.length > 0 ? (
              <div>
                {occasions.map((occasion) => (
                  <div
                    key={occasion.id}
                    className="flex items-center justify-between py-3 border-b border-rule"
                  >
                    <div>
                      <p className="text-sm font-semibold text-ink font-body">
                        {occasion.name}
                      </p>
                      <p className="text-xs text-ink-muted font-body mt-0.5">
                        {new Date(occasion.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                        })}
                        {occasion.recurring && " -- Recurring"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-ink-muted font-editorial italic">
                No occasions added yet.
              </p>
            )}
          </div>

          {/* Gift History */}
          <div>
            <div className="section-header">
              <h2>Gift History</h2>
            </div>
            {giftHistory && giftHistory.length > 0 ? (
              <div>
                {giftHistory.map((gift) => (
                  <div
                    key={gift.id}
                    className="flex items-center gap-4 py-3 border-b border-rule"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-ink font-body">
                        {gift.product_name}
                      </p>
                      <p className="text-xs text-ink-muted font-body mt-0.5">
                        {gift.retailer} -- $
                        {gift.product_price?.toFixed(2)} --{" "}
                        {new Date(gift.purchased_at!).toLocaleDateString()}
                      </p>
                    </div>
                    {gift.feedback && (
                      <span
                        className={`badge-urgency ${
                          gift.feedback === "loved"
                            ? "badge-high"
                            : gift.feedback === "liked"
                              ? "badge-med"
                              : "badge-low"
                        }`}
                      >
                        {gift.feedback}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-ink-muted font-editorial italic">
                No gifts logged yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
