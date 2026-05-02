"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/store/cart";
import { COPY } from "@/lib/voice";

export function CartButton() {
  const open = useCart((s) => s.setOpen);
  const lines = useCart((s) => s.lines);
  const count = lines.reduce((n, l) => n + l.qty, 0);

  return (
    <button
      type="button"
      onClick={() => open(true)}
      aria-label={`${COPY.nav.cart} (${count})`}
      data-cursor="button"
      className="relative flex items-center gap-2 px-3 h-9 rounded-full text-current opacity-90 hover:opacity-100 transition"
    >
      <svg
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 8h14l-1.5 11.2A2 2 0 0 1 15.5 21H8.5a2 2 0 0 1-2-1.8L5 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
        {COPY.nav.cart}
      </span>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 480, damping: 18 }}
            className="grid place-items-center min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--color-moss)] text-[var(--color-bg)] font-mono text-[11px]"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
