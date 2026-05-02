/**
 * lib/motion.ts — Shared easings + variants (per prompt §12).
 */

import type { Variants, Transition } from "framer-motion";

export const EASE = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOutSine: [0.45, 0.05, 0.55, 0.95] as const,
  outBack: [0.34, 1.56, 0.64, 1] as const,
  linear: "linear" as const,
};

export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: EASE.outExpo,
      delay: 0.08 * i,
    } as Transition,
  }),
};

export const revealLine: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i = 0) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: EASE.outExpo,
      delay: 0.06 * i,
    } as Transition,
  }),
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE.outExpo } },
};

export const stagger = (delayChildren = 0.05, staggerChildren = 0.06): Variants => ({
  hidden: {},
  show: {
    transition: { delayChildren, staggerChildren },
  },
});

export const inViewOnce = {
  initial: "hidden" as const,
  whileInView: "show" as const,
  viewport: { once: true, amount: 0.3 },
};
