"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/product-grid";
import { allProducts, type Category } from "@/lib/products";

export function CategoryPage({ category, title }: { category: Category; title: string }) {
  const [q, setQ] = useState("");
  const products = useMemo(
    () => allProducts.filter((p) => p.category === category && (!q || p.name.toLowerCase().includes(q.toLowerCase()))),
    [category, q]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-axiom-deep">{title}</h1>
          <p className="mt-1 text-sm text-slate-600">Clinical, bright, research-first. COA per batch.</p>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${title.toLowerCase()}...`}
          className="w-full md:w-[320px] rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm shadow-soft outline-none backdrop-blur focus:border-axiom-light"
        />
      </div>

      <div className="mt-6">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
