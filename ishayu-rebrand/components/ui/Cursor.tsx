"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorVariant =
  | "default"
  | "link"
  | "button"
  | "image"
  | "drag"
  | "disabled";

const subscribePointer = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  const m = window.matchMedia("(pointer: coarse)");
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const getPointerCoarse = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

function useFinePointer() {
  return useSyncExternalStore(
    subscribePointer,
    () => !getPointerCoarse(),
    () => false
  );
}

export function Cursor() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const enabled = useFinePointer();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 700, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    return () => document.documentElement.classList.remove("has-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>("[data-cursor]");
      const v = (interactive?.dataset.cursor as CursorVariant) ?? "default";
      setVariant(v);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  const SIZE = 12;
  const map: Record<CursorVariant, { scale: number; bg: string; label?: string }> = {
    default: { scale: 1, bg: "var(--color-moss)" },
    link: { scale: 2, bg: "var(--color-moss)", label: "→" },
    button: { scale: 3, bg: "var(--color-ink)" },
    image: { scale: 5, bg: "color-mix(in oklab, var(--color-moss) 70%, transparent)" },
    drag: { scale: 3, bg: "var(--color-moss)", label: "↔" },
    disabled: { scale: 1.2, bg: "var(--color-terracotta)", label: "✕" },
  };
  const v = map[variant];

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[120] mix-blend-difference"
      style={{
        x: sx,
        y: sy,
        width: SIZE,
        height: SIZE,
        translateX: -SIZE / 2,
        translateY: -SIZE / 2,
      }}
    >
      <motion.div
        animate={{ scale: v.scale }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
        className="rounded-full grid place-items-center"
        style={{
          width: SIZE,
          height: SIZE,
          backgroundColor: v.bg,
        }}
      >
        <AnimatePresence mode="wait">
          {v.label && (
            <motion.span
              key={v.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="font-mono text-[6px] uppercase tracking-tighter text-[var(--color-bg)] mix-blend-normal"
              style={{ transform: `scale(${1 / v.scale})` }}
            >
              {v.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
