import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Reveal } from "@/components/ui/Reveal";
import { JournalTeaser } from "@/components/journal/JournalTeaser";

export const metadata: Metadata = {
  title: "Journal — field notes",
  description: "What we're reading, growing, learning.",
};

export default function JournalIndex() {
  return (
    <>
      <Nav />
      <main>
        <section className="pt-32 pb-12" data-bg="bg">
          <div className="shell max-w-4xl flex flex-col gap-8">
            <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
              Field notes
            </Reveal>
            <Reveal as="h1" mode="lines" className="font-display text-5xl md:text-7xl tracking-[-0.04em] text-[var(--color-ink)]">
              Journal
            </Reveal>
            <Reveal as="p" delay={0.1} className="font-display italic text-xl md:text-2xl text-[var(--color-ink)]/75 max-w-2xl">
              A slow, occasional newsletter from the kitchen. Three sample articles below.
            </Reveal>
          </div>
        </section>
        <JournalTeaser />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
