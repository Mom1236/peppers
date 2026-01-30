"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, subtotal, remove, setQty, clear } = useCart();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-axiom-deep">Cart</h1>
          <p className="mt-2 text-sm text-slate-700">Review items before checkout.</p>
        </div>
        {items.length ? (
          <button
            className="text-sm font-semibold text-slate-600 hover:text-slate-800"
            onClick={clear}
          >
            Clear cart
          </button>
        ) : null}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
          {items.length === 0 ? (
            <div className="text-sm text-slate-700">
              Your cart is empty. <Link className="font-semibold text-axiom-light" href="/shop">Shop products</Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {items.map((it) => (
                <div key={it.slug} className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-sm text-slate-500">{it.category}</div>
                    <div className="text-base font-semibold text-axiom-deep">{it.name}</div>
                    <div className="mt-1 text-xs text-slate-600">
                      {it.strength} • {it.vialSize} • Purity {it.purity}%
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-semibold">{formatMoney(it.price)}</div>
                    <input
                      className="w-16 rounded-lg border border-slate-200 px-2 py-1 text-sm outline-none focus:border-axiom-light"
                      type="number"
                      min={1}
                      value={it.qty}
                      onChange={(e) => setQty(it.slug, Number(e.target.value))}
                    />
                    <button
                      className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
                      onClick={() => remove(it.slug)}
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4 text-slate-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Subtotal</div>
            <div className="text-lg font-semibold">{formatMoney(subtotal)}</div>
          </div>
          <p className="mt-3 text-xs text-slate-600">
            Taxes/shipping calculated at checkout. Research use only.
          </p>
          <Link
            href="/checkout"
            className={"mt-6 block rounded-xl bg-axiom-deep px-5 py-3 text-center text-sm font-semibold text-white shadow-soft hover:opacity-95 " + (items.length ? "" : "pointer-events-none opacity-50")}
          >
            Checkout
          </Link>
          <Link className="mt-3 block text-center text-sm font-semibold text-axiom-light" href="/shop">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
