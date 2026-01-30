"use client";

import { labReports } from "@/lib/lab-reports";
import Link from "next/link";

export default function LabReportsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-axiom-deep">Lab Reports</h1>
          <p className="mt-1 text-sm text-slate-600">
            Batch-level Certificates of Analysis (placeholder PDFs for demo).
          </p>
        </div>
        <Link href="/certificates" className="text-sm font-semibold text-axiom-light">
          View Certificates page →
        </Link>
      </div>

      <div className="mt-6 grid gap-4">
        {labReports.map((r) => (
          <div key={r.id} className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-soft backdrop-blur">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm text-slate-500">Product</div>
                <div className="text-lg font-semibold text-axiom-deep">{r.productName}</div>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="rounded-full bg-slate-100 px-2 py-1">Batch: {r.batch}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-1">Purity: {r.purity}%</span>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold shadow-soft hover:bg-slate-50"
                  href={r.pdfUrl}
                  target="_blank"
                >
                  View PDF
                </a>
                <a
                  className="rounded-xl bg-axiom-deep px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-95"
                  href={r.pdfUrl}
                  download
                >
                  Download
                </a>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <iframe title={r.productName} src={r.pdfUrl} className="h-[520px] w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
