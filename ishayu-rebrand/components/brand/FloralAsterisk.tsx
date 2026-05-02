/**
 * FloralAsterisk — the decorative connective motif (à la Blume*).
 *
 * Hand-drawn 6-petal floral asterisk in moss. Used:
 *   - inline next to the wordmark in the hero
 *   - between marquee items
 *   - as section dividers
 *   - as list bullets
 *   - as the FAQ open/close marker (rotates 90° when open)
 *   - as the loading "spinner"
 *
 * Signature, not identity. Do NOT merge with the leaf-i-dot.
 */

import { cn } from "@/lib/cn";

type Props = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  spin?: boolean;
};

export function FloralAsterisk({
  size = 32,
  className,
  spin = false,
  ...rest
}: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden
      className={cn(
        "inline-block text-[currentColor]",
        spin && "[animation:spin_5s_linear_infinite]",
        className
      )}
      {...rest}
    >
      <g fill="currentColor">
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse
            key={i}
            cx={32}
            cy={14}
            rx={5.4}
            ry={14}
            transform={`rotate(${i * 60} 32 32)`}
          />
        ))}
        <circle cx={32} cy={32} r={3.4} fill="var(--color-bg)" />
      </g>
    </svg>
  );
}
