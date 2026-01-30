"use client";

import { useMemo, useState } from "react";
import { getAllOrders, setOrderStatus, setOrderTracking, getAllAffiliates, markCommissionPaid } from "@/lib/admin";
import { formatMoney } from "@/lib/money";

const DEMO_ADMIN_KEY = "AXIOM-ADMIN";

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);

  const orders = useMemo(() => (authed ? getAllOrders() : []), [authed]);
  const affiliates = useMemo(() => (authed ? getAllAffiliates() : []), [authed]);

  if (!authed) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-axiom-deep">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-slate-700">
          Demo auth. Enter the admin key to view orders & affiliate commissions.
        </p>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
          <label className="text-sm font-semibold text-axiom-deep">Admin Key</label>
          <div className="mt-2 flex gap-2">
            <input value={key} onChange={(e)=>setKey(e.target.value)} className="flex-1 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-axiom-light" placeholder="AXIOM-ADMIN" />
            <button
              onClick={() => setAuthed(key === DEMO_ADMIN_KEY)}
              className="rounded-xl bg-axiom-deep px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-95"
            >
              Enter
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-600">Replace with real auth (NextAuth, Clerk, Supabase, etc.).</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-axiom-deep">Admin Dashboard</h1>
      <p className="mt-2 text-sm text-slate-700">Manage orders, fulfillment, tracking, and affiliate payouts (demo).</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
          <h2 className="text-lg font-semibold text-axiom-deep">Orders</h2>
          <div className="mt-4 grid gap-3">
            {orders.length === 0 ? (
              <div className="text-sm text-slate-700">No orders found in this browser yet.</div>
            ) : orders.map((o) => (
              <div key={o.orderNumber} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-slate-500">Order</div>
                    <div className="text-base font-semibold text-axiom-deep">{o.orderNumber}</div>
                    <div className="mt-1 text-xs text-slate-600">
                      {new Date(o.createdAt).toLocaleString()} • {o.items.length} item(s)
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Total</div>
                    <div className="text-base font-semibold">{formatMoney(o.total)}</div>
                    <div className="mt-1 text-xs text-slate-600">Affiliate: {o.affiliateRef ?? "—"}</div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <select
                    value={o.status}
                    onChange={(e) => setOrderStatus(o.orderNumber, e.target.value as any)}
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm"
                  >
                    <option value="Placed">Placed</option>
                    <option value="Processing">Processing</option>
                    <option value="Fulfilled">Fulfilled</option>
                    <option value="Shipped">Shipped</option>
                  </select>
                  <input
                    defaultValue={o.trackingNumber ?? ""}
                    onBlur={(e) => setOrderTracking(o.orderNumber, e.target.value)}
                    className="flex-1 min-w-[180px] rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm"
                    placeholder="Tracking # (blur to save)"
                  />
                  <div className="ml-auto text-xs text-slate-600">
                    Commission: {o.affiliateCommission ? formatMoney(o.affiliateCommission) : "—"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
          <h2 className="text-lg font-semibold text-axiom-deep">Affiliates & Payouts</h2>
          <p className="mt-1 text-xs text-slate-600">Commissions are calculated per order in this demo.</p>

          <div className="mt-4 grid gap-3">
            {affiliates.length === 0 ? (
              <div className="text-sm text-slate-700">No affiliates yet. Create one in the affiliate dashboard.</div>
            ) : affiliates.map((a) => (
              <div key={a.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-slate-500">Affiliate</div>
                    <div className="text-base font-semibold text-axiom-deep">{a.name}</div>
                    <div className="mt-1 text-xs text-slate-600">Code: {a.refCode} • Rate: {a.commissionRate * 100}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Owed</div>
                    <div className="text-base font-semibold">{formatMoney(a.owed)}</div>
                    <button
                      onClick={() => markCommissionPaid(a.id)}
                      className="mt-2 rounded-lg bg-axiom-deep px-3 py-1.5 text-xs font-semibold text-white shadow-soft hover:opacity-95"
                    >
                      Mark Paid
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
