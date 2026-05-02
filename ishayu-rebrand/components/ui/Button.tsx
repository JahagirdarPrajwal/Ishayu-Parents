"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const button = cva(
  "inline-flex items-center justify-center gap-2 font-mono uppercase tracking-[0.18em] text-[11px] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-[var(--color-moss)] focus-visible:outline-offset-4 disabled:opacity-60 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-ink)] text-[var(--color-bg)] hover:bg-[var(--color-moss)]",
        ghost:
          "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-ink)]/8",
        outline:
          "border border-[var(--color-ink)]/40 text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)]",
        bar: "text-[var(--color-bg)]",
        link: "underline-offset-4 hover:underline px-0 py-0 normal-case tracking-normal text-sm font-body",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-5",
        lg: "h-14 px-7 text-[12px]",
      },
      pill: { true: "rounded-full", false: "rounded-none" },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      pill: true,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean;
  /** Used for `variant="bar"` to receive that bar's signature dark token. */
  accent?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant, size, pill, asChild, accent, style, ...rest },
    ref
  ) {
    const Comp = asChild ? Slot : "button";
    const styleWithAccent =
      variant === "bar" && accent ? { ...style, backgroundColor: accent } : style;
    return (
      <Comp
        ref={ref}
        data-cursor="button"
        className={cn(button({ variant, size, pill }), className)}
        style={styleWithAccent}
        {...rest}
      />
    );
  }
);
