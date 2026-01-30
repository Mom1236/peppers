import Link from "next/link";
import { DnaHero } from "@/components/dna-hero";
import { ProductGrid } from "@/components/product-grid";
import { getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts();
  return (
    <div>
      <DnaHero />
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="mt-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-axiom-deep">Featured Research Compounds</h2>
            <p className="mt-1 text-sm text-slate-600">
              Laboratory research use only. Certificates available per batch.
            </p>
          </div>
          <Link
            href="/shop"
            className="rounded-xl bg-axiom-deep px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-95"
          >
            Browse all
          </Link>
        </div>
        <div className="mt-6">
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white/60 p-6 backdrop-blur shadow-soft">
            <h3 className="font-semibold text-axiom-deep">Lab Reports</h3>
            <p className="mt-2 text-sm text-slate-600">
              Access batch-level Certificates of Analysis (COAs) with purity and identity data.
            </p>
            <Link className="mt-4 inline-block text-sm font-semibold text-axiom-light" href="/lab-reports">
              View lab reports →
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/60 p-6 backdrop-blur shadow-soft">
            <h3 className="font-semibold text-axiom-deep">Research Library</h3>
            <p className="mt-2 text-sm text-slate-600">
              What peptides are, how they’re studied, and how to handle materials safely.
            </p>
            <Link className="mt-4 inline-block text-sm font-semibold text-axiom-light" href="/research">
              Read research →
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/60 p-6 backdrop-blur shadow-soft">
            <h3 className="font-semibold text-axiom-deep">Same-Day Shipping</h3>
            <p className="mt-2 text-sm text-slate-600">
              Orders placed before 1PM ship same day (business days). Track every package end-to-end.
            </p>
            <Link className="mt-4 inline-block text-sm font-semibold text-axiom-light" href="/policies/shipping">
              Shipping policy →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
