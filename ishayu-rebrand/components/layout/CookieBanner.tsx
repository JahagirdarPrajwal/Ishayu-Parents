"use client";

import { AnimatePresence, motion } from "framer-motion";
import { COPY } from "@/lib/voice";
import { useUi } from "@/lib/store/ui";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";
import { useMounted } from "@/lib/useMounted";

export function CookieBanner() {
  const consent = useUi((s) => s.cookieConsent);
  const setConsent = useUi((s) => s.setCookieConsent);
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {consent === "unset" && (
        <motion.div
          role="dialog"
          aria-label="Privacy notice"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE.outExpo }}
          className="fixed bottom-4 left-4 right-4 sm:right-auto z-[100] max-w-sm"
        >
          <div className="bg-[var(--color-bg-alt)] text-[var(--color-ink)] border border-[var(--color-ink)]/10 px-5 py-4 shadow-lg backdrop-blur-md">
            <p className="font-body text-sm leading-relaxed">{COPY.cookie.body}</p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" onClick={() => setConsent("allowed")}>
                {COPY.cookie.accept}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setConsent("denied")}
              >
                {COPY.cookie.deny}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
