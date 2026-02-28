import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: giftees, count: gifteeCount } = await supabase
    .from("giftees")
    .select("*", { count: "exact" })
    .eq("user_id", user.id)
    .limit(5);

  const { data: upcomingOccasions } = await supabase
    .from("occasions")
    .select("*, giftees(name)")
    .eq("user_id", user.id)
    .gte("date", new Date().toISOString().split("T")[0])
    .order("date", { ascending: true })
    .limit(5);

  const { data: recentMentions } = await supabase
    .from("mentions")
    .select("*, giftees(name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3);

  const currentMonth = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      {/* ── Masthead ── */}
      <section className="pt-12 pb-10 text-center border-b border-rule">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent mb-5">
          {currentMonth} Edition
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-normal tracking-tight text-ink leading-[0.95] mb-4">
          Your <em>Gift</em> Guide
        </h1>
        <p className="font-editorial text-xl text-ink-light italic">
          Curated picks for the people you love
          {profile?.name ? `, ${profile.name}` : ""}
        </p>
        <div className="w-12 h-px bg-accent mx-auto mt-6" />
      </section>

      {/* ── Upcoming Occasions ── */}
      <div className="section-header mt-12">
        <h2>Upcoming Occasions</h2>
      </div>

      {upcomingOccasions && upcomingOccasions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 border border-rule">
          {upcomingOccasions.slice(0, 3).map((occasion, i) => {
            const daysLeft = Math.ceil(
              (new Date(occasion.date).getTime() - Date.now()) /
                (1000 * 60 * 60 * 24)
            );
            const urgency =
              daysLeft <= 3 ? "high" : daysLeft <= 14 ? "med" : "low";
            const urgencyLabel =
              daysLeft <= 3 ? "Soon" : daysLeft <= 14 ? "Coming Up" : "Ahead";
            return (
              <div
                key={occasion.id}
                className={`p-8 relative transition-colors hover:bg-paper-warm ${
                  i < upcomingOccasions.slice(0, 3).length - 1
                    ? "md:border-r border-b md:border-b-0 border-rule"
                    : ""
                }`}
              >
                <span
                  className={`badge-urgency absolute top-5 right-5 badge-${urgency}`}
                >
                  {urgencyLabel}
                </span>
                <p className="font-serif text-5xl font-bold text-accent leading-none mb-1">
                  {daysLeft}
                </p>
                <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink-light mb-5">
                  Days Away
                </p>
                <p className="font-serif text-xl font-semibold text-ink mb-1">
                  {occasion.name}
                </p>
                <p className="font-editorial text-base italic text-ink-light">
                  For{" "}
                  {(occasion.giftees as { name: string } | null)?.name ||
                    "someone special"}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border border-rule p-12 text-center">
          <p className="font-editorial text-lg italic text-ink-light mb-4">
            No upcoming occasions on the calendar
          </p>
          <Link href="/calendar" className="btn-editorial">
            Add an Occasion &rarr;
          </Link>
        </div>
      )}

      {/* ── Your Giftees ── */}
      <div className="section-header mt-14">
        <h2>Your Giftees</h2>
      </div>

      {giftees && giftees.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {giftees.map((giftee) => (
            <Link
              key={giftee.id}
              href={`/giftees/${giftee.id}`}
              className="text-center p-8 border border-rule -mr-px -mb-px transition-colors hover:bg-paper-warm group"
            >
              <div className="w-[72px] h-[72px] rounded-full bg-ink flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors">
                <span className="font-serif text-2xl font-semibold text-paper">
                  {giftee.name.charAt(0)}
                </span>
              </div>
              <p className="font-serif text-lg font-semibold text-ink mb-1">
                {giftee.name}
              </p>
              <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-ink-light mb-3">
                {giftee.relationship || "Other"}
              </p>
              {giftee.interests && giftee.interests.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1">
                  {giftee.interests.slice(0, 3).map((interest) => (
                    <span key={interest} className="tag-editorial">
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-rule p-12 text-center">
          <p className="font-editorial text-lg italic text-ink-light mb-4">
            Start by adding the people you buy gifts for
          </p>
          <Link href="/giftees/new" className="btn-accent">
            Add Your First Giftee &rarr;
          </Link>
        </div>
      )}

      {/* ── They Mentioned ── */}
      <div className="section-header mt-14">
        <h2>They Mentioned&hellip;</h2>
      </div>

      {recentMentions && recentMentions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3">
          {recentMentions.map((mention, i) => (
            <div
              key={mention.id}
              className={`p-8 ${
                i < recentMentions.length - 1
                  ? "md:border-r border-b md:border-b-0 border-rule"
                  : ""
              }`}
            >
              <div className="pull-quote mb-5 pl-2">
                {mention.content}
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-xs font-medium tracking-[0.08em] uppercase text-ink-light">
                  About{" "}
                  {(mention.giftees as { name: string } | null)?.name ||
                    "someone"}
                </span>
              </div>
              <p className="text-[11px] text-rule mt-1 pl-4">
                {new Date(mention.created_at!).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-rule p-12 text-center">
          <p className="font-editorial text-lg italic text-ink-light">
            No mentions yet &mdash; capture when someone drops a gift hint
          </p>
        </div>
      )}

      {/* ── Quick Actions ── */}
      <div className="section-header mt-14">
        <h2>Quick Actions</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 border border-rule">
        <Link
          href="/giftees/new"
          className="p-8 sm:border-r border-b sm:border-b-0 border-rule transition-colors hover:bg-paper-warm"
        >
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-2">
            Add New
          </p>
          <p className="font-serif text-xl font-semibold text-ink mb-1">
            Add a Giftee
          </p>
          <p className="font-editorial text-sm italic text-ink-light">
            Create a profile for someone you shop for
          </p>
        </Link>
        <Link
          href="/calendar"
          className="p-8 sm:border-r border-b sm:border-b-0 border-rule transition-colors hover:bg-paper-warm"
        >
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-2">
            Schedule
          </p>
          <p className="font-serif text-xl font-semibold text-ink mb-1">
            Add an Occasion
          </p>
          <p className="font-editorial text-sm italic text-ink-light">
            Birthdays, anniversaries, holidays
          </p>
        </Link>
        <Link
          href="/giftees"
          className="p-8 transition-colors hover:bg-paper-warm"
        >
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-2">
            Discover
          </p>
          <p className="font-serif text-xl font-semibold text-ink mb-1">
            Get Recommendations
          </p>
          <p className="font-editorial text-sm italic text-ink-light">
            AI-curated gift ideas for any occasion
          </p>
        </Link>
      </div>

      {/* ── Footer ── */}
      <footer className="mt-16 border-t border-rule py-8 text-center">
        <p className="font-serif text-base font-bold text-ink mb-1">
          Rehgalo
        </p>
        <p className="text-[11px] tracking-[0.12em] uppercase text-ink-light">
          &copy; 2026 &middot; The Art of Thoughtful Gifting
        </p>
      </footer>
    </div>
  );
}
