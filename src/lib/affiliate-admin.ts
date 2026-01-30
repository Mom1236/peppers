import { getLS, setLS } from "@/lib/storage";

export type Affiliate = {
  id: string;
  name: string;
  email: string | null;
  refCode: string;
  commissionRate: number; // 0.10 = 10%
  clicks: number;
  orders: number;
  owed: number;
  paidTotal: number;
};

export type AffiliateOrderRecord = {
  affiliateId: string;
  refCode: string;
  orderNumber: string;
  subtotal: number;
  commission: number;
  createdAt: number;
};

const AFF_KEY = "axiom_affiliates_v1";
const ORD_KEY = "axiom_affiliate_orders_v1";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function genCode(name: string) {
  const base = name.replace(/[^a-z0-9]/gi, "").slice(0, 6).toUpperCase() || "AXIOM";
  const n = Math.floor(Math.random() * 900 + 100);
  return `${base}${n}`;
}

export function createAffiliate(input: { name: string; email: string | null }) {
  const affiliates = getLS<Affiliate[]>(AFF_KEY, []);
  const a: Affiliate = {
    id: `aff_${uid()}`,
    name: input.name,
    email: input.email,
    refCode: genCode(input.name),
    commissionRate: 0.1,
    clicks: 0,
    orders: 0,
    owed: 0,
    paidTotal: 0,
  };
  affiliates.unshift(a);
  setLS(AFF_KEY, affiliates);
  return a;
}

export function getAffiliateByCode(code: string) {
  const affiliates = getLS<Affiliate[]>(AFF_KEY, []);
  return affiliates.find((a) => a.refCode === code.trim().toUpperCase()) ?? null;
}

export function getAffiliateById(id: string) {
  const affiliates = getLS<Affiliate[]>(AFF_KEY, []);
  return affiliates.find((a) => a.id === id) ?? null;
}

export function trackAffiliateClick(refCode: string) {
  const code = refCode.trim().toUpperCase();
  const affiliates = getLS<Affiliate[]>(AFF_KEY, []);
  let a = affiliates.find((x) => x.refCode === code) ?? null;

  // auto-create unknown codes for demo, so any ref works
  if (!a) {
    a = createAffiliate({ name: code, email: null });
    a.refCode = code; // preserve exact code
    const idx = affiliates.findIndex((x) => x.id === a!.id);
    const latest = getLS<Affiliate[]>(AFF_KEY, []);
    const idx2 = latest.findIndex((x) => x.id === a!.id);
    if (idx2 >= 0) {
      latest[idx2] = a!;
      setLS(AFF_KEY, latest);
    }
  }

  const latest = getLS<Affiliate[]>(AFF_KEY, []);
  const i = latest.findIndex((x) => x.id === a!.id);
  if (i >= 0) {
    latest[i] = { ...latest[i], clicks: latest[i].clicks + 1 };
    setLS(AFF_KEY, latest);
    return latest[i];
  }
  return a!;
}

export function calcCommissionForOrder(refCode: string, subtotal: number) {
  const a = getAffiliateByCode(refCode);
  const rate = a?.commissionRate ?? 0.1;
  return Math.round(subtotal * rate * 100) / 100;
}

export function recordAffiliateOrder(input: { affiliateId: string; refCode: string; orderNumber: string; subtotal: number; commission: number }) {
  const orders = getLS<AffiliateOrderRecord[]>(ORD_KEY, []);
  orders.unshift({ ...input, createdAt: Date.now() });
  setLS(ORD_KEY, orders);

  const affiliates = getLS<Affiliate[]>(AFF_KEY, []);
  const idx = affiliates.findIndex((a) => a.id === input.affiliateId);
  if (idx >= 0) {
    affiliates[idx] = {
      ...affiliates[idx],
      orders: affiliates[idx].orders + 1,
      owed: Math.round((affiliates[idx].owed + input.commission) * 100) / 100,
    };
    setLS(AFF_KEY, affiliates);
  }
}

export function getAffiliateStats(affiliateId: string) {
  const a = getAffiliateById(affiliateId);
  if (!a) return null;
  return { clicks: a.clicks, orders: a.orders, owed: a.owed, rate: a.commissionRate };
}

export function getAllAffiliates() {
  return getLS<Affiliate[]>(AFF_KEY, []);
}

export function markAffiliatePaid(affiliateId: string) {
  const affiliates = getLS<Affiliate[]>(AFF_KEY, []);
  const idx = affiliates.findIndex((a) => a.id === affiliateId);
  if (idx >= 0) {
    const owed = affiliates[idx].owed;
    affiliates[idx] = {
      ...affiliates[idx],
      paidTotal: Math.round((affiliates[idx].paidTotal + owed) * 100) / 100,
      owed: 0,
    };
    setLS(AFF_KEY, affiliates);
  }
}
