import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Search, Gift } from "lucide-react";

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Giftees</h1>
          <p className="text-gray-500 text-sm mt-1">
            People you buy gifts for
          </p>
        </div>
        <Link
          href="/giftees/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:from-rose-600 hover:to-amber-600 transition-all shadow-lg shadow-rose-500/20"
        >
          <Plus className="w-4 h-4" /> Add Giftee
        </Link>
      </div>

      {giftees && giftees.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {giftees.map((giftee) => (
            <Link
              key={giftee.id}
              href={`/giftees/${giftee.id}`}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:shadow-gray-100/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-semibold text-rose-600">
                    {giftee.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 truncate group-hover:text-rose-600 transition-colors">
                    {giftee.name}
                  </h3>
                  <p className="text-xs text-gray-500 capitalize">
                    {giftee.relationship || "Other"}
                    {giftee.age ? ` · ${giftee.age}y` : ""}
                  </p>
                  {giftee.interests && giftee.interests.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {giftee.interests.slice(0, 3).map((interest) => (
                        <span
                          key={interest}
                          className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                      {giftee.interests.length > 3 && (
                        <span className="text-[10px] text-gray-400">
                          +{giftee.interests.length - 3}
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
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-rose-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            No giftees yet
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Start by adding people you buy gifts for. We&apos;ll help you find
            the perfect gift every time.
          </p>
          <Link
            href="/giftees/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-rose-600 hover:to-amber-600 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Your First Giftee
          </Link>
        </div>
      )}
    </div>
  );
}
