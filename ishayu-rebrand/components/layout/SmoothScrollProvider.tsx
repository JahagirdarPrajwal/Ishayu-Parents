"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { ScrollSync } from "./ScrollSync";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    // autoRaf: false — Lenis is driven by GSAP's ticker via <ScrollSync /> so
    // pinned ScrollTrigger sections release cleanly instead of trapping scroll.
    <ReactLenis
      root
      options={{
        autoRaf: false,
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        syncTouch: false,
      }}
    >
      <ScrollSync />
      {children}
    </ReactLenis>
  );
}
