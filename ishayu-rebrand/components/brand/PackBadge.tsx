/**
 * PackBadge — small white circular cert badge with a thin moss outline,
 * mirroring the three badges on every Ishayu pack.
 *
 *   no-refined-sugar     — sugar cube + slash
 *   no-artificial-flavours — test tube + slash + ISO ring
 *   no-preservatives     — flask + slash
 */

import { cn } from "@/lib/cn";

export type PackBadgeId =
  | "no-refined-sugar"
  | "no-artificial-flavours"
  | "no-preservatives";

type Props = {
  id: PackBadgeId;
  size?: number;
  className?: string;
  withLabel?: boolean;
};

const LABEL: Record<PackBadgeId, string> = {
  "no-refined-sugar": "No refined sugar",
  "no-artificial-flavours": "No artificial flavours",
  "no-preservatives": "No preservatives",
};

export function PackBadge({ id, size = 56, className, withLabel = false }: Props) {
  return (
    <span
      title={LABEL[id]}
      aria-label={LABEL[id]}
      className={cn(
        "inline-flex items-center gap-2 align-middle",
        className
      )}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        aria-hidden
        className="shrink-0"
      >
        <circle
          cx={32}
          cy={32}
          r={29}
          fill="var(--color-bg)"
          stroke="var(--color-moss)"
          strokeWidth={1.2}
        />
        {id === "no-refined-sugar" && <SugarCube />}
        {id === "no-artificial-flavours" && <Tube />}
        {id === "no-preservatives" && <Flask />}
        <Slash />
      </svg>
      {withLabel && (
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-ink)]/80">
          {LABEL[id]}
        </span>
      )}
    </span>
  );
}

function SugarCube() {
  return (
    <g
      fill="none"
      stroke="var(--color-ink)"
      strokeWidth={1.6}
      strokeLinejoin="round"
    >
      <rect x={20} y={22} width={24} height={20} rx={2} />
      <path d="M20 28h24" />
      <path d="M32 22v20" />
    </g>
  );
}

function Tube() {
  return (
    <g
      fill="none"
      stroke="var(--color-ink)"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M27 18v18a5 5 0 0 0 10 0V18" />
      <path d="M25 18h14" />
      <path d="M28 32h8" />
    </g>
  );
}

function Flask() {
  return (
    <g
      fill="none"
      stroke="var(--color-ink)"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M27 18v8l-7 16a3 3 0 0 0 2.7 4h18.6a3 3 0 0 0 2.7-4L37 26v-8" />
      <path d="M25 18h14" />
    </g>
  );
}

function Slash() {
  return (
    <line
      x1={14}
      y1={50}
      x2={50}
      y2={14}
      stroke="var(--color-terracotta)"
      strokeWidth={2.2}
      strokeLinecap="round"
    />
  );
}
