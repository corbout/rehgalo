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
    <div className="space-y-10">
      {/* Page Header */}
      <div>
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-muted font-body mb-2">
          Collection
        </p>
        <h1 className="font-serif text-3xl font-bold text-ink">
          Saved Products
        </h1>
        <p className="font-editorial text-lg italic text-ink-light mt-1">
          Track prices and get alerts on drops
        </p>
        <div className="h-px bg-rule mt-6" />
      </div>

      {savedProducts && savedProducts.length > 0 ? (
        <div>
          {savedProducts.map((product) => (
            <div
              key={product.id}
              className="editorial-card flex items-center gap-5 p-5 mb-[-1px]"
            >
              {product.product_image && (
                <img
                  src={product.product_image}
                  alt={product.product_name || ""}
                  className="w-16 h-16 object-cover border border-rule bg-paper-warm"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink font-body truncate">
                  {product.product_name}
                </p>
                <p className="text-xs text-ink-muted font-body mt-0.5">
                  {product.retailer} &middot; For{" "}
                  {(product.giftees as { name: string } | null)?.name || "anyone"}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-sm font-semibold text-ink font-body">
                    ${product.current_price?.toFixed(2)}
                  </span>
                  {product.original_price &&
                    product.current_price &&
                    product.current_price < product.original_price && (
                      <span className="text-xs text-accent flex items-center gap-0.5 font-body">
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
                <span className="badge-urgency badge-med">
                  Alerts on
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-rule p-16 text-center">
          <div className="w-16 h-16 border border-rule flex items-center justify-center mx-auto mb-6">
            <Bookmark className="w-8 h-8 text-ink-muted" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-ink mb-2">
            No saved products
          </h3>
          <p className="text-sm text-ink-light font-body">
            Save products from recommendations to track their prices.
          </p>
        </div>
      )}
    </div>
  );
}
