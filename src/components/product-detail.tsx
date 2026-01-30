"use client";

import { type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import Link from "next/link";

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-soft backdrop-blur">
        <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-axiom-light/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-axiom-deep/10 blur-3xl" />

        <div className="relative">
          <div className="text-xs font-semibold text-slate-500">3D vial (placeholder)</div>
          <div className="mt-4 aspect-square rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-soft">
            <div className="mx-auto h-full max-w-[320px] rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-axiom-light to-axiom-deep shadow-glow" />
              <div className="mt-4 text-lg font-extrabold text-axiom-deep">AXIOM</div>
              <div className="text-sm font-semibold text-slate-800">{product.name}</div>
              <div className="mt-2 text-xs text-slate-600">{product.strength} • {product.vialSize}</div>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                Purity: <span className="font-semibold">{product.purity}%</span>
                <div className="mt-1">Batch: <span className="font-semibold">{product.batch}</span></div>
              </div>
              <div className="mt-4 text-[11px] text-slate-600">
                For laboratory research use only.
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <a
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold shadow-soft hover:bg-slate-50"
              href={product.coaPdfUrl}
              target="_blank"
            >
              View COA
            </a>
            <a
              className="rounded-xl bg-axiom-deep px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-95"
              href={product.coaPdfUrl}
              download
            >
              Download COA
            </a>
          </div>
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold text-slate-500">{product.category}</div>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-axiom-deep">{product.name}</h1>
        <p className="mt-3 text-sm text-slate-700">{product.description}</p>

        <div className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-soft backdrop-blur">
          <div className="flex justify-between text-sm text-slate-700">
            <span>Concentration</span><span className="font-semibold">{product.strength}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-700">
            <span>Vial Size</span><span className="font-semibold">{product.vialSize}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-700">
            <span>Purity</span><span className="font-semibold">{product.purity}%</span>
          </div>
          <div className="flex justify-between text-sm text-slate-700">
            <span>Batch</span><span className="font-semibold">{product.batch}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-700">
            <span>Storage</span><span className="font-semibold">{product.storage}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-3">
            <span className="text-sm text-slate-700">Price</span>
            <span className="text-lg font-extrabold text-slate-900">{formatMoney(product.price)}</span>
          </div>

          <button
            onClick={() => add(product, 1)}
            className="mt-2 w-full rounded-xl bg-axiom-deep px-5 py-3 text-sm font-semibold text-white shadow-soft hover:opacity-95"
          >
            Add to Cart
          </button>
          <p className="text-xs text-slate-600">
            Research use only. Not for human or veterinary use.
          </p>
        </div>

        <div className="mt-6 text-sm text-slate-700">
          <div className="font-semibold text-axiom-deep">Need certificates?</div>
          <Link href="/lab-reports" className="mt-1 inline-block font-semibold text-axiom-light">
            Browse Lab Reports →
          </Link>
        </div>
      </div>
    </div>
  );
}
