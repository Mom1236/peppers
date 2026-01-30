"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getLS, setLS } from "@/lib/storage";
import { trackAffiliateClick } from "@/lib/affiliate-admin";

export type AffiliateAttribution = {
  id: string;
  refCode: string;
};

type AffiliateCtx = {
  affiliate: AffiliateAttribution | null;
  setAffiliate: (a: AffiliateAttribution | null) => void;
};

const KEY = "axiom_affiliate_v1";
const Ctx = createContext<AffiliateCtx | null>(null);

export function AffiliateProvider({ children }: { children: React.ReactNode }) {
  const [affiliate, setAffiliateState] = useState<AffiliateAttribution | null>(null);

  useEffect(() => {
    setAffiliateState(getLS<AffiliateAttribution | null>(KEY, null));
  }, []);

  useEffect(() => {
    setLS(KEY, affiliate);
  }, [affiliate]);

  // Capture ?ref=CODE on first entry; store in local storage as "cookie"
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const ref = url.searchParams.get("ref");
    if (ref) {
      const code = ref.trim().toUpperCase();
      // Find or create affiliate record in demo store, then store attribution
      const aff = trackAffiliateClick(code);
      setAffiliateState({ id: aff.id, refCode: aff.refCode });

      // Clean URL
      url.searchParams.delete("ref");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const api = useMemo<AffiliateCtx>(() => ({
    affiliate,
    setAffiliate: setAffiliateState,
  }), [affiliate]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useAffiliate() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAffiliate must be used within AffiliateProvider");
  return ctx;
}
