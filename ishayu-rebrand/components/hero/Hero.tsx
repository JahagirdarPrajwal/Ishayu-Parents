"use client";

/**
 * Hero — "The Field"
 *
 * Background: a single editorial photograph of a lush green field with white
 * wildflowers — public/textures/hero-field.webp.
 *
 * Wordmark sits in CREAM over the green with a soft dark scrim behind it
 * for contrast — same visual language as the Blume reference (the wordmark
 * pops because the central area of grass is naturally darker beneath it).
 */

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { GrassField } from "./GrassField";
import { HeroEasterEgg } from "./HeroEasterEgg";
import { COPY } from "@/lib/voice";
import { EASE } from "@/lib/motion";

const LETTERS = ["i", "s", "h", "a", "y", "u"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Hero-to-nav handoff: shrink and translate the giant wordmark into nav-left.
  const wordScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.08]);
  const wordY = useTransform(scrollYProgress, [0, 0.45], ["0vh", "-46vh"]);
  const wordX = useTransform(scrollYProgress, [0, 0.45], ["0vw", "-44vw"]);
  const wordOpacity = useTransform(scrollYProgress, [0.42, 0.5], [1, 0]);

  // Subtle Ken-Burns + parallax for the foreground grass overlay.
  const fieldY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.1]);
  const grassY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);

  return (
    <section
      ref={ref}
      data-bg="bg"
      aria-labelledby="hero-title"
      className="relative h-[100svh] min-h-[640px] overflow-hidden isolate"
    >
      {/* Editorial photograph — the field */}
      <motion.div
        aria-hidden
        style={{ y: fieldY, scale: fieldScale }}
        className="absolute inset-0 -z-20 will-change-transform"
      >
        <Image
          src="/textures/hero-field.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
        />
      </motion.div>

      {/* Dark scrim — darkens the field uniformly so cream text reads everywhere.
          Two layers: a top/bottom gradient + a centered vignette. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,24,15,0.55) 0%, rgba(20,24,15,0.20) 28%, rgba(20,24,15,0.20) 60%, rgba(20,24,15,0.55) 100%), radial-gradient(ellipse 75% 60% at 50% 52%, rgba(20,24,15,0.35) 0%, transparent 70%)",
        }}
      />

      {/* Foreground grass parallax — kept very subtle, just at the bottom edge */}
      <motion.div
        aria-hidden
        style={{ y: grassY }}
        className="absolute inset-x-0 bottom-0 h-[26%] -z-[1] opacity-50 mix-blend-multiply"
      >
        <GrassField className="absolute inset-0 w-full h-full" />
      </motion.div>

      {/* Tiny meta corners — cream over the dark scrim */}
      <div className="absolute top-24 left-0 right-0 z-30 px-[var(--gutter-x)] flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-bg)]/90">
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: EASE.outExpo }}
        >
          {COPY.hero.metaLeft}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: EASE.outExpo }}
        >
          {COPY.hero.metaRight}
        </motion.span>
      </div>

      {/* Wordmark — cream over the dark-scrimmed green.
          pb-[10vh] shifts the optical centre of the wordmark up by ~5vh so
          the descender of "y" doesn't graze the sub-line below it. */}
      <motion.div
        style={{ scale: wordScale, x: wordX, y: wordY, opacity: wordOpacity }}
        className="absolute inset-0 grid place-items-center z-20 pb-[10vh]"
      >
        <h1
          id="hero-title"
          className="relative font-display text-[var(--color-bg)] text-[28vw] sm:text-[26vw] md:text-[24vw] leading-[0.82] tracking-[-0.06em] flex items-baseline drop-shadow-[0_8px_28px_rgba(20,24,15,0.45)]"
          style={{
            fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 1',
            fontWeight: 600,
          }}
          aria-label="ishayu"
        >
          {LETTERS.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.06, duration: 1.2, ease: EASE.outExpo }}
              className="inline-block"
              aria-hidden
            >
              {ch}
            </motion.span>
          ))}
          {/* Asterisk hangs off the right edge — absolute so it doesn't shift "ishayu" off-center */}
          <HeroEasterEgg className="absolute top-[0.05em] left-full ml-[0.02em] focus-visible:outline-none" />
        </h1>
      </motion.div>

      {/* Sub-line — cream */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.9, ease: EASE.outExpo }}
        className="absolute bottom-28 inset-x-0 text-center font-display italic text-[var(--color-bg)] text-3xl md:text-5xl tracking-[-0.02em] z-20 drop-shadow-[0_2px_10px_rgba(20,24,15,0.55)]"
      >
        {COPY.brand.tagline}
      </motion.p>

      {/* Scroll cue — cream */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-6 inset-x-0 grid place-items-center z-20"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: EASE.inOutSine }}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-bg)]/90"
        >
          {COPY.hero.scroll}
        </motion.span>
      </motion.div>
    </section>
  );
}
