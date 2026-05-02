"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Bar } from "@/lib/products";
import { formatINR } from "@/lib/products";
import { COPY } from "@/lib/voice";
import { Button } from "@/components/ui/Button";
import { PackBadge } from "@/components/brand/PackBadge";
import { LevitatingPack } from "@/components/products/LevitatingPack";
import { useCart } from "@/lib/store/cart";
import { toast } from "sonner";
import { EASE } from "@/lib/motion";

type Props = { bar: Bar; eager?: boolean };

export function ProductCard({ bar, eager }: Props) {
  const add = useCart((s) => s.add);

  const onAdd = () => {
    add(bar);
    toast(COPY.cart.addedToast(bar.shortName));
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate?.(8);
      } catch {}
    }
  };

  return (
    <article
      className="relative isolate flex flex-col gap-6 p-6 md:p-10 overflow-hidden border border-[var(--color-ink)]/10"
      style={{ backgroundColor: bar.signature.light }}
    >
      <span
        aria-hidden
        className="absolute right-4 top-4 font-mono text-[11px] uppercase tracking-[0.22em]"
        style={{ color: bar.signature.dark }}
      >
        {bar.ribbon}
      </span>

      <Link
        href={`/bars/${bar.slug}`}
        data-cursor="image"
        className="relative aspect-[4/3] focus-visible:outline-2 focus-visible:outline-[var(--color-moss)] focus-visible:outline-offset-4"
      >
        <motion.div
          initial={{ scale: 1.02, rotate: 2 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: EASE.outExpo }}
          whileHover={{ rotate: -1 }}
          className="absolute inset-0"
        >
          <LevitatingPack
            src={bar.images.front}
            alt={bar.alt.front}
            sizes="(min-width:1024px) 24vw, (min-width:640px) 45vw, 90vw"
            priority={eager}
            shadowStrength={0.28}
          />
        </motion.div>
      </Link>

      <div className="flex flex-col gap-3">
        <h3
          className="font-pack uppercase text-3xl md:text-4xl leading-[0.92] tracking-[-0.02em]"
          style={{ color: bar.signature.dark }}
        >
          {bar.name}
        </h3>
        <p
          className="font-display italic text-base md:text-lg"
          style={{ color: bar.signature.dark }}
        >
          {bar.tagline}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-4">
        <span
          className="font-display text-2xl"
          style={{ color: bar.signature.dark }}
        >
          {formatINR(bar.priceINR)}
        </span>
        <Button
          variant="bar"
          size="md"
          accent={bar.signature.dark}
          onClick={onAdd}
        >
          {COPY.showcase.addToBag}
        </Button>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t" style={{ borderColor: bar.signature.dark + "30" }}>
        <PackBadge id="no-refined-sugar" size={36} />
        <PackBadge id="no-artificial-flavours" size={36} />
        <PackBadge id="no-preservatives" size={36} />
      </div>
    </article>
  );
}
