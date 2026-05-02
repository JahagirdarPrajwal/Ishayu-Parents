import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { FloralAsterisk } from "@/components/brand/FloralAsterisk";
import { COPY } from "@/lib/voice";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="min-h-[80vh] grid place-items-center pt-32 pb-20" data-bg="bg">
        <section className="text-center max-w-2xl px-6 flex flex-col items-center gap-8">
          <div className="relative h-32 w-32 grid place-items-center">
            <div className="absolute inset-0 grid place-items-center bob">
              <FloralAsterisk size={64} className="text-[var(--color-moss)]" />
            </div>
            <FloralAsterisk size={14} className="absolute top-2 left-4 text-[var(--color-moss)]/50 sway" />
            <FloralAsterisk size={10} className="absolute bottom-4 right-2 text-[var(--color-moss)]/40 sway" />
          </div>
          <h1 className="font-display italic text-5xl md:text-7xl tracking-[-0.04em] text-[var(--color-ink)]">
            {COPY.notFound.headline}
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55">
            {COPY.notFound.sub}
          </p>
          <Link
            href="/"
            data-cursor="link"
            className="font-mono text-[11px] uppercase tracking-[0.22em] underline-offset-4 hover:underline text-[var(--color-ink)]"
          >
            {COPY.notFound.cta}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
