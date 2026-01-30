export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-axiom-deep">Research Peptides Explained</h1>
      <p className="mt-3 text-slate-700">
        This educational content is provided for laboratory research audiences. All products on this website are sold
        strictly for laboratory research use only and are not intended for human or veterinary use.
      </p>

      <div className="mt-10 space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
          <h2 className="text-xl font-semibold text-axiom-deep">What are peptides?</h2>
          <p className="mt-2 text-sm text-slate-700">
            Peptides are short chains of amino acids. In research settings, they may be studied for structure, receptor
            binding, stability, analytical methods, and formulation properties.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
          <h2 className="text-xl font-semibold text-axiom-deep">How they are studied</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>Analytical characterization (HPLC, MS)</li>
            <li>Purity and identity confirmation</li>
            <li>Stability, storage, and reconstitution studies</li>
            <li>Method development and reference standards</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
          <h2 className="text-xl font-semibold text-axiom-deep">Lab safety</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>Use appropriate PPE: gloves, eyewear, lab coat.</li>
            <li>Follow institutional SOPs and chemical hygiene plans.</li>
            <li>Label materials clearly and store securely.</li>
            <li>Dispose of sharps and consumables in approved containers.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
          <h2 className="text-xl font-semibold text-axiom-deep">Storage guidelines</h2>
          <p className="mt-2 text-sm text-slate-700">
            Store materials according to the COA and product notes. Minimize freeze–thaw cycles when applicable. For
            study design, consult qualified professionals and your institutional guidelines.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-soft backdrop-blur">
          <h2 className="text-xl font-semibold text-axiom-deep">Legal & compliance disclaimer</h2>
          <p className="mt-2 text-sm text-slate-700">
            All products sold by Axiom Biology are for laboratory research use only. Not for human or veterinary use. By
            purchasing, you confirm you are a qualified laboratory or research entity and will handle all materials in
            compliance with applicable laws and institutional policies.
          </p>
        </section>
      </div>
    </div>
  );
}
