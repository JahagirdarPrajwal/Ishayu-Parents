"use client";

import { useState } from "react";
import { toast } from "sonner";
import { getBar, formatINR } from "@/lib/products";
import { COPY } from "@/lib/voice";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/store/cart";

export function AddToBagPanel({ slug }: { slug: string }) {
  const bar = getBar(slug);
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);

  if (!bar) return null;

  const onAdd = () => {
    add(bar, qty);
    toast(COPY.cart.addedToast(bar.shortName));
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate?.(8);
      } catch {}
    }
  };

  return (
    <aside
      className="md:sticky md:top-32 flex flex-col gap-5 p-6 bg-[var(--color-bg)] border border-[var(--color-ink)]/10"
      style={{ borderTop: `4px solid ${bar.signature.dark}` }}
    >
      <div className="flex items-baseline justify-between">
        <span className="font-display text-3xl">{formatINR(bar.priceINR)}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55">
          {bar.weightG} g
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55">
          Qty
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={COPY.cart.qtyMinus}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            data-cursor="button"
            className="grid place-items-center w-8 h-8 border border-[var(--color-ink)]/20 hover:border-[var(--color-ink)] transition"
          >
            −
          </button>
          <span className="font-mono text-base w-8 text-center">{qty}</span>
          <button
            type="button"
            aria-label={COPY.cart.qtyPlus}
            onClick={() => setQty((q) => q + 1)}
            data-cursor="button"
            className="grid place-items-center w-8 h-8 border border-[var(--color-ink)]/20 hover:border-[var(--color-ink)] transition"
          >
            +
          </button>
        </div>
      </div>

      <Button
        variant="bar"
        accent={bar.signature.dark}
        size="lg"
        onClick={onAdd}
        className="w-full"
      >
        {COPY.showcase.addToBag}
      </Button>

      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55">
        {COPY.cart.taxNote}
      </p>
    </aside>
  );
}
