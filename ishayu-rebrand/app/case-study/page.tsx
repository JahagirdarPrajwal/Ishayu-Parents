import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Reveal } from "@/components/ui/Reveal";
import { FloralAsterisk } from "@/components/brand/FloralAsterisk";
import { Wordmark } from "@/components/brand/Wordmark";
import { COPY, BUILT_BY } from "@/lib/voice";
import { BARS } from "@/lib/products";
import { EASE } from "@/lib/motion";

export const metadata: Metadata = {
  title: COPY.caseStudy.title,
  description: COPY.caseStudy.sub,
};

const SWATCHES = [
  { name: "Cream", token: "var(--color-bg)", hex: "#F4EFE6" },
  { name: "Cream alt", token: "var(--color-bg-alt)", hex: "#EAE3D2" },
  { name: "Forest ink", token: "var(--color-ink)", hex: "#1F2A1B" },
  { name: "Moss", token: "var(--color-moss)", hex: "#4A6A3A" },
  { name: "Sage", token: "var(--color-sage)", hex: "#8AA174" },
  { name: "Olive", token: "var(--color-olive)", hex: "#C7C58A" },
  { name: "Butter", token: "var(--color-butter)", hex: "#F4D27A" },
  { name: "Petal", token: "var(--color-petal)", hex: "#F2C6C0" },
  { name: "Terracotta", token: "var(--color-terracotta)", hex: "#C26A4A" },
];

const TYPE_PAIRS = [
  { role: "Editorial display", family: "Fraunces", sample: "ishayu" },
  { role: "Pack-style headline", family: "Anton", sample: "MORINGA ENERGY BAR" },
  { role: "Body / UI", family: "Inter", sample: "Real ingredients. Honest energy." },
  { role: "Micro-copy", family: "JetBrains Mono", sample: "FSSAI 11220302001071" },
];

const STACK = [
  ["Next.js 15+ + React 19", "RSC by default, App Router, edge-friendly."],
  ["Tailwind CSS v4", "CSS-first @theme tokens, zero config file."],
  ["Framer Motion 11", "Component motion + scroll-linked transforms."],
  ["Lenis", "Buttery-smooth scroll without breaking accessibility."],
  ["GSAP + ScrollTrigger", "Hero wind, pinned horizontal showcase."],
  ["@react-three/fiber + drei", "Lazy 3D bar spotlight, with static fallback."],
  ["Radix UI + Vaul + Sonner", "Accessible primitives, reskinned to brand."],
  ["Zustand", "Tiny cart + UI state, persisted to localStorage."],
  ["Vercel Analytics + Speed Insights", "Gated behind cookie consent."],
];

void EASE;

export default function CaseStudyPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        {/* Title */}
        <section className="pt-16 pb-24" data-bg="bg">
          <div className="shell max-w-4xl flex flex-col gap-6">
            <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
              Case study — Ishayu rebrand demo
            </Reveal>
            <Reveal as="h1" mode="lines" className="font-display text-5xl md:text-8xl tracking-[-0.05em] text-[var(--color-ink)]">
              {COPY.caseStudy.sub}
            </Reveal>
            <FloralAsterisk size={32} className="text-[var(--color-moss)] mt-4" />
          </div>
        </section>

        {/* The brief */}
        <Section kicker="01" title={COPY.caseStudy.sections.brief}>
          <p className="font-display text-2xl text-[var(--color-ink)]/85">
            Ishayu is a small Bengaluru wellness brand selling protein and energy bars. The brief: build a pitch demo that earns it the editorial respect of a Blume-class brand &mdash; without touching the live store at <Link href="https://ishayu.in" target="_blank" className="underline underline-offset-4">ishayu.in</Link>.
          </p>
        </Section>

        {/* The reference */}
        <Section kicker="02" title={COPY.caseStudy.sections.reference}>
          <p className="font-body text-base text-[var(--color-ink)]/75 max-w-2xl">
            The North Star was a single mood-board image: an oversized editorial serif sitting in tall grass, wildflowers blowing on a soft cream sky. We translated that mood &mdash; whitespace, slow rhythm, an asterisk used as a connective floral motif &mdash; without copying any of the original assets.
          </p>
          <figure className="mt-8 max-w-2xl">
            <div className="aspect-[4/3] grid place-items-center bg-[var(--color-bg-alt)] border border-[var(--color-ink)]/10">
              <FloralAsterisk size={48} className="text-[var(--color-moss)]" />
            </div>
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55">
              {COPY.caseStudy.referenceCaption}
            </figcaption>
          </figure>
        </Section>

        {/* The audit */}
        <Section kicker="03" title={COPY.caseStudy.sections.audit}>
          <p className="font-body text-base text-[var(--color-ink)]/75 max-w-2xl mb-6">
            Drop your own before/after screenshots into <code className="font-mono text-xs bg-[var(--color-bg-alt)] px-1.5 py-0.5">/public/case-study/before.jpg</code> and <code className="font-mono text-xs bg-[var(--color-bg-alt)] px-1.5 py-0.5">/public/case-study/after.jpg</code> to wire up the slider here.
          </p>
          <div className="aspect-[16/9] bg-[var(--color-bg-alt)] grid place-items-center border border-[var(--color-ink)]/10">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55">
              Before / After slider — awaiting screenshots
            </p>
          </div>
        </Section>

        {/* The system */}
        <Section kicker="04" title={COPY.caseStudy.sections.system}>
          <h3 className="font-display text-2xl tracking-[-0.03em] mb-4">Color tokens</h3>
          <ul className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {SWATCHES.map((s) => (
              <li key={s.name} className="flex flex-col gap-2">
                <div className="aspect-square border border-[var(--color-ink)]/10" style={{ background: s.token }} />
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)]/65">
                  {s.name}
                </p>
                <p className="font-mono text-[11px] tracking-wide text-[var(--color-ink)]/45">
                  {s.hex}
                </p>
              </li>
            ))}
          </ul>

          <h3 className="font-display text-2xl tracking-[-0.03em] mt-12 mb-4">Per-bar palette</h3>
          <ul className="grid grid-cols-5 gap-4">
            {BARS.map((b) => (
              <li key={b.slug}>
                <div className="aspect-square grid place-items-center" style={{ background: b.signature.light }}>
                  <span className="font-pack uppercase text-xl" style={{ color: b.signature.dark }}>
                    {b.shortName}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="font-display text-2xl tracking-[-0.03em] mt-12 mb-4">Type</h3>
          <ul className="grid gap-6">
            {TYPE_PAIRS.map((p) => (
              <li key={p.family} className="grid grid-cols-12 gap-4 items-baseline border-b border-[var(--color-ink)]/10 pb-6">
                <span className="col-span-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55">
                  {p.role}
                </span>
                <span className="col-span-3 font-mono text-[11px] tracking-wider text-[var(--color-ink)]/65">
                  {p.family}
                </span>
                <span
                  className={
                    p.family === "Fraunces"
                      ? "col-span-6 font-display text-3xl tracking-[-0.04em] text-[var(--color-ink)]"
                      : p.family === "Anton"
                        ? "col-span-6 font-pack uppercase text-3xl text-[var(--color-ink)]"
                        : p.family === "Inter"
                          ? "col-span-6 font-body text-xl text-[var(--color-ink)]"
                          : "col-span-6 font-mono text-base text-[var(--color-ink)]"
                  }
                >
                  {p.sample}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="font-display text-2xl tracking-[-0.03em] mt-12 mb-4">Wordmark</h3>
          <Wordmark size="xl" />
        </Section>

        {/* The pages */}
        <Section kicker="05" title={COPY.caseStudy.sections.pages}>
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              ["Home", "Hero · marquee · founder · process · story · 5-bar pinned showcase · 3D spotlight · ingredients · nutrition · sustainability · stockists · testimonials · journal · FAQ · newsletter."],
              ["/bars/[slug]", "Per-bar landing with sticky add-to-bag, tabs (description / ingredients / nutrition / reviews), gallery, related carousel."],
              ["/about", "Long-form founder story; pull-quote outlined as data-pending until a real one is supplied."],
              ["/journal", "Three sample articles, each clearly flagged as coming-soon."],
              ["/stockists", "Three tiles + a stockist enquiry mailto."],
              ["/faq", "Eight honest questions, accordion."],
              ["/case-study", "This page — the pitch."],
              ["/404", "Art-directed empty-field 404."],
            ].map(([title, body]) => (
              <li key={title} className="border-l-2 border-[var(--color-moss)] pl-5">
                <p className="font-display text-xl">{title}</p>
                <p className="font-body text-sm text-[var(--color-ink)]/75 mt-1">{body}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* The build */}
        <Section kicker="06" title={COPY.caseStudy.sections.build}>
          <ul className="grid gap-3">
            {STACK.map(([k, v]) => (
              <li key={k} className="flex items-baseline gap-3 border-b border-[var(--color-ink)]/10 pb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)] w-56 shrink-0">
                  {k}
                </span>
                <span className="font-body text-sm text-[var(--color-ink)]/80">{v}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* What's next */}
        <Section kicker="07" title={COPY.caseStudy.sections.next}>
          <ul className="font-display text-xl md:text-2xl text-[var(--color-ink)]/85 space-y-2">
            <li>* Nutri Bites, Coatz, Sprinkles — same system, different palette.</li>
            <li>* Real founder quote + portrait.</li>
            <li>* Full nutrition panel (carbs, sugars, fat, sodium) for the four newer bars — kcal + protein already published.</li>
            <li>* Hindi / Kannada locale.</li>
            <li>* Tied-in checkout via Razorpay or Cashfree.</li>
          </ul>
        </Section>

        {/* Built by */}
        <section className="py-24" data-bg="bg-alt">
          <div className="shell max-w-3xl text-center">
            <FloralAsterisk size={32} className="text-[var(--color-moss)] mx-auto" />
            <p className="mt-6 font-display italic text-2xl text-[var(--color-ink)]/85">
              {COPY.footer.builtBy(BUILT_BY)}
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}

function Section({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-24" data-bg="bg">
      <div className="shell max-w-5xl flex flex-col gap-6">
        <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
          {kicker} — {title}
        </Reveal>
        <Reveal as="h2" className="font-display text-3xl md:text-5xl tracking-[-0.04em] text-[var(--color-ink)]">
          {title}.
        </Reveal>
        <div className="mt-4">{children}</div>
      </div>
    </section>
  );
}
