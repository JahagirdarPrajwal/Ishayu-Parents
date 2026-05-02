"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import { BARS, formatINR } from "@/lib/products";
import { COPY } from "@/lib/voice";
import { Button } from "@/components/ui/Button";
import { PackBadge } from "@/components/brand/PackBadge";
import { LevitatingPack } from "@/components/products/LevitatingPack";
import { useCart } from "@/lib/store/cart";
import { toast } from "sonner";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HorizontalShowcase() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const add = useCart((s) => s.add);

  useGSAP(
    () => {
      if (!wrap.current || !track.current || reduced) return;
      const slides = track.current.querySelectorAll<HTMLElement>(".slide");
      const totalScroll = (slides.length - 1) * window.innerWidth;

      const tween = gsap.to(track.current, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (st) => {
            const i = Math.round(st.progress * (slides.length - 1));
            setActive(i);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: wrap, dependencies: [reduced] }
  );

  return (
    <section
      id="bars"
      ref={wrap}
      data-bg="bg-alt"
      aria-label="Five bars showcase"
      data-cursor="drag"
      className="relative hidden md:block h-[100svh] overflow-hidden"
    >
      {/* Counter */}
      <div className="absolute top-24 right-[var(--gutter-x)] z-30 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/70">
        {COPY.showcase.counter(active + 1, BARS.length)}
      </div>
      <div className="absolute top-24 left-[var(--gutter-x)] z-30 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/70">
        Bars / drag or scroll
      </div>

      <div ref={track} className="flex h-full will-change-transform">
        {BARS.map((bar, i) => {
          const isActive = i === active;
          return (
            <div
              key={bar.slug}
              className="slide relative grid place-items-center w-screen h-full shrink-0 overflow-hidden transition-colors duration-700"
              style={{ backgroundColor: bar.signature.light }}
            >
              {/* Giant condensed sans backdrop name */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-pack uppercase leading-[0.85] select-none pointer-events-none whitespace-nowrap"
                style={{
                  color: bar.signature.dark,
                  fontSize: "clamp(8rem, 22vw, 18rem)",
                  opacity: 0.18,
                  letterSpacing: "-0.04em",
                }}
              >
                {bar.shortName}
              </div>

              <div className="shell relative z-10 grid grid-cols-12 gap-8 items-center w-full">
                {/* Left meta */}
                <div className="col-span-3 flex flex-col gap-3">
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.22em]"
                    style={{ color: bar.signature.dark }}
                  >
                    {bar.ribbon}
                  </span>
                  <h3
                    className="font-pack uppercase text-3xl lg:text-5xl leading-[0.92]"
                    style={{ color: bar.signature.dark }}
                  >
                    {bar.name}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] mt-2" style={{ color: bar.signature.dark + "cc" }}>
                    {bar.weightG} g · {bar.proteinLine}
                  </p>
                </div>

                {/* Center pack — transparent cutout, levitating with a soft
                    contact shadow. Only the active slide bobs; sibling slides
                    sit still so the carousel doesn't look noisy. */}
                <div
                  className="col-span-6 relative aspect-[4/3]"
                  style={{
                    transform: isActive ? "rotate(0deg) scale(1)" : "rotate(3deg) scale(0.96)",
                    transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <LevitatingPack
                    src={bar.images.front}
                    alt={bar.alt.front}
                    sizes="50vw"
                    priority={i === 0}
                    idle={isActive}
                    shadowStrength={0.38}
                  />
                </div>

                {/* Right tagline + CTA */}
                <div className="col-span-3 flex flex-col gap-5">
                  <p
                    className="font-display italic text-xl lg:text-2xl"
                    style={{ color: bar.signature.dark }}
                  >
                    {bar.tagline}
                  </p>
                  <span
                    className="font-display text-3xl"
                    style={{ color: bar.signature.dark }}
                  >
                    {formatINR(bar.priceINR)}
                  </span>
                  <div className="flex flex-col gap-3 max-w-[14rem]">
                    <Button
                      variant="bar"
                      size="md"
                      accent={bar.signature.dark}
                      onClick={() => {
                        add(bar);
                        toast(COPY.cart.addedToast(bar.shortName));
                      }}
                    >
                      {COPY.showcase.addToBag}
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <a href={`/bars/${bar.slug}`} data-cursor="link">
                        {COPY.showcase.viewBar}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bottom-left badges */}
              <div className="absolute bottom-10 left-[var(--gutter-x)] flex items-center gap-3 z-10">
                <PackBadge id="no-refined-sugar" size={44} />
                <PackBadge id="no-artificial-flavours" size={44} />
                <PackBadge id="no-preservatives" size={44} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
