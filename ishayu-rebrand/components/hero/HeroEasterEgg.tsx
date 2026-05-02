"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useReducedMotion } from "framer-motion";
import { useUi } from "@/lib/store/ui";
import { COPY } from "@/lib/voice";
import { FloralAsterisk } from "@/components/brand/FloralAsterisk";

/**
 * HeroEasterEgg — press-and-hold the floral asterisk in the wordmark for
 * ≥ 1.5 s → it "blooms": scales up, splits into 6 floral asterisks that
 * drift across the screen.
 *
 * On subsequent visits a slightly different drift path is used (varied
 * by Date.now seed).
 */

const HOLD_MS = 1500;
const PETAL_COUNT = 6;

export function HeroEasterEgg({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const unlockBloom = useUi((s) => s.unlockBloom);
  const ref = useRef<HTMLButtonElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const holdTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (holdTimer.current) window.clearTimeout(holdTimer.current);
  }, []);

  const onPress = () => {
    if (reduced) return;
    holdTimer.current = window.setTimeout(() => {
      bloom();
    }, HOLD_MS);
  };
  const onRelease = () => {
    if (holdTimer.current) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const bloom = () => {
    unlockBloom();
    toast(COPY.hero.bloomToast);
    const el = burstRef.current;
    if (!el) return;
    const seed = Date.now() % 360;
    el.querySelectorAll<HTMLElement>(".bloom-petal").forEach((p, i) => {
      const angle = (seed + (360 / PETAL_COUNT) * i) * (Math.PI / 180);
      const dist = 30 + Math.random() * 50;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      p.style.setProperty("--tx", `${tx}vw`);
      p.style.setProperty("--ty", `${ty}vh`);
      p.style.setProperty("--rot", `${angle * 180}deg`);
      p.style.animation = "bloom-fly 3.6s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    });
    setTimeout(() => {
      el.querySelectorAll<HTMLElement>(".bloom-petal").forEach((p) => {
        p.style.animation = "";
      });
    }, 3700);
  };

  return (
    <>
      <style>{`
        @keyframes bloom-fly {
          0%   { transform: translate(0,0) rotate(0deg) scale(1); opacity: 1; }
          20%  { transform: translate(0,0) rotate(0deg) scale(2.4); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(1); opacity: 0; }
        }
      `}</style>
      <button
        ref={ref}
        type="button"
        aria-label="Floral asterisk — press and hold for a surprise"
        data-cursor="button"
        onPointerDown={onPress}
        onPointerUp={onRelease}
        onPointerLeave={onRelease}
        onPointerCancel={onRelease}
        onTouchStart={onPress}
        onTouchEnd={onRelease}
        className={className}
      >
        <FloralAsterisk
          size="0.32em"
          className="text-[var(--color-moss)] inline-block align-text-top translate-y-[0.2em]"
        />
      </button>

      <div
        ref={burstRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] grid place-items-center"
      >
        {Array.from({ length: PETAL_COUNT }).map((_, i) => (
          <FloralAsterisk
            key={i}
            size={36}
            className="bloom-petal absolute text-[var(--color-moss)] opacity-0"
          />
        ))}
      </div>
    </>
  );
}
