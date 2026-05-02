"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Tag = "div" | "p" | "h1" | "h2" | "h3" | "h4" | "span" | "blockquote" | "li";

type Props = React.PropsWithChildren<{
  className?: string;
  /** "lines" splits a string into words and stacks each in a mask. */
  mode?: "block" | "lines";
  delay?: number;
  amount?: number;
  as?: Tag;
}>;

const TAGS: Record<Tag, React.ComponentType<React.HTMLAttributes<HTMLElement>>> = {
  div: motion.div as never,
  p: motion.p as never,
  h1: motion.h1 as never,
  h2: motion.h2 as never,
  h3: motion.h3 as never,
  h4: motion.h4 as never,
  span: motion.span as never,
  blockquote: motion.blockquote as never,
  li: motion.li as never,
};

export function Reveal({
  children,
  className,
  mode = "block",
  delay = 0,
  amount = 0.4,
  as = "div",
}: Props) {
  if (mode === "lines" && typeof children === "string") {
    const words = children.split(/(\s+)/);
    const Tag = as as keyof React.JSX.IntrinsicElements;
    return React.createElement(
      Tag,
      { className: cn("relative", className) },
      words.map((w, i) =>
        /\s/.test(w) ? (
          <span key={i}>{w}</span>
        ) : (
          <span key={i} className="reveal-mask">
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, amount }}
              transition={{
                duration: 0.85,
                ease: EASE.outExpo,
                delay: delay + i * 0.04,
              }}
            >
              {w}
            </motion.span>
          </span>
        )
      )
    );
  }

  const MotionTag = TAGS[as];
  return (
    <MotionTag
      // @ts-expect-error - framer-motion's typed props on dynamic tags
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: EASE.outExpo, delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
