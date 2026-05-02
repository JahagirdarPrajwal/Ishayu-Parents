"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Strength of the contact shadow under the bar (0–1). Default 0.32. */
  shadowStrength?: number;
  /** Bottom offset of the contact shadow as % of container, relative to the
   *  default of 8%. Use to nudge the shadow when the pack isn't centered. */
  shadowYOffset?: number;
  /** Whether the pack should idle-bob. Set false to hold the pack still
   *  (e.g. inactive slides in the showcase). */
  idle?: boolean;
  /** Bob amplitude in px. Default 9. */
  bobAmplitude?: number;
  /** Bob duration in seconds. Default 4. */
  bobDuration?: number;
};

/**
 * LevitatingPack — wraps a transparent-PNG bar shot in a soft contact-shadow
 * ellipse + an idle bob, so the cut-out pack reads as floating above the
 * surface instead of pasted onto it. Used everywhere the bar appears on a
 * coloured background after we strip the studio white.
 *
 * Reduced-motion: idle bob is disabled, contact shadow stays static.
 */
export function LevitatingPack({
  src,
  alt,
  sizes,
  priority,
  className,
  shadowStrength = 0.32,
  shadowYOffset = 0,
  idle = true,
  bobAmplitude = 9,
  bobDuration = 4,
}: Props) {
  const reduced = useReducedMotion();
  const shouldBob = idle && !reduced;

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Contact shadow — sits below the pack and pulses in counter-phase to
          the bob so the bar reads as having weight. When the pack lifts, the
          shadow widens and softens. When it settles, the shadow tightens
          and darkens. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 will-change-transform"
        style={{
          bottom: `${8 + shadowYOffset}%`,
          width: "62%",
          height: "10%",
          background: `radial-gradient(ellipse at center, rgba(15, 25, 12, ${shadowStrength}) 0%, rgba(15, 25, 12, 0) 65%)`,
          filter: "blur(8px)",
        }}
        animate={
          shouldBob
            ? { scaleX: [1, 1.1, 1], scaleY: [1, 0.9, 1], opacity: [0.95, 0.62, 0.95] }
            : undefined
        }
        transition={
          shouldBob
            ? { duration: bobDuration, ease: "easeInOut", repeat: Infinity }
            : undefined
        }
      />

      {/* The pack — bobs vertically. */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        animate={shouldBob ? { y: [0, -bobAmplitude, 0] } : undefined}
        transition={
          shouldBob
            ? { duration: bobDuration, ease: "easeInOut", repeat: Infinity }
            : undefined
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain drop-shadow-[0_14px_22px_rgba(15,25,12,0.22)]"
        />
      </motion.div>
    </div>
  );
}
