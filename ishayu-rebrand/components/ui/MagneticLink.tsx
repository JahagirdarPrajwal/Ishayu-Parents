"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = React.PropsWithChildren<{
  className?: string;
  strength?: number;
  /**
   * Tag used for the wrapper. Must be a non-interactive element — never
   * "button" — because the wrapped child is usually itself a button/link
   * and HTML forbids interactive nesting.
   */
  as?: "div" | "span";
}>;

export function MagneticLink({
  children,
  className,
  strength = 0.32,
  as = "div",
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    x.set(dx);
    y.set(dy);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = (as === "span" ? motion.span : motion.div) as typeof motion.div;

  return (
    <Tag
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </Tag>
  );
}
