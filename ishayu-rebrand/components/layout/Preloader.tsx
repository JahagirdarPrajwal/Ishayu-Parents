"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { FloralAsterisk } from "@/components/brand/FloralAsterisk";
import { EASE } from "@/lib/motion";

const SESSION_KEY = "ishayu-preloader-shown";
const HARD_CAP_MS = 2500;
const TARGET_MS = 1600;

const subscribeNoop = () => () => {};
const seenServer = () => false;
const seenClient = () =>
  typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1";

function useAlreadySeen() {
  return useSyncExternalStore(subscribeNoop, seenClient, seenServer);
}

export function Preloader() {
  const alreadySeen = useAlreadySeen();
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (alreadySeen || done) return;

    const start = performance.now();
    let raf = 0;
    let killed = false;

    const tick = () => {
      const elapsed = performance.now() - start;
      const fontReady = "fonts" in document && document.fonts.status === "loaded";
      const progressMs = Math.min(elapsed, TARGET_MS);
      const baseline = (progressMs / TARGET_MS) * 100;
      setProgress(Math.min(100, fontReady ? Math.max(baseline, 80) : baseline));

      if (elapsed >= TARGET_MS && fontReady) return finish();
      if (elapsed >= HARD_CAP_MS) return finish();
      if (!killed) raf = requestAnimationFrame(tick);
    };

    const finish = () => {
      killed = true;
      cancelAnimationFrame(raf);
      sessionStorage.setItem(SESSION_KEY, "1");
      setProgress(100);
      window.setTimeout(() => setDone(true), reduced ? 80 : 320);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      killed = true;
      cancelAnimationFrame(raf);
    };
  }, [alreadySeen, done, reduced]);

  const show = !alreadySeen && !done;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 1 }}
          transition={{ duration: reduced ? 0.2 : 0.85, ease: EASE.outExpo }}
          className="fixed inset-0 z-[200] bg-[var(--color-bg)] grid place-items-center"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.svg
              width="240"
              height="120"
              viewBox="0 0 600 240"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-[var(--color-ink)]"
            >
              <motion.text
                x="300"
                y="150"
                textAnchor="middle"
                fontFamily="var(--font-fraunces), serif"
                fontWeight={500}
                fontSize="160"
                fill="currentColor"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
              >
                ishayu
              </motion.text>
              <motion.circle
                cx="98"
                cy="93"
                r="14"
                fill="var(--color-moss)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 320, damping: 14 }}
              />
            </motion.svg>

            <FloralAsterisk size={28} spin className="text-[var(--color-moss)]" />

            <div className="w-44 h-px bg-[var(--color-ink)]/15 overflow-hidden">
              <motion.div
                className="h-full bg-[var(--color-moss)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
