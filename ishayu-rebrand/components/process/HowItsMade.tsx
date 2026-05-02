"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { COPY } from "@/lib/voice";
import { PROCESS } from "@/lib/process";
import { Reveal } from "@/components/ui/Reveal";
import { EASE } from "@/lib/motion";

const ICONS: Record<string, React.ReactNode> = {
  sourced: (
    <path d="M5 38c4-8 12-12 19-12s15 4 19 12" stroke="currentColor" fill="none" strokeWidth="1.4" strokeLinecap="round" />
  ),
  prepped: (
    <g stroke="currentColor" fill="none" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="24" cy="26" r="9" />
      <path d="M24 12v6M14 17l4 4M34 17l-4 4" />
    </g>
  ),
  bound: (
    <g stroke="currentColor" fill="none" strokeWidth="1.4" strokeLinecap="round">
      <path d="M10 30c4-6 24-6 28 0" />
      <path d="M14 22c2-3 18-3 20 0" />
    </g>
  ),
  pressed: (
    <g stroke="currentColor" fill="none" strokeWidth="1.4" strokeLinecap="round">
      <rect x="10" y="22" width="28" height="10" rx="1.5" />
      <path d="M14 22V12M34 22V12" />
    </g>
  ),
  sealed: (
    <g stroke="currentColor" fill="none" strokeWidth="1.4" strokeLinecap="round">
      <rect x="8" y="14" width="32" height="22" rx="1" />
      <path d="M8 20h32" />
    </g>
  ),
};

export function HowItsMade() {
  // Track the row of step cards, not the whole section, so the line is
  // anchored to the row geometry. The line grows from "Sourced" (left) to
  // "Sealed" (right) as the row enters and leaves the viewport.
  const rowRef = useRef<HTMLOListElement>(null);
  const verticalRailRef = useRef<HTMLOListElement>(null);

  // Generous activation window: line starts filling as soon as the row peeks
  // in from the bottom of the viewport, and reaches 100% well before the row
  // exits — i.e. while the section is still fully on screen and being read.
  // The previous "end 25%" only completed the line after the row was almost
  // out of view above; users who scrolled at a normal pace passed the section
  // before the 5th circle ever lit up.
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 90%", "end 60%"],
  });
  const { scrollYProgress: verticalProgress } = useScroll({
    target: verticalRailRef,
    offset: ["start 95%", "end 65%"],
  });

  // Lighter spring so the line head tracks scroll closely instead of lagging
  // behind. Higher stiffness, lower damping, lower mass ⇒ snappier follow.
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 22,
    mass: 0.25,
  });
  const verticalLineProgress = useSpring(verticalProgress, {
    stiffness: 170,
    damping: 22,
    mass: 0.25,
  });

  // Width of the connector line (desktop, horizontal).
  const lineWidth = useTransform(lineProgress, [0, 1], ["0%", "100%"]);
  // Height of the connector rail (mobile, vertical).
  const verticalLineHeight = useTransform(verticalLineProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      data-bg="bg-alt"
      aria-labelledby="process-title"
      className="relative py-32"
    >
      <div className="shell flex flex-col gap-16">
        <header className="flex flex-col gap-4">
          <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
            {COPY.process.kicker}
          </Reveal>
          <Reveal as="h2" mode="lines" className="font-display text-4xl md:text-7xl tracking-[-0.04em] text-[var(--color-ink)] max-w-3xl">
            {COPY.process.headline}
          </Reveal>
        </header>

        {/* DESKTOP — horizontal rail with scroll-driven progress */}
        <ol
          ref={rowRef}
          className="hidden md:grid gap-6 grid-cols-5 relative"
        >
          {/* Connector rail — sits behind the circles, exactly between them.
              left-[10%] / right-[10%] = roughly the center of the first and
              last circles (each column is 20% wide, circle is centered). */}
          <div
            aria-hidden
            className="absolute top-[28px] left-[10%] right-[10%] h-px -translate-y-1/2 z-0"
          >
            {/* Dashed track (the "trail") */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, color-mix(in oklab, var(--color-moss) 35%, transparent) 0 6px, transparent 6px 12px)",
              }}
            />
            {/* Solid moss line that grows with scroll */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-[var(--color-moss)]"
              style={{ width: lineWidth }}
            />
            {/* Glow head — a tiny dot riding the leading edge of the line */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[var(--color-moss)] shadow-[0_0_18px_4px_rgba(122,143,99,0.55)]"
              style={{ left: lineWidth }}
            />
          </div>

          {PROCESS.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE.outExpo, delay: i * 0.06 }}
              className="flex flex-col items-start gap-3 relative"
            >
              {/* Circle — slightly de-saturated until the rail head reaches it. */}
              <CircleNode
                index={i}
                total={PROCESS.length}
                progress={lineProgress}
                iconId={step.iconId}
              />
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55">
                {step.number}
              </div>
              <h3 className="font-pack text-3xl uppercase text-[var(--color-ink)]">{step.title}</h3>
              <p className="font-body text-sm text-[var(--color-ink)]/75 max-w-[18ch]">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>

        {/* MOBILE — vertical stack with a vertical scroll-driven rail */}
        <ol
          ref={verticalRailRef}
          className="md:hidden flex flex-col gap-10 relative pl-16"
        >
          <div aria-hidden className="absolute top-3 bottom-3 left-[27px] w-px">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, color-mix(in oklab, var(--color-moss) 35%, transparent) 0 6px, transparent 6px 12px)",
              }}
            />
            <motion.div
              className="absolute inset-x-0 top-0 bg-[var(--color-moss)]"
              style={{ height: verticalLineHeight }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[var(--color-moss)] shadow-[0_0_18px_4px_rgba(122,143,99,0.55)]"
              style={{ top: verticalLineHeight }}
            />
          </div>

          {PROCESS.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: EASE.outExpo }}
              className="relative"
            >
              <div className="absolute -left-16 top-0">
                <CircleNode
                  index={i}
                  total={PROCESS.length}
                  progress={verticalLineProgress}
                  iconId={step.iconId}
                />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/55">
                {step.number}
              </div>
              <h3 className="font-pack text-2xl uppercase text-[var(--color-ink)] mt-1">
                {step.title}
              </h3>
              <p className="font-body text-sm text-[var(--color-ink)]/75 mt-2 max-w-[28ch]">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * Circle node that "lights up" when the scroll-progress rail passes its
 * position on the timeline. Until the rail reaches it, it sits faded; once
 * passed, it switches to filled moss with a soft shadow.
 */
function CircleNode({
  index,
  total,
  progress,
  iconId,
}: {
  index: number;
  total: number;
  progress: import("framer-motion").MotionValue<number>;
  iconId: string;
}) {
  // Each circle's "active threshold" along the 0..1 progress.
  const threshold = total <= 1 ? 0 : index / (total - 1);
  // Smooth window around the threshold for the activation transition.
  const halfBand = 0.04;

  const fill = useTransform(
    progress,
    [Math.max(0, threshold - halfBand), threshold, 1],
    ["var(--color-bg)", "var(--color-moss)", "var(--color-moss)"]
  );
  const stroke = useTransform(
    progress,
    [0, threshold - halfBand, threshold],
    [
      "color-mix(in oklab, var(--color-moss) 30%, transparent)",
      "color-mix(in oklab, var(--color-moss) 30%, transparent)",
      "var(--color-moss)",
    ]
  );
  const iconColor = useTransform(
    progress,
    [0, threshold - halfBand, threshold],
    ["var(--color-moss)", "var(--color-moss)", "var(--color-bg)"]
  );
  const scale = useTransform(
    progress,
    [0, threshold - halfBand, threshold, threshold + halfBand],
    [1, 1, 1.08, 1]
  );
  const shadow = useTransform(
    progress,
    [threshold - halfBand, threshold],
    ["0 0 0 0 rgba(122,143,99,0)", "0 8px 22px -10px rgba(122,143,99,0.65)"]
  );

  return (
    <motion.div
      className="relative grid place-items-center w-14 h-14 rounded-full border z-[1]"
      style={{
        backgroundColor: fill,
        borderColor: stroke,
        scale,
        boxShadow: shadow,
        color: iconColor,
      }}
    >
      <svg viewBox="0 0 48 48" width="28" height="28" aria-hidden>
        {ICONS[iconId]}
      </svg>
    </motion.div>
  );
}
