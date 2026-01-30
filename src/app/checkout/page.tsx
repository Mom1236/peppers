"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import { useAffiliate } from "@/lib/affiliate";
import { createOrder } from "@/lib/orders";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const { affiliate } = useAffiliate();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  const estShipping = useMemo(() => (subtotal > 200 ? 0 : items.length ? 14.95 : 0), [subtotal, items.length]);
  const estTax = useMemo(() => subtotal * 0.0825, [subtotal]);
  const total = subtotal + estShipping + estTax;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!items.length) return;
    setLoading(true);

    const order = createOrder({
      items,
      subtotal,
      shipping: estShipping,
      tax: estTax,
      total,
      affiliateRef: affiliate?.refCode ?? null,
      affiliateId: affiliate?.id ?? null,
      customerNote: note || null,
    });

    clear();
    router.push(`/track?order=${order.orderNumber}`);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-axiom-deep">Checkout</h1>
      <p className="mt-2 text-sm text-slate-700">
        Demo checkout (no payments wired). Affiliate attribution is captured automatically if present.
      </p>

      {affiliate ? (
        <div className="mt-6 rounded-2xl border border-axiom-light/30 bg-axiom-light/10 p-4 text-sm text-slate-800">
          Affiliate applied: <span className="font-semibold">{affiliate.refCode}</span> — commissions will be attributed on this order.
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-axiom-deep">First name</label>
              <input required className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-axiom-light" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-axiom-deep">Last name</label>
              <input required className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-axiom-light" />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-axiom-deep">Email</label>
              <input type="email" required className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-axiom-light" />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-axiom-deep">Shipping address</label>
              <input required className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-axiom-light" placeholder="Street address" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-axiom-deep">City</label>
              <input required className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-axiom-light" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-axiom-deep">State</label>
              <input required className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-axiom-light" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-axiom-deep">ZIP</label>
              <input required className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-axiom-light" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-axiom-deep">Phone</label>
              <input className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-axiom-light" />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-axiom-deep">Order note</label>
              <textarea value={note} onChange={(e)=>setNote(e.target.value)} className="min-h-[100px] rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-axiom-light" placeholder="Optional notes for the lab/warehouse..." />
            </div>
          </div>

          <button
            disabled={!items.length || loading}
            className="mt-6 w-full rounded-xl bg-axiom-deep px-5 py-3 text-sm font-semibold text-white shadow-soft hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Placing order..." : "Place order (demo)"}
          </button>

          <p className="mt-4 text-xs text-slate-600">
            By placing this order, you agree all materials are for laboratory research use only and not for human or veterinary use.
          </p>
        </form>

        <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
          <h2 className="text-base font-semibold text-axiom-deep">Order Summary</h2>
          <div className="mt-4 grid gap-2 text-sm">
            <div className="flex justify-between text-slate-700">
              <span>Subtotal</span><span>{formatMoney(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Shipping</span><span>{formatMoney(estShipping)}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Tax (est.)</span><span>{formatMoney(estTax)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-slate-200 pt-3 font-semibold">
              <span>Total</span><span>{formatMoney(total)}</span>
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-600">
            Demo only: integrate Stripe/Shopify/Authorize.net for live payments.
          </div>
        </div>
      </div>
    </div>
  );
}
