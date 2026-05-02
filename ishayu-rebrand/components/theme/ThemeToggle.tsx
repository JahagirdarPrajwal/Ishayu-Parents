"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { COPY } from "@/lib/voice";
import { useMounted } from "@/lib/useMounted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDusk = mounted && resolvedTheme === "dusk";
  const next = isDusk ? "day" : "dusk";
  const label = isDusk ? COPY.nav.themeDay : COPY.nav.themeDusk;

  return (
    <button
      aria-label={`Switch to ${label} mode`}
      title={label}
      data-cursor="button"
      onClick={() => setTheme(next)}
      className="relative grid h-9 w-9 place-items-center rounded-full text-current opacity-80 hover:opacity-100 transition"
    >
      <motion.svg
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: isDusk ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {!isDusk ? (
          <>
            <circle cx={12} cy={12} r={4} />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" fill="currentColor" stroke="none" />
        )}
      </motion.svg>
    </button>
  );
}
