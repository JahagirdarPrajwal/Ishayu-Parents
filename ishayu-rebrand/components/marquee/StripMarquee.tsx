"use client";

import { COPY } from "@/lib/voice";
import { FloralAsterisk } from "@/components/brand/FloralAsterisk";

export function StripMarquee() {
  const items = COPY.marquee;
  // Duplicate so the loop is seamless
  const track = [...items, ...items, ...items];

  return (
    <section
      data-bg="moss"
      aria-label="Brand promises"
      className="relative bg-[var(--color-moss)] text-[var(--color-bg)] py-6 overflow-hidden"
    >
      <div className="flex whitespace-nowrap will-change-transform [animation:marquee_36s_linear_infinite] hover:[animation-play-state:paused]">
        {track.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-8 px-8 font-display text-2xl md:text-4xl"
          >
            {t}
            <FloralAsterisk size={14} className="text-[var(--color-bg)]/70" />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
