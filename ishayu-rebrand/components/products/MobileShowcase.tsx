"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { BARS, formatINR } from "@/lib/products";
import { COPY } from "@/lib/voice";
import { Button } from "@/components/ui/Button";
import { LevitatingPack } from "@/components/products/LevitatingPack";
import { PackBadge } from "@/components/brand/PackBadge";
import { useCart } from "@/lib/store/cart";
import { toast } from "sonner";

/**
 * MobileShowcase — the mobile sibling of HorizontalShowcase.
 *
 * Touch-first: a CSS scroll-snap horizontal track with one full-width slide
 * per bar. No GSAP, no scroll-pinning (those are unreliable on touch). The
 * native swipe gesture + snap feels like the desktop pinned carousel without
 * trapping the user.
 *
 * Visible only on `< md` so it doesn't double up with the desktop section.
 */
export function MobileShowcase() {
  const trackRef = useRef<HTMLUListElement>(null);
  const slideRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [active, setActive] = useState(0);
  const add = useCart((s) => s.add);

  // Track which slide is centred most. We compare each slide's distance from
  // the track's horizontal centre on every scroll — IntersectionObserver
  // doesn't give the precision we need at 60fps with snap-x.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const trackCentre = track.scrollLeft + track.clientWidth / 2;
        let bestIdx = 0;
        let bestDist = Infinity;
        slideRefs.current.forEach((el, i) => {
          if (!el) return;
          const c = el.offsetLeft + el.offsetWidth / 2;
          const d = Math.abs(c - trackCentre);
          if (d < bestDist) {
            bestDist = d;
            bestIdx = i;
          }
        });
        setActive(bestIdx);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goTo = (i: number) => {
    const el = slideRefs.current[i];
    if (el && trackRef.current) {
      trackRef.current.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
    }
  };

  return (
    <section
      id="bars"
      data-bg="bg-alt"
      aria-label="Five bars showcase"
      className="md:hidden relative bg-[var(--color-bg-alt)] py-14"
    >
      {/* Header */}
      <div className="shell flex items-center justify-between mb-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/70">
          Bars / swipe
          <motion.span
            aria-hidden
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block ml-1"
          >
            →
          </motion.span>
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/70 tabular-nums">
          {COPY.showcase.counter(active + 1, BARS.length)}
        </p>
      </div>

      {/* Snap track */}
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {BARS.map((bar, i) => {
          const isActive = i === active;
          return (
            <li
              key={bar.slug}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className="snap-start shrink-0 w-screen px-[var(--gutter-x)] pb-3"
            >
              <article
                className="relative flex flex-col gap-5 p-6 overflow-hidden border border-[var(--color-ink)]/10"
                style={{
                  backgroundColor: bar.signature.light,
                  minHeight: "72svh",
                }}
              >
                {/* Giant backdrop name — drops in on activation */}
                <motion.span
                  aria-hidden
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-pack uppercase leading-[0.85] select-none pointer-events-none whitespace-nowrap"
                  style={{
                    color: bar.signature.dark,
                    fontSize: "clamp(5rem, 28vw, 9rem)",
                    letterSpacing: "-0.04em",
                    opacity: isActive ? 0.16 : 0.08,
                  }}
                  animate={{ scale: isActive ? 1 : 0.97 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {bar.shortName}
                </motion.span>

                {/* Top eyebrow */}
                <div className="flex items-center justify-between relative z-10">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.22em]"
                    style={{ color: bar.signature.dark }}
                  >
                    {bar.ribbon}
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: bar.signature.dark + "cc" }}
                  >
                    {bar.weightG} g
                  </span>
                </div>

                {/* Pack — levitates only on the active slide */}
                <motion.div
                  className="relative aspect-[4/3] mt-1"
                  animate={{
                    rotate: isActive ? 0 : 3,
                    scale: isActive ? 1 : 0.94,
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <LevitatingPack
                    src={bar.images.front}
                    alt={bar.alt.front}
                    sizes="92vw"
                    priority={i === 0}
                    idle={isActive}
                    shadowStrength={0.34}
                    bobAmplitude={8}
                  />
                </motion.div>

                {/* Title + tagline */}
                <div className="relative z-10 flex flex-col gap-2 mt-1">
                  <h3
                    className="font-pack uppercase text-3xl leading-[0.92] tracking-[-0.02em]"
                    style={{ color: bar.signature.dark }}
                  >
                    {bar.name}
                  </h3>
                  <p
                    className="font-display italic text-base"
                    style={{ color: bar.signature.dark }}
                  >
                    {bar.tagline}
                  </p>
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.18em] mt-1"
                    style={{ color: bar.signature.dark + "cc" }}
                  >
                    {bar.proteinLine}
                  </p>
                </div>

                {/* Pack badges */}
                <div className="relative z-10 flex items-center gap-2 mt-1">
                  <PackBadge id="no-refined-sugar" size={36} />
                  <PackBadge id="no-artificial-flavours" size={36} />
                  <PackBadge id="no-preservatives" size={36} />
                </div>

                {/* CTAs pinned to the bottom */}
                <div className="relative z-10 mt-auto flex items-center justify-between gap-3 pt-4">
                  <span
                    className="font-display text-2xl"
                    style={{ color: bar.signature.dark }}
                  >
                    {formatINR(bar.priceINR)}
                  </span>
                  <div className="flex flex-col gap-2 items-stretch w-[55%]">
                    <Button
                      variant="bar"
                      size="md"
                      accent={bar.signature.dark}
                      onClick={() => {
                        add(bar);
                        toast(COPY.cart.addedToast(bar.shortName));
                        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
                          try {
                            navigator.vibrate?.(8);
                          } catch {}
                        }
                      }}
                    >
                      {COPY.showcase.addToBag}
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/bars/${bar.slug}`}>{COPY.showcase.viewBar}</Link>
                    </Button>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {/* Dots */}
      <div className="shell flex gap-2 justify-center mt-5">
        {BARS.map((b, i) => (
          <button
            key={b.slug}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${b.shortName}`}
            aria-current={active === i}
            className={
              "h-1.5 rounded-full transition-all duration-300 " +
              (active === i
                ? "w-8 bg-[var(--color-ink)]"
                : "w-1.5 bg-[var(--color-ink)]/30")
            }
          />
        ))}
      </div>
    </section>
  );
}
