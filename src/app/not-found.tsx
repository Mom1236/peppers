import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold text-axiom-deep">Page not found</h1>
      <p className="mt-3 text-sm text-slate-700">Return to the storefront.</p>
      <Link className="mt-6 inline-block rounded-xl bg-axiom-deep px-5 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-95" href="/">
        Home
      </Link>
    </div>
  );
}
