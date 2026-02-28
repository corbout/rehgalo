import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Users,
  CalendarDays,
  Plus,
  Gift,
  ArrowRight,
  Clock,
  MessageSquare,
} from "lucide-react";

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {profile?.name || "there"}
        </h1>
        <p className="text-gray-500 mt-1">
          Here&apos;s what&apos;s happening with your gift planning.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/giftees/new"
          className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:shadow-gray-100/50 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center group-hover:bg-rose-100 transition-colors">
              <Plus className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Add Giftee</p>
              <p className="text-xs text-gray-500">New person to shop for</p>
            </div>
          </div>
        </Link>
        <Link
          href="/calendar"
          className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:shadow-gray-100/50 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center group-hover:bg-amber-100 transition-colors">
              <CalendarDays className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Add Occasion</p>
              <p className="text-xs text-gray-500">Birthday, holiday, etc.</p>
            </div>
          </div>
        </Link>
        <Link
          href="/giftees"
          className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:shadow-gray-100/50 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-colors">
              <Gift className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Get Recommendations</p>
              <p className="text-xs text-gray-500">AI-powered gift ideas</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Occasions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Upcoming Occasions
            </h2>
            <Link
              href="/calendar"
              className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {upcomingOccasions && upcomingOccasions.length > 0 ? (
            <div className="space-y-3">
              {upcomingOccasions.map((occasion) => {
                const daysLeft = Math.ceil(
                  (new Date(occasion.date).getTime() - Date.now()) /
                    (1000 * 60 * 60 * 24)
                );
                return (
                  <div
                    key={occasion.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {occasion.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(occasion.giftees as { name: string } | null)?.name} &middot;{" "}
                        {new Date(occasion.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        daysLeft <= 3
                          ? "bg-red-50 text-red-600"
                          : daysLeft <= 7
                            ? "bg-amber-50 text-amber-600"
                            : "bg-gray-50 text-gray-600"
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
            <p className="text-sm text-gray-400 py-4 text-center">
              No upcoming occasions.{" "}
              <Link href="/calendar" className="text-rose-500 hover:underline">
                Add one
              </Link>
            </p>
          )}
        </div>

        {/* Recent Mentions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-500" />
              Recent Mentions
            </h2>
          </div>
          {recentMentions && recentMentions.length > 0 ? (
            <div className="space-y-3">
              {recentMentions.map((mention) => (
                <div key={mention.id} className="py-2">
                  <p className="text-sm text-gray-900">
                    &ldquo;{mention.content}&rdquo;
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(mention.giftees as { name: string } | null)?.name} &middot;{" "}
                    {new Date(mention.created_at!).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 py-4 text-center">
              No mentions yet. Capture when someone drops a gift hint!
            </p>
          )}
        </div>
      </div>

      {/* Giftees Overview */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-rose-500" />
            Your Giftees ({gifteeCount || 0})
          </h2>
          <Link
            href="/giftees"
            className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1"
          >
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {giftees && giftees.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {giftees.map((giftee) => (
              <Link
                key={giftee.id}
                href={`/giftees/${giftee.id}`}
                className="text-center p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg font-semibold text-rose-600">
                    {giftee.name.charAt(0)}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {giftee.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {giftee.relationship || "Other"}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-gray-400 mb-3">
              Start by adding people you buy gifts for.
            </p>
            <Link
              href="/giftees/new"
              className="inline-flex items-center gap-2 text-sm font-medium text-rose-600 hover:text-rose-700"
            >
              <Plus className="w-4 h-4" /> Add Your First Giftee
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
