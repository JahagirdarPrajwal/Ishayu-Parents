import Link from "next/link";
import { COPY } from "@/lib/voice";
import { FloralAsterisk } from "@/components/brand/FloralAsterisk";

export function CartEmpty({ onClose }: { onClose: () => void }) {
  return (
    <div className="grid place-items-center text-center gap-6 py-16">
      <div className="relative h-32 w-32 grid place-items-center">
        <svg viewBox="0 0 96 96" width="96" height="96" aria-hidden className="text-[var(--color-moss)]">
          <path
            d="M22 32h52l-6 50a6 6 0 0 1-6 5H34a6 6 0 0 1-6-5l-6-50Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M36 32V20a12 12 0 0 1 24 0v12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <FloralAsterisk size={14} className="absolute top-2 left-4 text-[var(--color-moss)]/70" />
        <FloralAsterisk size={10} className="absolute top-12 right-2 text-[var(--color-moss)]/50" />
        <FloralAsterisk size={12} className="absolute bottom-2 left-1 text-[var(--color-moss)]/60" />
      </div>
      <p className="font-display italic text-2xl text-[var(--color-ink)] max-w-[18ch]">
        {COPY.cart.empty}
      </p>
      <Link
        href="/#bars"
        onClick={onClose}
        data-cursor="link"
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)] underline-offset-4 hover:underline"
      >
        {COPY.cart.emptyCta} →
      </Link>
    </div>
  );
}
