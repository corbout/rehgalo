import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CalendarDays, Plus } from "lucide-react";
import { AddOccasionForm } from "@/components/forms/add-occasion";

export default async function CalendarPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: occasions } = await supabase
    .from("occasions")
    .select("*, giftees(name)")
    .eq("user_id", user.id)
    .order("date", { ascending: true });

  const { data: giftees } = await supabase
    .from("giftees")
    .select("id, name")
    .eq("user_id", user.id)
    .order("name");

  const now = new Date();
  const upcoming =
    occasions?.filter((o) => new Date(o.date) >= now) || [];
  const past =
    occasions?.filter((o) => new Date(o.date) < now) || [];

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div>
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body mb-2">
          Calendar
        </p>
        <h1 className="font-serif text-3xl font-bold text-ink">
          Occasions
        </h1>
        <p className="font-editorial text-lg italic text-ink-light mt-1">
          Track birthdays, anniversaries, and holidays
        </p>
        <div className="h-px bg-rule mt-6" />
      </div>

      {/* Add Occasion */}
      <div>
        <div className="section-header">
          <h2>Add Occasion</h2>
        </div>
        <div className="border border-rule p-6">
          <AddOccasionForm giftees={giftees || []} />
        </div>
      </div>

      {/* Upcoming */}
      <div>
        <div className="section-header">
          <h2>Upcoming ({upcoming.length})</h2>
        </div>
        {upcoming.length > 0 ? (
          <div>
            {upcoming.map((occasion) => {
              const daysLeft = Math.ceil(
                (new Date(occasion.date).getTime() - now.getTime()) /
                  (1000 * 60 * 60 * 24)
              );
              return (
                <div
                  key={occasion.id}
                  className="flex items-center justify-between py-3 border-b border-rule"
                >
                  <div>
                    <p className="text-sm font-semibold text-ink font-body">
                      {occasion.name}
                    </p>
                    <p className="text-xs text-ink-muted font-body mt-0.5">
                      {(occasion.giftees as { name: string } | null)?.name} &middot;{" "}
                      {new Date(occasion.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`badge-urgency ${
                      daysLeft <= 3
                        ? "badge-high"
                        : daysLeft <= 14
                          ? "badge-med"
                          : "badge-low"
                    }`}
                  >
                    {daysLeft === 0
                      ? "Today"
                      : daysLeft === 1
                        ? "Tomorrow"
                        : `${daysLeft} days`}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-ink-muted font-editorial italic py-4">
            No upcoming occasions
          </p>
        )}
      </div>

      {/* Past */}
      {past.length > 0 && (
        <div>
          <div className="section-header">
            <h2>Past ({past.length})</h2>
          </div>
          <div className="opacity-50">
            {past.slice(0, 10).map((occasion) => (
              <div
                key={occasion.id}
                className="flex items-center justify-between py-3 border-b border-rule"
              >
                <div>
                  <p className="text-sm font-semibold text-ink font-body">
                    {occasion.name}
                  </p>
                  <p className="text-xs text-ink-muted font-body mt-0.5">
                    {(occasion.giftees as { name: string } | null)?.name} &middot;{" "}
                    {new Date(occasion.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
