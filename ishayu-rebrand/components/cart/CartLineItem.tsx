"use client";

import Image from "next/image";
import { useCart, type CartLine } from "@/lib/store/cart";
import { COPY } from "@/lib/voice";
import { formatINR } from "@/lib/products";
import { toast } from "sonner";

export function CartLineItem({ line }: { line: CartLine }) {
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);

  return (
    <li
      className="grid grid-cols-[80px_1fr_auto] gap-4 items-center py-4 border-b border-[var(--color-ink)]/10"
      style={{ borderLeft: `3px solid ${line.signatureDark}` }}
    >
      <div
        className="relative aspect-square w-20 shrink-0"
        style={{ backgroundColor: line.signatureLight }}
      >
        <Image
          src={line.imageFront}
          alt={line.name}
          fill
          sizes="80px"
          className="object-contain p-2"
        />
      </div>

      <div className="flex flex-col gap-1 min-w-0">
        <p className="font-display text-base text-[var(--color-ink)] truncate">
          {line.name}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)]/60">
          {formatINR(line.priceINR)} · 54 g
        </p>
        <div className="flex items-center gap-2 mt-1">
          <button
            type="button"
            aria-label={COPY.cart.qtyMinus}
            onClick={() => setQty(line.slug, Math.max(0, line.qty - 1))}
            className="grid place-items-center w-7 h-7 border border-[var(--color-ink)]/20 hover:border-[var(--color-ink)] transition"
            data-cursor="button"
          >
            −
          </button>
          <span className="font-mono text-sm w-6 text-center">{line.qty}</span>
          <button
            type="button"
            aria-label={COPY.cart.qtyPlus}
            onClick={() => setQty(line.slug, line.qty + 1)}
            className="grid place-items-center w-7 h-7 border border-[var(--color-ink)]/20 hover:border-[var(--color-ink)] transition"
            data-cursor="button"
          >
            +
          </button>
          <button
            type="button"
            aria-label={COPY.cart.remove}
            onClick={() => {
              remove(line.slug);
              toast(COPY.cart.removedToast(line.shortName));
            }}
            className="ml-auto font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55 hover:text-[var(--color-terracotta)] transition"
            data-cursor="button"
          >
            ✕ remove
          </button>
        </div>
      </div>

      <span className="font-display text-lg text-[var(--color-ink)] self-start">
        {formatINR(line.priceINR * line.qty)}
      </span>
    </li>
  );
}
