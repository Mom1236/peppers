import Link from "next/link";

export function DnaHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-dna-grid" />
      <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.85),rgba(255,255,255,0.65),rgba(255,255,255,0.92))]" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-axiom-light/30 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 shadow-soft backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-axiom-light animate-pulseGlow" />
            High-purity research materials • COA per batch
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-axiom-deep md:text-5xl">
            AXIOM Peptides
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-700 md:text-lg">
            High-Purity Research Peptides. Lab-Tested. Precision Formulated.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-2xl bg-axiom-deep px-6 py-3 text-sm font-semibold text-white shadow-glow hover:opacity-95"
            >
              SHOP PEPTIDES
            </Link>
            <Link
              href="/lab-reports"
              className="rounded-2xl border border-slate-200 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-800 shadow-soft backdrop-blur hover:bg-white"
            >
              VIEW CERTIFICATES
            </Link>
          </div>

          <p className="mt-6 text-xs text-slate-600">
            Research use only. Not for human or veterinary use.
          </p>
        </div>

        <div className="relative z-10">
          <div className="relative mx-auto aspect-square max-w-[420px]">
            <div className="absolute inset-0 rounded-[2rem] bg-white/50 backdrop-blur shadow-soft border border-slate-200" />
            <div className="absolute -inset-10 rounded-full bg-axiom-light/20 blur-3xl animate-pulseGlow" />
            <div className="absolute -inset-6 rounded-full bg-axiom-deep/15 blur-3xl" />
            <svg
              className="relative h-full w-full p-10 animate-floaty"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M120 50C200 120 200 280 280 350"
                stroke="rgba(49,160,211,0.9)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M280 50C200 120 200 280 120 350"
                stroke="rgba(19,69,134,0.85)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {Array.from({ length: 10 }).map((_, i) => {
                const y = 70 + i * 28;
                return (
                  <g key={i} opacity="0.9">
                    <line x1="150" y1={y} x2="250" y2={y + 10} stroke="rgba(15,23,42,0.18)" strokeWidth="6" strokeLinecap="round" />
                    <circle cx="150" cy={y} r="7" fill="rgba(49,160,211,0.9)" />
                    <circle cx="250" cy={y + 10} r="7" fill="rgba(19,69,134,0.85)" />
                  </g>
                );
              })}
            </svg>
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm shadow-soft backdrop-blur">
              <div className="font-semibold text-axiom-deep">Clinical-grade UI • Glassmorphism • Blue glow</div>
              <div className="mt-1 text-xs text-slate-600">Replace the SVG with a 3D DNA render whenever you want.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
