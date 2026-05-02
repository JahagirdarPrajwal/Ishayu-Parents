"use client";

import { motion } from "framer-motion";
import { COPY } from "@/lib/voice";
import { Reveal } from "@/components/ui/Reveal";

const PATHS: Record<string, string> = {
  peanut:
    "M16 6c4 0 6 4 6 8 4 2 6 5 6 8 0 5-4 9-9 9s-9-4-9-9c0-3 2-6 6-8 0-4 2-8 0-8z",
  almond:
    "M16 4c4 4 8 8 8 14s-4 10-8 10-8-4-8-10 4-10 8-14z",
  cashew:
    "M10 10c-4 4-4 12 0 16 4 4 12 4 14-2-4 0-8-2-8-6s4-6 8-6c-2-6-10-6-14-2z",
  moringa:
    "M4 24c0-8 8-16 16-16-2 8-8 16-16 16zm10 4c8-2 14-8 16-16",
  ragi:
    "M16 4l4 6-4 4-4-4 4-6zm-6 12l4 6-4 4-4-4 4-6zm12 0l4 6-4 4-4-4 4-6zm-6 12l4 6-4 4-4-4 4-6z",
  cocoa:
    "M16 4c8 0 12 6 12 14s-4 14-12 14C8 32 4 26 4 18S8 4 16 4zm0 4v20",
  beet:
    "M16 4c-2 4-4 6-4 8s2 4 4 4 4-2 4-4-2-4-4-8zm0 14c-6 0-10 4-10 8 0 4 4 6 10 6s10-2 10-6c0-4-4-8-10-8z",
  jaggery:
    "M8 22h16l-4-12h-8l-4 12zm0 0v6h16v-6M12 14h8M14 18h4",
  honey:
    "M16 4c-3 6-7 10-7 14a7 7 0 1014 0c0-4-4-8-7-14zM12 18c1 2 3 3 4 3",
  fenugreek:
    "M10 12a3 3 0 116 0 3 3 0 11-6 0zm6 6a3 3 0 116 0 3 3 0 11-6 0zm-4 6a3 3 0 116 0 3 3 0 11-6 0z",
  flax:
    "M8 12c4-4 12-4 16 0M8 20c4-4 12-4 16 0M8 28c4-4 12-4 16 0",
};

export function IngredientsSection() {
  return (
    <section
      data-bg="bg"
      aria-labelledby="ingredients-title"
      className="relative py-32 overflow-hidden"
    >
      <div className="shell flex flex-col gap-12">
        <header className="flex flex-col gap-4">
          <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
            {COPY.ingredients.kicker}
          </Reveal>
          <Reveal as="h2" mode="lines" className="font-display text-4xl md:text-7xl tracking-[-0.04em] text-[var(--color-ink)] max-w-3xl">
            {COPY.ingredients.headline}
          </Reveal>
        </header>

        <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-6">
          {COPY.ingredients.items.map((it, i) => (
            <motion.li
              key={it.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative aspect-square grid place-items-center bg-[var(--color-bg-alt)] hover:bg-[var(--color-moss)] transition-colors duration-500 cursor-pointer"
              data-cursor="link"
            >
              <svg
                viewBox="0 0 32 32"
                className="w-12 h-12 text-[var(--color-moss)] group-hover:text-[var(--color-bg)] transition sway"
                aria-hidden
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={PATHS[it.id] ?? PATHS.flax} />
              </svg>
              <div className="absolute inset-x-2 bottom-3 text-center opacity-0 group-hover:opacity-100 transition">
                <p className="font-pack uppercase text-sm text-[var(--color-bg)]">
                  {it.name}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-bg)]/80 mt-1">
                  {it.note}
                </p>
              </div>
              <p className="absolute bottom-3 inset-x-2 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)]/65 group-hover:opacity-0 transition">
                {it.name}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
