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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Occasions Calendar
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Track birthdays, anniversaries, and holidays
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Add Occasion</h2>
        <AddOccasionForm giftees={giftees || []} />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <CalendarDays className="w-4 h-4 text-amber-500" />
          Upcoming ({upcoming.length})
        </h2>
        {upcoming.length > 0 ? (
          <div className="space-y-3">
            {upcoming.map((occasion) => {
              const daysLeft = Math.ceil(
                (new Date(occasion.date).getTime() - now.getTime()) /
                  (1000 * 60 * 60 * 24)
              );
              return (
                <div
                  key={occasion.id}
                  className="flex items-center justify-between py-2 border-t border-gray-50 first:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {occasion.name}
                    </p>
                    <p className="text-xs text-gray-500">
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
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      daysLeft <= 3
                        ? "bg-red-50 text-red-600"
                        : daysLeft <= 7
                          ? "bg-amber-50 text-amber-600"
                          : daysLeft <= 14
                            ? "bg-yellow-50 text-yellow-600"
                            : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {daysLeft === 0
                      ? "Today!"
                      : daysLeft === 1
                        ? "Tomorrow"
                        : `${daysLeft} days`}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">
            No upcoming occasions
          </p>
        )}
      </div>

      {past.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-500 mb-4">
            Past ({past.length})
          </h2>
          <div className="space-y-2">
            {past.slice(0, 10).map((occasion) => (
              <div
                key={occasion.id}
                className="flex items-center justify-between py-2 border-t border-gray-50 first:border-0 opacity-60"
              >
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {occasion.name}
                  </p>
                  <p className="text-xs text-gray-400">
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
