export type Category = "Peptides" | "Nasal Sprays" | "Supplies";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  strength: string;
  vialSize: string;
  purity: number;
  price: number;
  batch: string;
  storage: string;
  description: string;
  coaPdfUrl: string;
};

export const categories: Category[] = ["Peptides", "Nasal Sprays", "Supplies"];

const pdf = "/sample-coa.pdf";

export const allProducts: Product[] = [
  // Peptides
  {
    slug: "tirzepatide-15mg",
    name: "Tirzepatide",
    category: "Peptides",
    strength: "15mg",
    vialSize: "10mL vial",
    purity: 99.1,
    price: 149.0,
    batch: "TZP-2409-A1",
    storage: "Store at -20°C (dry). Minimize freeze–thaw cycles.",
    description:
      "Reference-grade peptide for analytical method development, stability studies, and laboratory research applications.",
    coaPdfUrl: pdf,
  },
  {
    slug: "semaglutide-10mg",
    name: "Semaglutide",
    category: "Peptides",
    strength: "10mg",
    vialSize: "10mL vial",
    purity: 99.0,
    price: 129.0,
    batch: "SMG-2409-B2",
    storage: "Store at -20°C (dry). Protect from light.",
    description:
      "High-purity research compound for laboratory studies, including analytical characterization and formulation research.",
    coaPdfUrl: pdf,
  },
  {
    slug: "bpc-157-10mg",
    name: "BPC-157",
    category: "Peptides",
    strength: "10mg",
    vialSize: "5mL vial",
    purity: 98.7,
    price: 69.0,
    batch: "BPC-2410-C3",
    storage: "Store at -20°C (dry). Reconstituted solutions per SOP.",
    description:
      "Peptide reference material intended for laboratory research and assay development.",
    coaPdfUrl: pdf,
  },
  {
    slug: "tb-500-10mg",
    name: "TB-500",
    category: "Peptides",
    strength: "10mg",
    vialSize: "5mL vial",
    purity: 98.5,
    price: 79.0,
    batch: "TB5-2410-D4",
    storage: "Store at -20°C (dry).",
    description:
      "Research peptide for laboratory investigations and analytical workflows.",
    coaPdfUrl: pdf,
  },
  {
    slug: "cjc-1295-no-dac-5mg",
    name: "CJC-1295 (No-DAC)",
    category: "Peptides",
    strength: "5mg",
    vialSize: "3mL vial",
    purity: 98.9,
    price: 59.0,
    batch: "CJC-2411-E5",
    storage: "Store at -20°C (dry). Protect from moisture.",
    description:
      "High-purity peptide for research use in controlled laboratory settings.",
    coaPdfUrl: pdf,
  },
  {
    slug: "ipamorelin-5mg",
    name: "Ipamorelin",
    category: "Peptides",
    strength: "5mg",
    vialSize: "3mL vial",
    purity: 99.2,
    price: 55.0,
    batch: "IPA-2411-F6",
    storage: "Store at -20°C (dry).",
    description:
      "Reference peptide for laboratory research, method development, and analytical testing.",
    coaPdfUrl: pdf,
  },
  {
    slug: "ghk-cu-50mg",
    name: "GHK-Cu",
    category: "Peptides",
    strength: "50mg",
    vialSize: "10mL vial",
    purity: 98.2,
    price: 89.0,
    batch: "GHK-2412-G7",
    storage: "Store at 2–8°C (dry). Protect from light.",
    description:
      "Copper peptide reference material for research and analytical evaluation.",
    coaPdfUrl: pdf,
  },
  {
    slug: "igf-1-lr3-1mg",
    name: "IGF-1 LR3",
    category: "Peptides",
    strength: "1mg",
    vialSize: "3mL vial",
    purity: 98.8,
    price: 99.0,
    batch: "IGF-2412-H8",
    storage: "Store at -20°C (dry).",
    description:
      "Research-only reference material for laboratory investigations and analytical workflows.",
    coaPdfUrl: pdf,
  },

  // Nasal Sprays
  {
    slug: "semax-nasal-spray",
    name: "Semax",
    category: "Nasal Sprays",
    strength: "10mg",
    vialSize: "10mL spray",
    purity: 99.0,
    price: 49.0,
    batch: "NSX-2411-S1",
    storage: "Store at 2–8°C. Protect from light.",
    description:
      "Research nasal formulation placeholder. For laboratory research use only.",
    coaPdfUrl: pdf,
  },
  {
    slug: "selank-nasal-spray",
    name: "Selank",
    category: "Nasal Sprays",
    strength: "10mg",
    vialSize: "10mL spray",
    purity: 98.9,
    price: 49.0,
    batch: "SLK-2411-S2",
    storage: "Store at 2–8°C. Protect from light.",
    description:
      "Research nasal formulation placeholder. For laboratory research use only.",
    coaPdfUrl: pdf,
  },
  {
    slug: "nad-plus-nasal-spray",
    name: "NAD+",
    category: "Nasal Sprays",
    strength: "100mg",
    vialSize: "10mL spray",
    purity: 98.0,
    price: 59.0,
    batch: "NAD-2411-S3",
    storage: "Store at 2–8°C. Protect from light.",
    description:
      "Research nasal formulation placeholder. For laboratory research use only.",
    coaPdfUrl: pdf,
  },

  // Supplies
  {
    slug: "bac-water",
    name: "BAC Water",
    category: "Supplies",
    strength: "10mL",
    vialSize: "Multi-dose vial",
    purity: 99.9,
    price: 9.99,
    batch: "SUP-2408-W1",
    storage: "Store at room temperature. Keep sealed.",
    description:
      "Laboratory supply placeholder for research workflows.",
    coaPdfUrl: pdf,
  },
  {
    slug: "insulin-syringes",
    name: "Insulin Syringes",
    category: "Supplies",
    strength: "31G",
    vialSize: "Pack of 10",
    purity: 100,
    price: 12.99,
    batch: "SUP-2408-SY",
    storage: "Store in a clean, dry environment.",
    description:
      "Laboratory consumable placeholder. Follow local regulations and SOPs.",
    coaPdfUrl: pdf,
  },
  {
    slug: "alcohol-pads",
    name: "Alcohol Pads",
    category: "Supplies",
    strength: "70% IPA",
    vialSize: "Box of 100",
    purity: 100,
    price: 6.99,
    batch: "SUP-2408-AP",
    storage: "Store at room temperature.",
    description:
      "Laboratory consumable placeholder.",
    coaPdfUrl: pdf,
  },
  {
    slug: "sharps-container",
    name: "Sharps Container",
    category: "Supplies",
    strength: "1qt",
    vialSize: "Container",
    purity: 100,
    price: 8.99,
    batch: "SUP-2408-SC",
    storage: "Store at room temperature.",
    description:
      "For disposal of laboratory sharps per local requirements.",
    coaPdfUrl: pdf,
  },
];

export function getProductBySlug(slug: string) {
  return allProducts.find((p) => p.slug === slug) ?? null;
}

export function getFeaturedProducts() {
  return allProducts.slice(0, 8);
}
