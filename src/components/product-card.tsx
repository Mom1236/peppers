"use client";

import Link from "next/link";
import { type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { formatMoney } from "@/lib/money";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-soft backdrop-blur">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-axiom-light/15 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-axiom-deep/10 blur-2xl" />

      <div className="relative">
        <div className="text-xs font-semibold text-slate-500">{product.category}</div>
        <Link href={`/product/${product.slug}`} className="mt-1 block text-lg font-semibold text-axiom-deep hover:underline">
          {product.name}
        </Link>
        <div className="mt-2 text-xs text-slate-600">
          <span className="rounded-full bg-slate-100 px-2 py-1">{product.strength}</span>
          <span className="ml-2 rounded-full bg-slate-100 px-2 py-1">{product.vialSize}</span>
          <span className="ml-2 rounded-full bg-slate-100 px-2 py-1">Purity {product.purity}%</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-extrabold text-slate-900">{formatMoney(product.price)}</div>
          <button
            onClick={() => add(product, 1)}
            className="rounded-xl bg-axiom-deep px-3 py-2 text-xs font-semibold text-white shadow-soft hover:opacity-95"
          >
            Add to Cart
          </button>
        </div>

        <p className="mt-3 text-[11px] text-slate-600">
          For laboratory research use only.
        </p>
      </div>
    </div>
  );
}
