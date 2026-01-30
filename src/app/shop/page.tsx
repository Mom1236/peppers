"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/product-grid";
import { allProducts, categories, type Category } from "@/lib/products";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ShopPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");
  const [purityMin, setPurityMin] = useState(98);

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.category.toLowerCase().includes(q.toLowerCase());
      const matchCat = cat === "all" ? true : p.category === cat;
      const matchPurity = (p.purity ?? 0) >= purityMin;
      return matchQ && matchCat && matchPurity;
    });
  }, [q, cat, purityMin]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-axiom-deep">Shop</h1>
          <p className="mt-1 text-sm text-slate-600">
            Research peptides, nasal sprays, and laboratory supplies. Research use only.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-slate-200 bg-white/70 py-2 pl-9 pr-3 text-sm shadow-soft outline-none backdrop-blur focus:border-axiom-light"
            />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 shadow-soft backdrop-blur">
            <SlidersHorizontal className="h-4 w-4 text-slate-500" />
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value as any)}
              className="bg-transparent text-sm outline-none"
            >
              <option value="all">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <div className="mx-2 h-4 w-px bg-slate-200" />
            <label className="text-xs text-slate-600">Purity ≥</label>
            <input
              type="number"
              value={purityMin}
              onChange={(e) => setPurityMin(Number(e.target.value))}
              className="w-16 rounded-lg border border-slate-200 bg-white/60 px-2 py-1 text-xs outline-none focus:border-axiom-light"
              min={0}
              max={100}
            />
            <span className="text-xs text-slate-600">%</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
