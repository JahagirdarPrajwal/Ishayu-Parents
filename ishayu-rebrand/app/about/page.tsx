import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Reveal } from "@/components/ui/Reveal";
import { FloralAsterisk } from "@/components/brand/FloralAsterisk";
import { FOUNDER } from "@/lib/founder";
import { COPY } from "@/lib/voice";

export const metadata: Metadata = {
  title: "About",
  description: COPY.brand.elevator,
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="pt-32 pb-20" data-bg="bg">
          <div className="shell max-w-4xl flex flex-col gap-10">
            <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
              About — {FOUNDER.brand}
            </Reveal>
            <Reveal as="h1" mode="lines" className="font-display text-5xl md:text-7xl tracking-[-0.04em] text-[var(--color-ink)]">
              {COPY.founder.headline}
            </Reveal>
            <FloralAsterisk size={32} className="text-[var(--color-moss)]" />
          </div>
        </section>

        <section className="pb-32" data-bg="bg">
          <div className="shell max-w-3xl flex flex-col gap-8">
            {FOUNDER.longForm.map((para, i) => (
              <Reveal key={i} as="p" className={`font-display text-xl md:text-2xl text-[var(--color-ink)]/85 ${i === 0 ? "dropcap" : ""}`} delay={i * 0.05}>
                {para}
              </Reveal>
            ))}

            <blockquote
              data-pending={FOUNDER.pending}
              className="mt-12 border-l-2 border-[var(--color-moss)] pl-6 data-[pending=true]:[outline-style:dashed] data-[pending=true]:outline-1 data-[pending=true]:outline-[var(--color-terracotta)]/60 data-[pending=true]:outline-offset-8"
            >
              <p className="font-display italic text-3xl md:text-4xl text-[var(--color-ink)]">
                &ldquo;{FOUNDER.pullQuote}&rdquo;
              </p>
              <footer className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-terracotta)]">
                {FOUNDER.pullQuoteAttribution}
              </footer>
            </blockquote>

            <div className="mt-16 grid gap-4 md:grid-cols-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)]/65">
              <div>
                <p className="text-[var(--color-ink)]/50 mb-1">Manufacturer</p>
                {FOUNDER.legalEntity}
              </div>
              <div>
                <p className="text-[var(--color-ink)]/50 mb-1">FSSAI</p>
                {FOUNDER.fssai}
              </div>
              <div>
                <p className="text-[var(--color-ink)]/50 mb-1">Facility</p>
                {FOUNDER.facility}
              </div>
              <div>
                <p className="text-[var(--color-ink)]/50 mb-1">City</p>
                {FOUNDER.city}, {FOUNDER.area}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
