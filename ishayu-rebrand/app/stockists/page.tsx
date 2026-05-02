import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Reveal } from "@/components/ui/Reveal";
import { FloralAsterisk } from "@/components/brand/FloralAsterisk";
import { STOCKISTS } from "@/lib/stockists";

export const metadata: Metadata = {
  title: "Stockists",
  description: "Where to find Ishayu — online and in Bengaluru.",
};

export default function StockistsPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="pt-32 pb-16" data-bg="bg">
          <div className="shell max-w-4xl flex flex-col gap-6">
            <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
              Where to find us
            </Reveal>
            <Reveal as="h1" mode="lines" className="font-display text-5xl md:text-7xl tracking-[-0.04em] text-[var(--color-ink)]">
              Stockists
            </Reveal>
          </div>
        </section>

        <section className="pb-24" data-bg="bg">
          <div className="shell grid gap-6 md:grid-cols-3">
            {STOCKISTS.map((s) => (
              <Link
                key={s.id}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                data-cursor="link"
                className="block bg-[var(--color-bg-alt)] hover:bg-[var(--color-moss)] hover:text-[var(--color-bg)] transition p-8 h-full flex flex-col gap-4 group"
              >
                <FloralAsterisk size={20} className="text-[var(--color-moss)] group-hover:text-[var(--color-bg)]" />
                <h2 className="font-display text-2xl tracking-[-0.03em]">{s.name}</h2>
                <p className="font-body text-sm opacity-80">{s.blurb}</p>
                <span className="mt-auto font-mono text-[11px] uppercase tracking-[0.22em] opacity-70">
                  {s.pending ? "Coming soon → " : "View → "}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="pb-32" data-bg="bg-alt" id="bengaluru">
          <div className="shell max-w-2xl flex flex-col gap-6">
            <Reveal as="h2" className="font-display text-3xl tracking-[-0.04em] text-[var(--color-ink)]">
              Want to stock Ishayu?
            </Reveal>
            <Reveal as="p" className="font-body text-base text-[var(--color-ink)]/75">
              Drop us a line. We&rsquo;re slowly adding shelf partners around Bengaluru and southern India.
            </Reveal>
            <a
              href="mailto:hello@ishayu.in?subject=Stockist%20enquiry"
              data-cursor="link"
              className="self-start font-mono text-[11px] uppercase tracking-[0.18em] px-5 py-3 bg-[var(--color-ink)] text-[var(--color-bg)] hover:bg-[var(--color-moss)] transition rounded-full"
            >
              hello@ishayu.in →
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
