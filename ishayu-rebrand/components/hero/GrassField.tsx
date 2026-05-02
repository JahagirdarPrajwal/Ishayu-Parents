"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * GrassField — three layered SVG layers of grass blades.
 * Each blade animated with a per-blade sine-wave delay so wind ripples
 * across the field. Uses CSS keyframes (GPU-cheap) instead of GSAP.
 *
 * Generation note: blade positions are deterministic via a tiny seedable
 * PRNG so SSR + hydration agree.
 */

type Layer = { count: number; color: string; height: [number, number]; opacity: number };

const LAYERS: Layer[] = [
  { count: 36, color: "var(--color-bar-moringa-dark)", height: [120, 200], opacity: 0.9 },
  { count: 60, color: "var(--color-moss)", height: [80, 150], opacity: 0.8 },
  { count: 90, color: "var(--color-sage)", height: [50, 100], opacity: 0.7 },
];

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function GrassField({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const root = ref.current;
    if (!root) return;
    const blades = root.querySelectorAll<SVGGElement>(".blade");
    blades.forEach((b, i) => {
      const dur = 4.5 + (i % 9) * 0.32;
      const delay = -((i * 0.13) % dur);
      b.style.animation = `grass-sway ${dur}s var(--ease-in-out-sine) ${delay}s infinite`;
      b.style.transformOrigin = "bottom center";
      b.style.transformBox = "fill-box";
    });
  }, [reduced]);

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 1440 480"
      preserveAspectRatio="none"
      className={className}
    >
      <style>{`
        @keyframes grass-sway {
          0%, 100% { transform: rotate(-1.6deg); }
          50%      { transform: rotate(2.2deg); }
        }
      `}</style>

      {LAYERS.map((layer, idx) => {
        const rng = mulberry32(7 + idx * 41);
        const baseY = 480 - idx * 60;
        return (
          <g key={idx} opacity={layer.opacity} fill={layer.color}>
            {Array.from({ length: layer.count }).map((_, i) => {
              const x = rng() * 1440;
              const h = layer.height[0] + rng() * (layer.height[1] - layer.height[0]);
              const w = 4 + rng() * 4;
              const skew = (rng() - 0.5) * 8;
              return (
                <g
                  key={i}
                  className="blade"
                  transform={`translate(${x}, ${baseY}) skewX(${skew})`}
                >
                  <path
                    d={`M 0 0 Q ${w * 0.6} ${-h * 0.5}, 0 ${-h} Q ${-w * 0.6} ${-h * 0.5}, 0 0 Z`}
                  />
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
