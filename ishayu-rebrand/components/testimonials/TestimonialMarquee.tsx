"use client";

import { COPY } from "@/lib/voice";
import { SHARED } from "@/lib/products";
import { Reveal } from "@/components/ui/Reveal";

export function TestimonialMarquee() {
  const t = SHARED.testimonials as ReadonlyArray<{ name: string; quote: string }>;
  const rowA = [...t, ...t];
  const rowB = [...[...t].reverse(), ...[...t].reverse()];

  return (
    <section
      data-bg="bg"
      aria-labelledby="testimonials-title"
      className="relative py-32 overflow-hidden"
    >
      <div className="shell flex flex-col gap-10 mb-12">
        <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
          {COPY.testimonials.kicker}
        </Reveal>
        <Reveal as="h2" mode="lines" className="font-display text-4xl md:text-6xl tracking-[-0.04em] text-[var(--color-ink)]">
          {COPY.testimonials.headline}
        </Reveal>
      </div>

      <div className="flex flex-col gap-6">
        <Row items={rowA} reverse={false} />
        <Row items={rowB} reverse />
      </div>

      <style>{`
        @keyframes test-marquee-fwd {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes test-marquee-rev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

function Row({
  items,
  reverse,
}: {
  items: ReadonlyArray<{ name: string; quote: string }>;
  reverse: boolean;
}) {
  return (
    <div className="flex gap-6 will-change-transform whitespace-nowrap"
      style={{
        animation: `${reverse ? "test-marquee-rev" : "test-marquee-fwd"} 60s linear infinite`,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
      onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
    >
      {items.map((t, i) => (
        <article
          key={i}
          className="shrink-0 w-[80vw] max-w-[460px] bg-[var(--color-bg-alt)] p-8 rounded-2xl"
        >
          <p className="font-display italic text-xl md:text-2xl text-[var(--color-ink)] whitespace-normal leading-snug">
            &ldquo;{t.quote}&rdquo;
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/60">
            — {t.name}
          </p>
        </article>
      ))}
    </div>
  );
}
