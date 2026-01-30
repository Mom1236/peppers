import Link from "next/link";

export default function CertificatesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-axiom-deep">Certificates</h1>
      <p className="mt-3 text-sm text-slate-700">
        Certificates of Analysis are available on the Lab Reports page and on each product page.
      </p>
      <Link className="mt-6 inline-block rounded-xl bg-axiom-deep px-5 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-95" href="/lab-reports">
        View Lab Reports
      </Link>
    </div>
  );
}
