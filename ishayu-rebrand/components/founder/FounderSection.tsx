import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { COPY } from "@/lib/voice";
import { FOUNDER } from "@/lib/founder";

export function FounderSection() {
  return (
    <section
      id="about"
      data-bg="bg"
      aria-labelledby="founder-title"
      className="relative py-32"
    >
      <div className="shell grid gap-12 md:grid-cols-12">
        <div className="md:col-span-6 md:col-start-1 flex flex-col gap-6">
          <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
            {COPY.founder.kicker}
          </Reveal>
          <Reveal as="h2" mode="lines" className="font-display text-4xl md:text-6xl tracking-[-0.04em] text-[var(--color-ink)]" delay={0.1}>
            {COPY.founder.headline}
          </Reveal>
          <Reveal as="p" className="font-display text-xl md:text-2xl text-[var(--color-ink)]/80 max-w-xl dropcap mt-4" delay={0.2}>
            {COPY.founder.paragraph1}
          </Reveal>
          <Reveal as="p" className="font-body text-base md:text-lg text-[var(--color-ink)]/75 max-w-xl" delay={0.3}>
            {COPY.founder.paragraph2}
          </Reveal>

          <Reveal
            as="blockquote"
            className="mt-6 max-w-xl border-l-2 border-[var(--color-moss)] pl-6 font-display italic text-2xl md:text-3xl text-[var(--color-ink)] data-[pending=true]:[outline-style:dashed] data-[pending=true]:outline-1 data-[pending=true]:outline-[var(--color-terracotta)]/60 data-[pending=true]:outline-offset-8"
            delay={0.4}
          >
            <span data-pending={FOUNDER.pending}>
              &ldquo;{COPY.founder.pullQuote}&rdquo;
            </span>
            <footer className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-terracotta)] not-italic">
              {COPY.founder.pullQuoteLabel}
            </footer>
          </Reveal>

          <Reveal delay={0.5}>
            <Link
              href="/about"
              data-cursor="link"
              className="inline-flex items-center gap-2 mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)] hover:text-[var(--color-moss)] transition"
            >
              {COPY.founder.seeMore} <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>

        {/* Right: Vittarthaa Life Sciences brand-credit plate.
            Editorial framing — cream card, logo centered with generous padding,
            mono caption strip at the bottom. The real parent-brand logo is the
            point: this section is "who actually makes Ishayu". */}
        <Reveal
          as="div"
          className="md:col-span-5 md:col-start-8 md:sticky md:top-32 self-start"
          delay={0.2}
        >
          <figure className="relative aspect-[4/5] bg-[var(--color-bg)] border border-[var(--color-ink)]/12 shadow-[0_24px_60px_-30px_rgba(31,42,27,0.25)] flex flex-col overflow-hidden">
            {/* Corner ticks — editorial print plate */}
            <span aria-hidden className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[var(--color-moss)]/60 z-10" />
            <span aria-hidden className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[var(--color-moss)]/60 z-10" />
            <span aria-hidden className="absolute bottom-[78px] left-3 w-3 h-3 border-b border-l border-[var(--color-moss)]/60 z-10" />
            <span aria-hidden className="absolute bottom-[78px] right-3 w-3 h-3 border-b border-r border-[var(--color-moss)]/60 z-10" />

            {/* Top eyebrow */}
            <div className="flex items-center justify-between px-5 pt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55">
              <span>Made by</span>
              <span>est. 2016 · BLR</span>
            </div>

            {/* Logo plate — fills the available space, only minimal side padding */}
            <div className="flex-1 grid place-items-center px-4 sm:px-6 py-4">
              <Image
                src="/vittarthaa-mark.webp"
                alt="Vittarthaa Life Sciences Pvt. Ltd."
                width={1200}
                height={536}
                sizes="(min-width: 1024px) 32vw, (min-width: 768px) 42vw, 86vw"
                className="object-contain w-full h-full max-w-[92%] max-h-[80%] select-none"
                priority={false}
              />
            </div>

            {/* Caption strip */}
            <figcaption className="border-t border-[var(--color-ink)]/12 px-5 py-4 bg-[var(--color-bg-alt)]">
              <p className="font-display text-base text-[var(--color-ink)] tracking-[-0.02em]">
                Vittarthaa Life Sciences Pvt. Ltd.
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/60">
                Bengaluru · FSSAI 11220302001071 · ISO 9001:2015 · HACCP
              </p>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
