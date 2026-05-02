/**
 * lib/sustainability.ts — Honest packaging note (per prompt §5.9).
 */

export const SUSTAINABILITY = {
  body:
    "Outer cartons are recyclable. The inner foil keeps the bar fresh for four months — we're trialling a compostable replacement. Small steps, honestly disclosed.",
  chips: ["Recyclable carton", "Compostable foil — in trial"] as const,
} as const;
