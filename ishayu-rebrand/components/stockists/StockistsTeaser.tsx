import Link from "next/link";
import { COPY } from "@/lib/voice";
import { STOCKISTS } from "@/lib/stockists";
import { Reveal } from "@/components/ui/Reveal";
import { FloralAsterisk } from "@/components/brand/FloralAsterisk";

export function StockistsTeaser() {
  return (
    <section
      data-bg="bg-alt"
      aria-labelledby="stockists-title"
      className="relative py-32"
    >
      <div className="shell flex flex-col gap-12">
        <header className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
              {COPY.stockistsTeaser.kicker}
            </Reveal>
            <Reveal as="h2" mode="lines" className="font-display text-4xl md:text-6xl tracking-[-0.04em] text-[var(--color-ink)] mt-3">
              {COPY.stockistsTeaser.headline}
            </Reveal>
          </div>
          <Link
            href="/stockists"
            data-cursor="link"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)] hover:text-[var(--color-moss)] transition"
          >
            {COPY.stockistsTeaser.cta} →
          </Link>
        </header>

        <ul className="grid gap-6 md:grid-cols-3">
          {STOCKISTS.map((s) => (
            <li key={s.id}>
              <Link
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                data-cursor="link"
                className="group block bg-[var(--color-bg)] border border-[var(--color-ink)]/10 hover:border-[var(--color-moss)] transition p-8 h-full flex flex-col gap-4"
              >
                <FloralAsterisk size={20} className="text-[var(--color-moss)]" />
                <h3 className="font-display text-2xl tracking-[-0.03em] text-[var(--color-ink)]">
                  {s.name}
                </h3>
                <p className="font-body text-base text-[var(--color-ink)]/70">{s.blurb}</p>
                <span className="mt-auto font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/60 group-hover:text-[var(--color-moss)] transition">
                  {s.pending ? "Coming soon → " : "View → "}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
