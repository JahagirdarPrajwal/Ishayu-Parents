"use client";

import { motion } from "framer-motion";
import { COPY } from "@/lib/voice";
import { Reveal } from "@/components/ui/Reveal";

const TILE_BG: Record<string, string> = {
  nutribites: "var(--color-bar-moringa-light)",
  coatz: "var(--color-bar-cocoa-light)",
  sprinkles: "var(--color-petal)",
};

export function ComingSoonStrip() {
  return (
    <section
      data-bg="bg"
      aria-labelledby="coming-soon-title"
      className="relative py-32"
    >
      <div className="shell flex flex-col gap-12">
        <header className="flex flex-col gap-4">
          <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
            {COPY.comingSoon.kicker}
          </Reveal>
          <Reveal as="h2" mode="lines" className="font-display text-4xl md:text-6xl tracking-[-0.04em] text-[var(--color-ink)] max-w-2xl">
            {COPY.comingSoon.headline}
          </Reveal>
        </header>

        <ul className="grid gap-6 md:grid-cols-3">
          {COPY.comingSoon.items.map((it) => (
            <motion.li
              key={it.id}
              whileHover={{ rotate: -1, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-[4/5] grid place-items-center text-center p-8"
              style={{ backgroundColor: TILE_BG[it.id] }}
            >
              <div className="flex flex-col items-center gap-4 text-[var(--color-ink)]">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em]">
                  {COPY.comingSoon.pill}
                </span>
                <h3 className="font-pack uppercase text-4xl tracking-[-0.02em]">
                  {it.name}
                </h3>
                <p className="font-display italic text-lg max-w-[18ch]">{it.note}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
