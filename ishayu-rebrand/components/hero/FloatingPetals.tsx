"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * FloatingPetals — 12-18 SVG petals drifting diagonally on a long-loop
 * timeline (random rotation, scale, opacity, x-drift).
 *
 * On mobile (<768px) we render fewer petals and skip the gaussian blur.
 */

const PETAL_PATHS = [
  // Soft round petals (pink + cream)
  "M0 -22 C 12 -22, 18 -10, 16 0 C 14 10, 6 18, 0 22 C -6 18, -14 10, -16 0 C -18 -10, -12 -22, 0 -22 Z",
  "M-2 -20 C 10 -22, 20 -8, 16 4 C 12 14, 4 18, 0 22 C -4 18, -14 12, -16 0 C -18 -10, -10 -20, -2 -20 Z",
];

const COLORS = [
  "var(--color-petal)",
  "var(--color-butter)",
  "color-mix(in oklab, var(--color-petal) 70%, var(--color-bg))",
];

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function FloatingPetals() {
  const reduced = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (reduced) return;
    const root = ref.current;
    if (!root) return;
    const petals = root.querySelectorAll<SVGGElement>(".petal");
    petals.forEach((p, i) => {
      const dur = 14 + (i % 7) * 3;
      const delay = -((i * 1.7) % dur);
      const driftX = 60 + (i % 5) * 20;
      const rot = 80 + (i % 6) * 50;
      p.style.setProperty("--drift-x", `${driftX}px`);
      p.style.setProperty("--rot", `${rot}deg`);
      p.style.animation = `petal-drift ${dur}s linear ${delay}s infinite`;
      p.style.transformBox = "fill-box";
    });
  }, [reduced]);

  const desktopCount = 16;

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <style>{`
        @keyframes petal-drift {
          0%   { transform: translate3d(0, -120px, 0) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          50%  { transform: translate3d(calc(var(--drift-x) * 1), 50vh, 0) rotate(calc(var(--rot) * 0.5)); }
          90%  { opacity: 0.7; }
          100% { transform: translate3d(calc(var(--drift-x) * 2), 110vh, 0) rotate(var(--rot)); opacity: 0; }
        }
        @media (max-width: 767px) {
          .petal-mobile-hide { display: none; }
        }
      `}</style>

      <defs>
        <filter id="petal-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>

      {Array.from({ length: desktopCount }).map((_, i) => {
        const rng = mulberry32(13 + i * 17);
        const startX = rng() * 1440;
        const scale = 0.5 + rng() * 0.9;
        const color = COLORS[Math.floor(rng() * COLORS.length)];
        const path = PETAL_PATHS[Math.floor(rng() * PETAL_PATHS.length)];
        const isBack = i % 3 === 0;
        return (
          <g
            key={i}
            className={i > 5 ? "petal petal-mobile-hide" : "petal"}
            transform={`translate(${startX}, 0)`}
          >
            <g
              transform={`scale(${scale})`}
              filter={isBack ? "url(#petal-blur)" : undefined}
            >
              <path d={path} fill={color} />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
