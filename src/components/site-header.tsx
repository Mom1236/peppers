"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "@/lib/cart";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/peptides", label: "Peptides" },
  { href: "/nasal-sprays", label: "Nasal Sprays" },
  { href: "/supplies", label: "Supplies" },
  { href: "/certificates", label: "Certificates" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <header className="border-b border-slate-200 bg-white/60 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-axiom-light to-axiom-deep shadow-glow" />
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-wide text-axiom-deep">AXIOM BIOLOGY</div>
            <div className="text-[11px] font-semibold text-slate-600">Clinical Research Supply</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={
                  "text-sm font-semibold transition " +
                  (active ? "text-axiom-deep" : "text-slate-600 hover:text-slate-800")
                }
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/shop"
            className="hidden rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm font-semibold text-slate-700 shadow-soft hover:bg-white md:flex"
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Link>

          <Link href="/cart" className="relative rounded-xl border border-slate-200 bg-white/70 p-2 shadow-soft hover:bg-white">
            <ShoppingCart className="h-5 w-5 text-slate-700" />
            {count ? (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-axiom-deep px-1 text-[11px] font-bold text-white shadow-soft">
                {count}
              </span>
            ) : null}
          </Link>

          <Link href="/affiliate" className="hidden rounded-xl bg-axiom-deep px-3 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-95 md:inline-block">
            Affiliate
          </Link>
          <Link href="/admin" className="hidden rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm font-semibold text-slate-700 shadow-soft hover:bg-white md:inline-block">
            Admin
          </Link>
        </div>
      </div>

      <div className="lg:hidden border-t border-slate-200 bg-white/60">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-3">
          <div className="flex gap-3">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="whitespace-nowrap rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-soft">
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
