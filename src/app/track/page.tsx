"use client";

import { useSearchParams } from "next/navigation";
import { getOrderByNumber, updateOrderTracking } from "@/lib/orders";
import { useMemo, useState } from "react";

export default function TrackPage() {
  const sp = useSearchParams();
  const orderNumber = sp.get("order") || "";
  const order = useMemo(() => (orderNumber ? getOrderByNumber(orderNumber) : null), [orderNumber]);

  const [tracking, setTracking] = useState(order?.trackingNumber ?? "");

  if (!orderNumber) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-axiom-deep">Order Tracking</h1>
        <p className="mt-2 text-sm text-slate-700">Enter an order number to view status.</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-axiom-deep">Order Tracking</h1>
        <p className="mt-2 text-sm text-slate-700">
          No order found for <span className="font-semibold">{orderNumber}</span> (demo uses local browser storage).
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-axiom-deep">Order Tracking</h1>
      <p className="mt-2 text-sm text-slate-700">
        Order <span className="font-semibold">{order.orderNumber}</span>
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
        <div className="grid gap-3 text-sm text-slate-700">
          <div className="flex justify-between">
            <span>Status</span>
            <span className="font-semibold">{order.status}</span>
          </div>
          <div className="flex justify-between">
            <span>Placed</span>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-semibold">${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500">Tracking number (admin can set this)</div>
          <div className="mt-2 flex gap-2">
            <input
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-axiom-light"
              placeholder="e.g., 1Z999AA10123456784"
            />
            <button
              onClick={() => updateOrderTracking(order.orderNumber, tracking)}
              className="rounded-xl bg-axiom-deep px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-95"
            >
              Save (demo)
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-600">This is a demo tracker stored in your browser.</p>
        </div>
      </div>
    </div>
  );
}
