import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/60 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="text-sm font-extrabold tracking-wide text-axiom-deep">AXIOM BIOLOGY</div>
            <p className="mt-2 text-sm text-slate-600">
              Premium research peptides and laboratory supplies with batch-level documentation.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold text-axiom-deep">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link className="hover:text-slate-800" href="/contact">Contact</Link></li>
              <li><Link className="hover:text-slate-800" href="/research">Research</Link></li>
              <li><Link className="hover:text-slate-800" href="/lab-reports">Lab Reports</Link></li>
              <li><Link className="hover:text-slate-800" href="/certificates">Certificates</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-axiom-deep">Policies</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link className="hover:text-slate-800" href="/policies/shipping">Shipping Policy</Link></li>
              <li><Link className="hover:text-slate-800" href="/policies/refund">Refund Policy</Link></li>
              <li><Link className="hover:text-slate-800" href="/policies/terms">Terms of Service</Link></li>
              <li><Link className="hover:text-slate-800" href="/policies/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-axiom-deep">Compliance</div>
            <p className="mt-3 text-sm text-slate-600">
              All products sold by Axiom Biology are for laboratory research use only. Not for human or veterinary use.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-600">
          © {new Date().getFullYear()} Axiom Biology. Research use only.
        </div>
      </div>
    </footer>
  );
}
