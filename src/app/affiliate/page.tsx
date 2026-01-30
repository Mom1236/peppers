"use client";

import { useMemo, useState } from "react";
import { createAffiliate, getAffiliateByCode, getAffiliateStats } from "@/lib/affiliate-admin";

export default function AffiliatePage() {
  const [mode, setMode] = useState<"login"|"create">("login");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [authedCode, setAuthedCode] = useState<string | null>(null);

  const affiliate = useMemo(() => (authedCode ? getAffiliateByCode(authedCode) : null), [authedCode]);
  const stats = useMemo(() => (affiliate ? getAffiliateStats(affiliate.id) : null), [affiliate]);

  const site = typeof window !== "undefined" ? window.location.origin : "";

  if (!affiliate) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-axiom-deep">Affiliate Dashboard</h1>
        <p className="mt-2 text-sm text-slate-700">Track clicks, orders, and commissions (demo stored in your browser).</p>

        <div className="mt-6 flex gap-2">
          <button onClick={()=>setMode("login")} className={"rounded-xl px-4 py-2 text-sm font-semibold " + (mode==="login" ? "bg-axiom-deep text-white" : "border border-slate-200 bg-white/60")}>Log in</button>
          <button onClick={()=>setMode("create")} className={"rounded-xl px-4 py-2 text-sm font-semibold " + (mode==="create" ? "bg-axiom-deep text-white" : "border border-slate-200 bg-white/60")}>Create affiliate</button>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
          {mode === "login" ? (
            <>
              <label className="text-sm font-semibold text-axiom-deep">Referral Code</label>
              <div className="mt-2 flex gap-2">
                <input value={code} onChange={(e)=>setCode(e.target.value)} className="flex-1 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-axiom-light" placeholder="e.g., PETER10" />
                <button
                  onClick={() => setAuthedCode(code.trim().toUpperCase())}
                  className="rounded-xl bg-axiom-deep px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-95"
                >
                  Enter
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-600">If you haven't created one yet, use the “Create affiliate” tab.</p>
            </>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-axiom-deep">Name</label>
                  <input value={name} onChange={(e)=>setName(e.target.value)} className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-axiom-light" placeholder="Affiliate name" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-axiom-deep">Email</label>
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-axiom-light" placeholder="email@domain.com" />
                </div>
              </div>
              <button
                onClick={() => {
                  const a = createAffiliate({ name: name || "Affiliate", email: email || null });
                  setAuthedCode(a.refCode);
                }}
                className="mt-4 rounded-xl bg-axiom-deep px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-95"
              >
                Create
              </button>
              <p className="mt-2 text-xs text-slate-600">Demo generates a unique referral code and stores it locally.</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-axiom-deep">Affiliate Dashboard</h1>
          <p className="mt-2 text-sm text-slate-700">
            Welcome, <span className="font-semibold">{affiliate.name}</span> — referral code:{" "}
            <span className="font-semibold">{affiliate.refCode}</span>
          </p>
        </div>
        <button onClick={()=>setAuthedCode(null)} className="w-fit rounded-xl border border-slate-200 bg-white/60 px-4 py-2 text-sm font-semibold shadow-soft hover:bg-white">
          Log out
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
          <div className="text-xs text-slate-500">Clicks</div>
          <div className="mt-1 text-2xl font-semibold text-axiom-deep">{stats?.clicks ?? 0}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
          <div className="text-xs text-slate-500">Orders</div>
          <div className="mt-1 text-2xl font-semibold text-axiom-deep">{stats?.orders ?? 0}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
          <div className="text-xs text-slate-500">Commission Owed</div>
          <div className="mt-1 text-2xl font-semibold text-axiom-deep">${(stats?.owed ?? 0).toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
        <h2 className="text-lg font-semibold text-axiom-deep">Referral Link</h2>
        <p className="mt-1 text-sm text-slate-700">Share this link. Referrals are tracked via cookie + checkout attribution.</p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm">
          {site}/?ref={affiliate.refCode}
        </div>
      </div>
    </div>
  );
}
