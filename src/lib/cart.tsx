"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { getLS, setLS } from "@/lib/storage";

export type CartItem = Product & { qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (p: Product, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartCtx | null>(null);
const KEY = "axiom_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getLS<CartItem[]>(KEY, []));
  }, []);

  useEffect(() => {
    setLS(KEY, items);
  }, [items]);

  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);
  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);

  const api: CartCtx = {
    items,
    count,
    subtotal,
    add: (p, qty = 1) =>
      setItems((prev) => {
        const idx = prev.findIndex((x) => x.slug === p.slug);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + qty };
          return next;
        }
        return [...prev, { ...p, qty }];
      }),
    remove: (slug) => setItems((prev) => prev.filter((x) => x.slug !== slug)),
    setQty: (slug, qty) => setItems((prev) => prev.map((x) => (x.slug === slug ? { ...x, qty: Math.max(1, qty) } : x))),
    clear: () => setItems([]),
  };

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
