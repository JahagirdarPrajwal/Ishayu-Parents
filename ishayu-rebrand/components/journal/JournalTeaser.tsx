import Link from "next/link";
import { COPY } from "@/lib/voice";
import { JOURNAL } from "@/lib/journal";
import { Reveal } from "@/components/ui/Reveal";
import { FloralAsterisk } from "@/components/brand/FloralAsterisk";

const GRADIENTS = [
  "linear-gradient(135deg, color-mix(in oklab, var(--color-bar-cocoa-dark) 60%, var(--color-bg-alt)), color-mix(in oklab, var(--color-bar-peanut-light) 80%, var(--color-bg-alt)))",
  "linear-gradient(135deg, color-mix(in oklab, var(--color-bar-moringa-dark) 70%, var(--color-bg-alt)), color-mix(in oklab, var(--color-sage) 70%, var(--color-bg-alt)))",
  "linear-gradient(135deg, color-mix(in oklab, var(--color-bar-beet-dark) 60%, var(--color-bg-alt)), color-mix(in oklab, var(--color-petal) 80%, var(--color-bg-alt)))",
];

export function JournalTeaser() {
  return (
    <section
      data-bg="bg-alt"
      aria-labelledby="journal-title"
      className="relative py-32"
    >
      <div className="shell flex flex-col gap-12">
        <header className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
              {COPY.journal.kicker}
            </Reveal>
            <Reveal as="h2" mode="lines" className="font-display text-4xl md:text-6xl tracking-[-0.04em] text-[var(--color-ink)] mt-3">
              {COPY.journal.headline}
            </Reveal>
          </div>
          <Link
            href="/journal"
            data-cursor="link"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)] hover:text-[var(--color-moss)] transition"
          >
            {COPY.journal.cta}
          </Link>
        </header>

        <ul className="grid gap-6 md:grid-cols-3">
          {JOURNAL.map((a, i) => (
            <li key={a.slug}>
              <Link
                href={`/journal/${a.slug}`}
                data-cursor="link"
                className="group block bg-[var(--color-bg)] hover:bg-[var(--color-bg-alt)] transition p-0 h-full overflow-hidden border border-[var(--color-ink)]/10"
              >
                <div
                  data-generated="true"
                  aria-hidden
                  className="aspect-[4/3] w-full"
                  style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                />
                <div className="p-6 flex flex-col gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)] flex items-center gap-2">
                    <FloralAsterisk size={10} className="text-[var(--color-moss)]" />
                    {a.kicker}
                  </span>
                  <h3 className="font-display text-2xl tracking-[-0.03em] text-[var(--color-ink)]">
                    {a.title}
                  </h3>
                  <p className="font-body text-base text-[var(--color-ink)]/70 leading-relaxed">
                    {a.dek}
                  </p>
                  <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55">
                    {a.readMin} min read
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
