"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { Wordmark } from "@/components/brand/Wordmark";
import { FloralAsterisk } from "@/components/brand/FloralAsterisk";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AmbientAudioToggle } from "@/components/audio/AmbientAudioToggle";
import { CartButton } from "@/components/cart/CartButton";
import { COPY } from "@/lib/voice";

const LINKS = [
  { href: "/#bars", label: COPY.nav.bars },
  { href: "/#story", label: COPY.nav.story },
  { href: "/#process", label: COPY.nav.process },
  { href: "/journal", label: COPY.nav.journal },
  { href: "/stockists", label: COPY.nav.stockists },
  { href: "/faq", label: COPY.nav.faq },
];

export function Nav() {
  const [menu, setMenu] = useState(false);

  // — Hero-to-nav handoff: the small wordmark in the nav left only fades in
  //   AFTER the giant hero wordmark has docked.
  const { scrollY } = useScroll();
  const wordmarkOpacity = useTransform(scrollY, [80, 240], [0, 1]);
  const blur = useTransform(scrollY, [0, 200], ["blur(0px)", "blur(12px)"]);
  const bg = useTransform(
    scrollY,
    [0, 200],
    ["rgba(244, 239, 230, 0)", "rgba(244, 239, 230, 0.78)"]
  );
  // Link color tweens from cream (over hero) to forest ink (over scrolled cream nav)
  const linkColor = useTransform(
    scrollY,
    [0, 180],
    ["rgba(244, 239, 230, 0.92)", "rgba(31, 42, 27, 0.78)"]
  );
  const iconColor = useTransform(
    scrollY,
    [0, 180],
    ["rgba(244, 239, 230, 0.92)", "rgba(31, 42, 27, 0.78)"]
  );

  return (
    <motion.header
      style={{ backgroundColor: bg, backdropFilter: blur, color: iconColor }}
      className="fixed top-0 inset-x-0 z-[80] border-b border-transparent"
    >
      <div className="shell flex items-center justify-between h-16 sm:h-20">
        <motion.div style={{ opacity: wordmarkOpacity }} className="flex items-center gap-2">
          <Link href="/" data-cursor="link" aria-label="Ishayu — home" className="inline-flex items-center gap-1.5">
            <Wordmark size="sm" />
            <FloralAsterisk size={12} className="text-[var(--color-moss)]" />
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <motion.div key={l.href} style={{ color: linkColor }}>
              <Link
                href={l.href}
                data-cursor="link"
                className="font-mono text-[11px] uppercase tracking-[0.18em] hover:opacity-100 opacity-90 transition"
                style={{ color: "inherit" }}
              >
                {l.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <AmbientAudioToggle />
          <ThemeToggle />
          <span className="hidden sm:block">
            <CartButton />
          </span>

          <Dialog.Root open={menu} onOpenChange={setMenu}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                aria-label={COPY.nav.openMenu}
                className="md:hidden grid h-9 w-9 place-items-center"
                data-cursor="button"
              >
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
                  <line x1={4} y1={8} x2={20} y2={8} />
                  <line x1={4} y1={16} x2={20} y2={16} />
                </svg>
              </button>
            </Dialog.Trigger>
            <AnimatePresence>
              {menu && (
                <Dialog.Portal forceMount>
                  <Dialog.Overlay asChild>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[90] bg-[var(--color-ink)]/30 backdrop-blur-sm"
                    />
                  </Dialog.Overlay>
                  <Dialog.Content asChild>
                    <motion.aside
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100%" }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="fixed top-0 right-0 z-[91] h-dvh w-[88vw] max-w-sm bg-[var(--color-bg)] p-8 flex flex-col gap-8 border-l border-[var(--color-ink)]/10"
                    >
                      <Dialog.Title className="sr-only">Menu</Dialog.Title>
                      <div className="flex items-center justify-between">
                        <Wordmark size="md" />
                        <Dialog.Close
                          aria-label={COPY.nav.closeMenu}
                          className="h-9 w-9 grid place-items-center"
                          data-cursor="button"
                        >
                          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
                            <line x1={5} y1={5} x2={19} y2={19} />
                            <line x1={19} y1={5} x2={5} y2={19} />
                          </svg>
                        </Dialog.Close>
                      </div>
                      <ul className="font-display text-3xl tracking-[-0.04em] flex flex-col gap-4">
                        {LINKS.map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              data-cursor="link"
                              onClick={() => setMenu(false)}
                              className="text-[var(--color-ink)] hover:text-[var(--color-moss)] transition flex items-center gap-3"
                            >
                              <FloralAsterisk size={12} className="text-[var(--color-moss)]" />
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto">
                        <CartButton />
                      </div>
                    </motion.aside>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </div>
    </motion.header>
  );
}
