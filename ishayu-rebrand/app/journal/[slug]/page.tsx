import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Reveal } from "@/components/ui/Reveal";
import { FloralAsterisk } from "@/components/brand/FloralAsterisk";
import { COPY } from "@/lib/voice";
import { JOURNAL, getArticle } from "@/lib/journal";

export async function generateStaticParams() {
  return JOURNAL.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return { title: a.title, description: a.dek };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  return (
    <>
      <Nav />
      <main>
        <article className="pt-32 pb-32" data-bg="bg">
          <div className="shell max-w-2xl flex flex-col gap-6">
            <div role="status" className="bg-[var(--color-butter)]/40 border border-[var(--color-butter)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)] flex items-center gap-3">
              <FloralAsterisk size={14} className="text-[var(--color-moss)]" />
              {COPY.journal.placeholderBanner}
            </div>

            <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
              {a.kicker} · {a.readMin} min read
            </Reveal>
            <Reveal as="h1" mode="lines" className="font-display text-4xl md:text-6xl tracking-[-0.04em] text-[var(--color-ink)]">
              {a.title}
            </Reveal>
            <Reveal as="p" delay={0.1} className="font-display italic text-xl text-[var(--color-ink)]/75">
              {a.dek}
            </Reveal>

            <div className="mt-10 flex flex-col gap-6 font-display text-lg md:text-xl text-[var(--color-ink)]/80 leading-relaxed">
              <p className="dropcap">{COPY.journal.placeholderBody}</p>
              <p>{COPY.journal.placeholderBody}</p>
            </div>

            <Link
              href="/journal"
              data-cursor="link"
              className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)] hover:text-[var(--color-moss)] transition"
            >
              ← All field notes
            </Link>
          </div>
        </article>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
