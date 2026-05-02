"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Bar } from "@/lib/products";

export type CartLine = {
  slug: Bar["slug"];
  name: string;
  shortName: string;
  priceINR: number;
  qty: number;
  imageFront: string;
  signatureLight: string;
  signatureDark: string;
};

type CartState = {
  open: boolean;
  lines: CartLine[];
  setOpen: (v: boolean) => void;
  add: (bar: Bar, qty?: number) => void;
  remove: (slug: Bar["slug"]) => void;
  setQty: (slug: Bar["slug"], qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      open: false,
      lines: [],

      setOpen: (open) => set({ open }),

      add: (bar, qty = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.slug === bar.slug);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.slug === bar.slug ? { ...l, qty: l.qty + qty } : l
              ),
            };
          }
          return {
            lines: [
              ...state.lines,
              {
                slug: bar.slug,
                name: bar.name,
                shortName: bar.shortName,
                priceINR: bar.priceINR,
                qty,
                imageFront: bar.images.front,
                signatureLight: bar.signature.light,
                signatureDark: bar.signature.dark,
              },
            ],
          };
        }),

      remove: (slug) =>
        set((state) => ({
          lines: state.lines.filter((l) => l.slug !== slug),
        })),

      setQty: (slug, qty) =>
        set((state) => ({
          lines: state.lines
            .map((l) => (l.slug === slug ? { ...l, qty } : l))
            .filter((l) => l.qty > 0),
        })),

      clear: () => set({ lines: [] }),

      count: () => get().lines.reduce((n, l) => n + l.qty, 0),
      subtotal: () =>
        get().lines.reduce((sum, l) => sum + l.priceINR * l.qty, 0),
    }),
    {
      name: "ishayu-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ lines: s.lines }),
    }
  )
);
