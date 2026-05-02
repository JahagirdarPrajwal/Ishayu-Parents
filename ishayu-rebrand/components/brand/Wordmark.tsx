/**
 * Wordmark — the official Ishayu mark.
 *
 * Lowercase "ishayu" set in Fraunces with a tiny green leaf as the
 * dot of the `i` (mirrors the script logo on the real packaging).
 *
 * The leaf-i-dot is identity. Do NOT merge with the floral asterisk.
 */

import { cn } from "@/lib/cn";

type Props = {
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  className?: string;
  asLink?: boolean;
  /** Render as <span> when used inside an <h1> on the hero. */
  as?: "span" | "h1";
};

const SIZE: Record<NonNullable<Props["size"]>, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-7xl",
  hero: "text-[18vw] sm:text-[16vw] md:text-[20vw] leading-[0.85]",
};

export function Wordmark({ size = "md", className, as: As = "span" }: Props) {
  return (
    <As
      aria-label="Ishayu"
      className={cn(
        "font-display inline-flex items-baseline gap-[0.04em] tracking-[-0.04em] text-[var(--color-ink)] select-none",
        SIZE[size],
        className
      )}
      style={{
        fontVariationSettings: '"opsz" 144, "SOFT" 50',
      }}
    >
      {/* "i" with the leaf-as-dot */}
      <span className="relative inline-block leading-none">
        <span aria-hidden className="block">
          ı
        </span>
        <LeafDot
          aria-hidden
          className="absolute -top-[0.78em] left-1/2 -translate-x-1/2 h-[0.36em] w-[0.36em] text-[var(--color-moss)]"
        />
      </span>
      <span aria-hidden className="leading-none">
        shayu
      </span>
    </As>
  );
}

function LeafDot(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3 21c0-7.5 5.5-13 13-13 1.4 0 2.7.2 4 .6-.4 1.3-.6 2.6-.6 4 0 7.5-5.5 13-13 13H3v-4.6Z"
        fill="currentColor"
      />
      <path
        d="M5.5 18.5C9 15 13 12.5 17.5 11"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
