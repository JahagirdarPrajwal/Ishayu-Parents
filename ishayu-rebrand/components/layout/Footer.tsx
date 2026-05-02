import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { FloralAsterisk } from "@/components/brand/FloralAsterisk";
import { COPY } from "@/lib/voice";
import { BUILT_BY } from "@/lib/voice";

export function Footer() {
  return (
    <footer
      data-bg="bg-alt"
      className="relative bg-[var(--color-bg-alt)] text-[var(--color-ink)] pt-24 pb-12"
    >
      <div className="shell">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-8">
          <div className="col-span-2 md:col-span-6">
            <Link href="/" data-cursor="link" className="inline-block">
              <Wordmark size="xl" className="text-[12vw] sm:text-[8vw] md:text-[6vw] leading-none" />
            </Link>
            <p className="mt-6 max-w-md font-display text-xl italic text-[var(--color-ink)]/80">
              {COPY.brand.elevator}
            </p>
          </div>

          {Object.values(COPY.footer.columns).map((col) => (
            <div key={col.title} className="col-span-1 md:col-span-2">
              <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-[var(--color-ink)]/60 mb-4">
                {col.title}
              </p>
              <ul className="flex flex-col gap-3 font-body text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      data-cursor="link"
                      target={"external" in l && l.external ? "_blank" : undefined}
                      rel={"external" in l && l.external ? "noopener noreferrer" : undefined}
                      className="text-[var(--color-ink)]/80 hover:text-[var(--color-moss)] transition"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-[var(--color-ink)]/15 grid gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-[var(--color-ink)]/60">
              {COPY.footer.contactKicker}
            </p>
            <ul className="grid gap-2 font-body text-sm">
              {COPY.footer.contactItems.map((c) => (
                <li
                  key={c.label}
                  className="grid grid-cols-[7rem_1fr] gap-3 items-baseline"
                >
                  <span className="font-mono uppercase tracking-[0.16em] text-[10px] text-[var(--color-ink)]/55">
                    {c.label}
                  </span>
                  <a
                    href={c.href}
                    data-cursor="link"
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-[var(--color-ink)]/85 hover:text-[var(--color-moss)] transition"
                  >
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 md:items-end md:text-right">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)]/60">
              {COPY.footer.fssai}
            </div>
            <div className="font-mono text-[11px] tracking-wide text-[var(--color-ink)]/60 max-w-sm">
              {COPY.footer.address}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-2 md:grid-cols-2">
          <p className="font-mono text-[11px] tracking-wide text-[var(--color-ink)]/60">
            {COPY.footer.legal}
          </p>
          <p className="font-mono text-[11px] tracking-wide text-[var(--color-ink)]/60 md:text-right">
            {COPY.footer.builtBy(BUILT_BY)}
          </p>
        </div>

        <div className="mt-12 grid place-items-center">
          <FloralAsterisk size={28} className="text-[var(--color-moss)]" />
        </div>
      </div>
    </footer>
  );
}
