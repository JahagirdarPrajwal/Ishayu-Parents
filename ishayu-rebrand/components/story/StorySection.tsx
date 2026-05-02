import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { COPY } from "@/lib/voice";
import { BARS } from "@/lib/products";

const moringa = BARS.find((b) => b.slug === "moringa")!;

export function StorySection() {
  return (
    <section
      id="story"
      data-bg="bg"
      aria-labelledby="story-title"
      className="relative py-32"
    >
      <div className="shell grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5 md:col-start-1 relative aspect-[3/4] overflow-hidden">
          <Image
            src={moringa.images.lifestyle}
            alt={moringa.alt.lifestyle}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
            data-cursor="image"
          />
        </div>
        <div className="md:col-span-6 md:col-start-7 flex flex-col gap-6">
          <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
            {COPY.story.kicker}
          </Reveal>
          <Reveal as="h2" mode="lines" className="font-display text-4xl md:text-6xl tracking-[-0.04em] text-[var(--color-ink)]">
            {COPY.story.headline}
          </Reveal>
          <Reveal as="p" className="font-display text-xl md:text-2xl text-[var(--color-ink)]/80 max-w-xl dropcap mt-6" delay={0.15}>
            {COPY.story.body}
          </Reveal>
          <Reveal as="blockquote" className="mt-6 max-w-xl border-l-2 border-[var(--color-moss)] pl-6 font-display italic text-2xl md:text-3xl text-[var(--color-ink)]" delay={0.3}>
            &ldquo;{COPY.story.pullQuote}&rdquo;
          </Reveal>
        </div>
      </div>
    </section>
  );
}
