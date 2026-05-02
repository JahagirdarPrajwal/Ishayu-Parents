import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as Tabs from "@radix-ui/react-tabs";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Reveal } from "@/components/ui/Reveal";
import { PackBadge } from "@/components/brand/PackBadge";
import { LevitatingPack } from "@/components/products/LevitatingPack";
import { AddToBagPanel } from "./AddToBagPanel";

import { BARS, getBar, relatedBars, formatINR, formatNutrition, SHARED } from "@/lib/products";
import { productSchema } from "@/lib/schema";

export async function generateStaticParams() {
  return BARS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bar = getBar(slug);
  if (!bar) return {};
  return {
    title: bar.name,
    description: bar.tagline,
    openGraph: {
      title: bar.name,
      description: bar.tagline,
      images: [bar.images.flat],
    },
  };
}

const NUTRITION_ROWS = [
  { key: "energyKcal", label: "Energy", unit: "kcal" },
  { key: "proteinG", label: "Protein", unit: "g" },
  { key: "carbsG", label: "Carbohydrates", unit: "g" },
  { key: "sugarsG", label: "Total sugars", unit: "g" },
  { key: "fatG", label: "Total fat", unit: "g" },
  { key: "saturatedFatG", label: "Saturated fat", unit: "g" },
  { key: "transFatG", label: "Trans fat", unit: "g" },
  { key: "sodiumMg", label: "Sodium", unit: "mg" },
] as const;

export default async function BarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bar = getBar(slug);
  if (!bar) notFound();

  const related = relatedBars(slug);
  const relevantTestimonials = SHARED.testimonials.filter((t) =>
    t.quote.toLowerCase().includes(bar.shortName.split(" ")[0].toLowerCase())
  );
  const reviews = relevantTestimonials.length ? relevantTestimonials : [SHARED.testimonials[0]];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema(bar)) }}
      />
      <Nav />
      <main>
        {/* Hero */}
        <section
          aria-labelledby="bar-title"
          className="relative pt-28 sm:pt-32 pb-20 overflow-hidden"
          style={{ backgroundColor: bar.signature.light }}
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-pack uppercase leading-[0.85] select-none pointer-events-none whitespace-nowrap opacity-15"
            style={{
              color: bar.signature.dark,
              fontSize: "clamp(8rem, 26vw, 20rem)",
              letterSpacing: "-0.04em",
            }}
          >
            {bar.shortName}
          </div>

          <div className="shell relative z-10 grid gap-10 md:grid-cols-12 items-center">
            <div className="md:col-span-5 flex flex-col gap-6">
              <Link
                href="/#bars"
                data-cursor="link"
                className="font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{ color: bar.signature.dark }}
              >
                ← All bars
              </Link>
              <span
                className="font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{ color: bar.signature.dark }}
              >
                {bar.ribbon}
              </span>
              <h1
                id="bar-title"
                className="font-pack uppercase leading-[0.92] tracking-[-0.03em] text-5xl md:text-7xl"
                style={{ color: bar.signature.dark }}
              >
                {bar.name}
              </h1>
              <p
                className="font-display italic text-xl md:text-2xl max-w-md"
                style={{ color: bar.signature.dark }}
              >
                {bar.tagline}
              </p>
              <div className="flex items-center gap-3">
                <PackBadge id="no-refined-sugar" size={48} />
                <PackBadge id="no-artificial-flavours" size={48} />
                <PackBadge id="no-preservatives" size={48} />
              </div>
              <p
                className="font-mono text-[11px] uppercase tracking-[0.22em] mt-2"
                style={{ color: bar.signature.dark + "cc" }}
              >
                Net weight {bar.weightG} g · {bar.proteinLine}
              </p>
            </div>

            <div className="md:col-span-4 relative aspect-square">
              <LevitatingPack
                src={bar.images.front}
                alt={bar.alt.front}
                sizes="(min-width: 768px) 36vw, 90vw"
                priority
                shadowStrength={0.4}
                bobAmplitude={11}
              />
            </div>

            <div className="md:col-span-3">
              <AddToBagPanel slug={bar.slug} />
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="bg-[var(--color-bg)] py-20" data-bg="bg">
          <div className="shell">
            <Tabs.Root defaultValue="description">
              <Tabs.List className="flex flex-wrap gap-2 border-b border-[var(--color-ink)]/15" aria-label="Bar details">
                {[
                  ["description", "Description"],
                  ["ingredients", "Ingredients"],
                  ["nutrition", "Nutrition"],
                  ["reviews", "Reviews"],
                ].map(([v, label]) => (
                  <Tabs.Trigger
                    key={v}
                    value={v}
                    data-cursor="button"
                    className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/65 data-[state=active]:text-[var(--color-ink)] data-[state=active]:border-b data-[state=active]:border-[var(--color-moss)] -mb-px"
                  >
                    {label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              <Tabs.Content value="description" className="py-10 grid gap-10 md:grid-cols-12 max-w-5xl">
                <div className="md:col-span-7 flex flex-col gap-6">
                  <p className="font-display italic text-2xl md:text-3xl text-[var(--color-ink)] leading-snug">
                    {bar.description}
                  </p>
                  <p className="font-body text-base text-[var(--color-ink)]/80 leading-relaxed">
                    {bar.longDescription}
                  </p>
                </div>
                <div className="md:col-span-5 flex flex-col gap-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55">
                    What makes it different
                  </p>
                  <ul className="flex flex-col gap-3">
                    {bar.whatsDifferent.map((d) => (
                      <li
                        key={d}
                        className="flex gap-3 font-body text-base text-[var(--color-ink)]/85 leading-relaxed"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-moss)]"
                        />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Tabs.Content>

              <Tabs.Content value="ingredients" className="py-10 max-w-4xl">
                {bar.ingredients ? (
                  <ul className="grid gap-3 md:grid-cols-2 max-w-2xl">
                    {bar.ingredients.map((it) => (
                      <li key={it} className="flex items-center gap-3 font-body text-base text-[var(--color-ink)]/85 py-2 border-b border-[var(--color-ink)]/10">
                        <span aria-hidden className="w-2 h-2 rounded-full bg-[var(--color-moss)]" />
                        {it}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-display italic text-xl text-[var(--color-ink)]/70 max-w-2xl">
                    Ingredient list pending — read the back of the pack until then. Allergens: {SHARED.allergens.toLowerCase()}
                  </p>
                )}
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55">
                  {SHARED.allergens} · {SHARED.storage}
                </p>
              </Tabs.Content>

              <Tabs.Content value="nutrition" className="py-10 max-w-3xl">
                {(() => {
                  const publishedCount = NUTRITION_ROWS.filter(
                    (r) => bar.nutritionPer100g[r.key] != null
                  ).length;
                  const isPartial =
                    publishedCount > 0 && publishedCount < NUTRITION_ROWS.length;
                  return (
                    <>
                      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
                        {isPartial
                          ? `Spec sheet · ${publishedCount} of ${NUTRITION_ROWS.length} values published`
                          : `Lab panel · all ${NUTRITION_ROWS.length} values published`}
                      </p>
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55 pb-3 text-left">Per 100 g</th>
                            <th className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55 pb-3 text-right">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {NUTRITION_ROWS.map((row) => {
                            const v = bar.nutritionPer100g[row.key];
                            const has = v != null;
                            return (
                              <tr
                                key={row.key}
                                className="border-t border-[var(--color-ink)]/10"
                              >
                                <td
                                  className={
                                    "font-display text-lg py-3 " +
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
                                  {has ? formatNutrition(v, row.unit) : "pending"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {isPartial ? (
                        <p className="mt-4 font-body text-sm italic text-[var(--color-ink)]/65 max-w-md">
                          Energy and protein come from the brand&rsquo;s May
                          2026 spec sheet. The remaining values publish with
                          the next lab panel — we don&rsquo;t guess.
                        </p>
                      ) : null}
                    </>
                  );
                })()}
                <dl className="mt-8 grid gap-2 sm:grid-cols-2 max-w-2xl">
                  {[
                    ["SKU", bar.sku],
                    ["Net weight", `${bar.weightG} g`],
                    ["Dimensions", bar.dimensions],
                    ["Pack colour", bar.color],
                    ["Diet", bar.vegetarian ? "Vegetarian" : "Non-vegetarian"],
                    ["Manufactured by", SHARED.manufacturer],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="grid grid-cols-[8rem_1fr] gap-3 py-2 border-t border-[var(--color-ink)]/10"
                    >
                      <dt className="font-mono uppercase tracking-[0.18em] text-[10px] text-[var(--color-ink)]/55 self-center">
                        {k}
                      </dt>
                      <dd className="font-body text-sm text-[var(--color-ink)]/85">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55">
                  FSSAI {SHARED.fssai} · {SHARED.iso} · {SHARED.haccp}
                </p>
              </Tabs.Content>

              <Tabs.Content value="reviews" className="py-10 max-w-3xl">
                <ul className="grid gap-6">
                  {reviews.map((r, i) => (
                    <li key={i} className="border-l-2 border-[var(--color-moss)] pl-6">
                      <p className="font-display italic text-xl text-[var(--color-ink)]">&ldquo;{r.quote}&rdquo;</p>
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/60">— {r.name}</p>
                    </li>
                  ))}
                </ul>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </section>

        {/* Gallery */}
        <section className="bg-[var(--color-bg-alt)] py-20" data-bg="bg-alt">
          <div className="shell grid gap-6 md:grid-cols-3">
            <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: bar.signature.light }}>
              <LevitatingPack
                src={bar.images.flat}
                alt={bar.alt.flat}
                sizes="33vw"
                shadowStrength={0.32}
                bobAmplitude={7}
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={bar.images.lifestyle} alt={bar.alt.lifestyle} fill sizes="33vw" className="object-cover" />
            </div>
            {bar.images.back ? (
              <div
                className="relative aspect-[4/5] overflow-hidden"
                style={{ backgroundColor: bar.signature.light }}
              >
                <LevitatingPack
                  src={bar.images.back}
                  alt={bar.alt.back ?? bar.name}
                  sizes="33vw"
                  shadowStrength={0.32}
                  bobAmplitude={7}
                />
              </div>
            ) : (
              <div className="relative aspect-[4/5] grid place-items-center bg-[var(--color-bg)]">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55 text-center max-w-[20ch]">
                  Back-of-pack image — coming soon.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* You may also like */}
        <section className="py-24" data-bg="bg">
          <div className="shell flex flex-col gap-10">
            <Reveal as="h2" className="font-display text-3xl md:text-5xl tracking-[-0.04em]">
              You may also like
            </Reveal>
            <ul className="grid gap-4 md:grid-cols-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/bars/${r.slug}`}
                    data-cursor="link"
                    className="group block p-6 transition"
                    style={{ backgroundColor: r.signature.light }}
                  >
                    <div className="relative aspect-[4/3]">
                      <LevitatingPack
                        src={r.images.front}
                        alt={r.alt.front}
                        sizes="25vw"
                        shadowStrength={0.26}
                        bobAmplitude={6}
                      />
                    </div>
                    <p
                      className="mt-4 font-pack uppercase text-2xl tracking-[-0.02em]"
                      style={{ color: r.signature.dark }}
                    >
                      {r.shortName}
                    </p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: r.signature.dark }}>
                      {formatINR(r.priceINR)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
