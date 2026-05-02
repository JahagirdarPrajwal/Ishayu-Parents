import Image from "next/image";
import { COPY } from "@/lib/voice";
import { Reveal } from "@/components/ui/Reveal";
import { BARS } from "@/lib/products";

const ragi = BARS.find((b) => b.slug === "ragi-millet")!;

export function SustainabilitySection() {
  return (
    <section
      data-bg="bg"
      aria-labelledby="sustainability-title"
      className="relative py-32 overflow-hidden"
    >
      {ragi.images.back && (
        <div aria-hidden className="absolute inset-0 -z-10 grayscale-[80%] opacity-25">
          <Image
            src={ragi.images.back}
            alt=""
            fill
            sizes="100vw"
            className="object-cover scale-[1.1]"
          />
        </div>
      )}
      <div className="shell flex flex-col gap-8 max-w-4xl">
        <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
          {COPY.sustainability.kicker}
        </Reveal>
        <Reveal as="h2" mode="lines" className="font-display text-4xl md:text-6xl tracking-[-0.04em] text-[var(--color-ink)]">
          {COPY.sustainability.headline}
        </Reveal>
        <Reveal as="p" className="font-display text-xl md:text-2xl text-[var(--color-ink)]/85 max-w-2xl" delay={0.1}>
          {COPY.sustainability.body}
        </Reveal>
        <div className="flex flex-wrap gap-3 mt-6">
          {COPY.sustainability.chips.map((chip) => (
            <span
              key={chip}
              className="font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-2 border border-[var(--color-moss)]/40 text-[var(--color-moss)] rounded-full"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
