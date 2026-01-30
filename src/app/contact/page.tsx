"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-axiom-deep">Contact</h1>
      <p className="mt-2 text-sm text-slate-700">
        For laboratory inquiries, certificates, and order support.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
        {sent ? (
          <div className="rounded-xl border border-axiom-light/30 bg-axiom-light/10 p-4 text-sm text-slate-800">
            Message sent (demo). Replace this with your email/helpdesk integration.
          </div>
        ) : null}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-4 grid gap-4"
        >
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-axiom-deep">Name</label>
            <input className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-axiom-light" required />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-axiom-deep">Email</label>
            <input type="email" className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-axiom-light" required />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-axiom-deep">Message</label>
            <textarea className="min-h-[120px] rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm outline-none focus:border-axiom-light" required />
          </div>
          <button className="w-fit rounded-xl bg-axiom-deep px-5 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-95">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
