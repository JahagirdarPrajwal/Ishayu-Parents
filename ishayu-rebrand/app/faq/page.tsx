import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/faq/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ — honest questions",
  description:
    "Things people actually ask about Ishayu — shelf life, allergens, where they're made.",
};

export default function FaqPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="pt-32 pb-12" data-bg="bg">
          <div className="shell max-w-3xl flex flex-col gap-6">
            <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
              Honest questions
            </Reveal>
            <Reveal as="h1" mode="lines" className="font-display text-5xl md:text-7xl tracking-[-0.04em] text-[var(--color-ink)]">
              FAQ
            </Reveal>
          </div>
        </section>
        <FaqAccordion showHeader={false} />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
