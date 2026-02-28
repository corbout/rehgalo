import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function GifteesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: giftees } = await supabase
    .from("giftees")
    .select("*, occasions(date, name)")
    .eq("user_id", user.id)
    .order("name");

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="pt-12 pb-8 border-b border-rule flex items-end justify-between">
        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent mb-3">
            Your People
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-ink">
            Giftees
          </h1>
        </div>
        <Link href="/giftees/new" className="btn-accent">
          Add Giftee &rarr;
        </Link>
      </div>

      {giftees && giftees.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {giftees.map((giftee) => (
            <Link
              key={giftee.id}
              href={`/giftees/${giftee.id}`}
              className="p-8 border border-rule -mr-px -mb-px transition-colors hover:bg-paper-warm group"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-ink flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors">
                  <span className="font-serif text-xl font-semibold text-paper">
                    {giftee.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-xl font-semibold text-ink truncate">
                    {giftee.name}
                  </h3>
                  <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-ink-light mt-0.5">
                    {giftee.relationship || "Other"}
                    {giftee.age ? ` · ${giftee.age} years` : ""}
                  </p>
                  {giftee.interests && giftee.interests.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {giftee.interests.slice(0, 3).map((interest) => (
                        <span key={interest} className="tag-editorial">
                          {interest}
                        </span>
                      ))}
                      {giftee.interests.length > 3 && (
                        <span className="font-editorial text-sm italic text-ink-muted">
                          +{giftee.interests.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-rule p-16 text-center mt-10">
          <p className="font-serif text-2xl text-ink mb-2">
            No giftees yet
          </p>
          <p className="font-editorial text-lg italic text-ink-light mb-8">
            Start by adding people you buy gifts for. We&apos;ll help you find
            the perfect gift every time.
          </p>
          <Link href="/giftees/new" className="btn-accent">
            Add Your First Giftee &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
