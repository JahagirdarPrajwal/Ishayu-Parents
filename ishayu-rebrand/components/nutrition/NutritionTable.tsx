"use client";

import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import { BARS, formatNutrition, formatINR } from "@/lib/products";
import { COPY } from "@/lib/voice";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/store/cart";
import { toast } from "sonner";

const ROWS = [
  { key: "energyKcal", label: "Energy", unit: "kcal" },
  { key: "proteinG", label: "Protein", unit: "g" },
  { key: "carbsG", label: "Carbohydrates", unit: "g" },
  { key: "sugarsG", label: "Total sugars", unit: "g" },
  { key: "fatG", label: "Total fat", unit: "g" },
  { key: "saturatedFatG", label: "Saturated fat", unit: "g" },
  { key: "transFatG", label: "Trans fat", unit: "g" },
  { key: "sodiumMg", label: "Sodium", unit: "mg" },
] as const;

const USPS = [
  "No refined sugar",
  "Zero refined oil",
  "Gluten-free recipe",
  "No preservatives",
  "No artificial flavour",
  "Hand-pressed in Bengaluru",
  "FSSAI-licensed",
  "ISO 9001:2015 + HACCP",
];

export function NutritionTable() {
  const [active, setActive] = useState("ragi-millet");
  const bar = BARS.find((b) => b.slug === active)!;
  const add = useCart((s) => s.add);

  return (
    <section
      data-bg="bg-alt"
      aria-labelledby="nutrition-title"
      className="relative py-32"
    >
      <div className="shell flex flex-col gap-12">
        <header className="flex flex-col gap-4">
          <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
            {COPY.nutrition.kicker}
          </Reveal>
          <Reveal as="h2" mode="lines" className="font-display text-4xl md:text-6xl tracking-[-0.04em] text-[var(--color-ink)]">
            {COPY.nutrition.headline}
          </Reveal>
          <Reveal as="p" className="font-body text-sm md:text-base text-[var(--color-ink)]/70 max-w-2xl" delay={0.1}>
            {COPY.nutrition.note}
          </Reveal>
        </header>

        <Tabs.Root value={active} onValueChange={setActive}>
          <Tabs.List className="flex gap-2 overflow-x-auto pb-2 -mx-[var(--gutter-x)] px-[var(--gutter-x)]" aria-label="Choose a bar">
            {BARS.map((b) => (
              <Tabs.Trigger
                key={b.slug}
                value={b.slug}
                data-cursor="button"
                className="group relative flex items-center gap-3 px-4 py-2 border border-[var(--color-ink)]/15 data-[state=active]:bg-[var(--color-ink)] data-[state=active]:text-[var(--color-bg)] transition shrink-0"
              >
                <span
                  className="relative w-8 h-8 shrink-0 overflow-hidden"
                  style={{ backgroundColor: b.signature.light }}
                >
                  <Image src={b.images.flat} alt={b.alt.flat} fill sizes="32px" className="object-contain" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                  {b.shortName}
                </span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content value={active} className="grid gap-12 md:grid-cols-12 mt-10">
            <div className="md:col-span-7">
              {(() => {
                const publishedCount = ROWS.filter(
                  (r) => bar.nutritionPer100g[r.key] != null
                ).length;
                const isPartial =
                  publishedCount > 0 && publishedCount < ROWS.length;
                return (
                  <>
                    <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
                      {isPartial
                        ? `Spec sheet · ${publishedCount} of ${ROWS.length} values published`
                        : `Lab panel · all ${ROWS.length} values published`}
                    </p>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="text-left">
                          <th className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55 pb-3 pr-4">
                            Per 100 g
                          </th>
                          <th className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55 pb-3 text-right">
                            {bar.shortName}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ROWS.map((row) => {
                          const v = bar.nutritionPer100g[row.key];
                          const has = v != null;
                          return (
                            <tr
                              key={row.key}
                              className="border-t border-[var(--color-ink)]/10"
                            >
                              <td
                                className={
                                  "font-display text-lg py-3 pr-4 " +
                                  (has
                                    ? "text-[var(--color-ink)]"
                                    : "text-[var(--color-ink)]/45")
                                }
                              >
                                {row.label}
                              </td>
                              <td
                                className={
                                  "py-3 text-right " +
                                  (has
                                    ? "font-mono text-base text-[var(--color-ink)]"
                                    : "font-mono italic text-xs text-[var(--color-ink)]/40")
                                }
                              >
                                {has
                                  ? formatNutrition(v, row.unit)
                                  : "pending"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {isPartial ? (
                      <p className="mt-4 font-body text-sm italic text-[var(--color-ink)]/65 max-w-md">
                        Energy and protein come from the brand&rsquo;s May 2026
                        spec sheet. The remaining values publish with the next
                        lab panel — we don&rsquo;t guess.
                      </p>
                    ) : null}
                  </>
                );
              })()}
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55">
                FSSAI 11220302001071 · ISO 9001:2015 · HACCP certified
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col gap-6">
              <ul className="grid gap-3">
                {USPS.map((u, i) => (
                  <li
                    key={u}
                    className="flex items-center gap-3 font-body text-sm text-[var(--color-ink)]/85"
                  >
                    <span
                      aria-hidden
                      className="w-3.5 h-3.5 rounded-full"
                      style={{
                        backgroundColor: "var(--color-moss)",
                        animationDelay: `${i * 0.04}s`,
                      }}
                    />
                    {u}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6 border-t border-[var(--color-ink)]/15 flex items-center justify-between gap-4">
                <span className="font-display text-2xl">{formatINR(bar.priceINR)}</span>
                <Button
                  variant="bar"
                  accent={bar.signature.dark}
                  onClick={() => {
                    add(bar);
                    toast(COPY.cart.addedToast(bar.shortName));
                  }}
                >
                  {COPY.nutrition.cta}
                </Button>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </section>
  );
}
