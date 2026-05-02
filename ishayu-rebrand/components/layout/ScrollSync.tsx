"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Bridges Lenis ↔ GSAP ScrollTrigger so pinned sections release cleanly and
 * scroll position never gets "trapped" inside a pin. Mounted once inside
 * <ReactLenis>. Without this bridge, Lenis advances frames on its own RAF and
 * ScrollTrigger only refreshes on `window.scroll` events that Lenis suppresses
 * — the result is the pin staying stuck after you've scrolled past it.
 */
export function ScrollSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tickerCb);
    };
  }, [lenis]);

  return null;
}
