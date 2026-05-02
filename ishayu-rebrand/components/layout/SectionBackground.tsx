"use client";

import { useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useMounted } from "@/lib/useMounted";

/**
 * SectionBackground — fixed full-viewport color that interpolates
 * between the active section's `data-bg` token as you scroll.
 *
 * Usage: each <section> sets `data-bg="moss"` (or any --color-* name).
 */

const TOKENS: Record<string, string> = {
  bg: "var(--color-bg)",
  "bg-alt": "var(--color-bg-alt)",
  ink: "var(--color-ink)",
  moss: "var(--color-moss)",
  sage: "var(--color-sage)",
  olive: "var(--color-olive)",
  butter: "var(--color-butter)",
  petal: "var(--color-petal)",
  terracotta: "var(--color-terracotta)",
  "bar-moringa-light": "var(--color-bar-moringa-light)",
  "bar-peanut-light": "var(--color-bar-peanut-light)",
  "bar-cocoa-light": "var(--color-bar-cocoa-light)",
  "bar-beet-light": "var(--color-bar-beet-light)",
  "bar-ragi-light": "var(--color-bar-ragi-light)",
};

export function SectionBackground() {
  const bg = useMotionValue<string>("var(--color-bg)");
  const hydrated = useMounted();

  useEffect(() => {
    if (!hydrated) return;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-bg]")
    );
    if (sections.length === 0) return;

    let current = "bg";
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const next = (e.target as HTMLElement).dataset.bg ?? "bg";
            if (next !== current) {
              current = next;
              const target = TOKENS[next] ?? "var(--color-bg)";
              animate(bg, target, { duration: 1.0, ease: EASE.inOutSine });
            }
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [bg, hydrated]);

  if (!hydrated) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ backgroundColor: bg }}
    />
  );
}
