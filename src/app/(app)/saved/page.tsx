import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Bookmark, TrendingDown, Trash2 } from "lucide-react";

export default async function SavedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: savedProducts } = await supabase
    .from("saved_products")
    .select("*, giftees(name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Saved Products</h1>
        <p className="text-gray-500 text-sm mt-1">
          Track prices and get alerts on drops
        </p>
      </div>

      {savedProducts && savedProducts.length > 0 ? (
        <div className="space-y-3">
          {savedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4"
            >
              {product.product_image && (
                <img
                  src={product.product_image}
                  alt={product.product_name || ""}
                  className="w-16 h-16 object-cover rounded-xl bg-gray-50"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {product.product_name}
                </p>
                <p className="text-xs text-gray-500">
                  {product.retailer} &middot; For{" "}
                  {(product.giftees as { name: string } | null)?.name || "anyone"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-semibold text-gray-900">
                    ${product.current_price?.toFixed(2)}
                  </span>
                  {product.original_price &&
                    product.current_price &&
                    product.current_price < product.original_price && (
                      <span className="text-xs text-green-600 flex items-center gap-0.5">
                        <TrendingDown className="w-3 h-3" />
                        {(
                          ((product.original_price - product.current_price) /
                            product.original_price) *
                          100
                        ).toFixed(0)}
                        % off
                      </span>
                    )}
                </div>
              </div>
              {product.price_alert_enabled && (
                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-full">
                  Alerts on
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            No saved products
          </h3>
          <p className="text-sm text-gray-500">
            Save products from recommendations to track their prices.
          </p>
        </div>
      )}
    </div>
  );
}
