"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Drawer } from "vaul";
import { useCart } from "@/lib/store/cart";
import { COPY } from "@/lib/voice";
import { formatINR } from "@/lib/products";
import { CartLineItem } from "./CartLineItem";
import { CartEmpty } from "./CartEmpty";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/brand/Wordmark";
import { useMediaQuery } from "@/lib/useMediaQuery";

export function CartDrawer() {
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);
  const lines = useCart((s) => s.lines);
  const subtotal = useCart((s) => s.subtotal());
  const [demoOpen, setDemoOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  // Mobile: use Vaul bottom sheet
  if (isMobile) {
    return (
      <>
        <Drawer.Root open={open} onOpenChange={setOpen}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-[100] bg-[var(--color-ink)]/40 backdrop-blur-sm" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[101] mt-24 flex h-[85vh] flex-col rounded-t-2xl bg-[var(--color-bg)] p-6">
              <Drawer.Title className="sr-only">Cart</Drawer.Title>
              <div
                aria-hidden
                className="mx-auto h-1.5 w-12 rounded-full bg-[var(--color-ink)]/15 mb-6"
              />
              <CartBody onClose={() => setOpen(false)} onCheckout={() => setDemoOpen(true)} subtotal={subtotal} hasItems={lines.length > 0} />
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
        <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
      </>
    );
  }

  // Desktop: side sheet
  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] bg-[var(--color-ink)]/40 backdrop-blur-sm"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.aside
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed top-0 right-0 z-[101] h-dvh w-full sm:w-[420px] bg-[var(--color-bg)] border-l border-[var(--color-ink)]/10 flex flex-col p-6 sm:p-8"
                >
                  <Dialog.Title className="sr-only">{COPY.nav.cart}</Dialog.Title>
                  <div className="flex items-center justify-between mb-6">
                    <Wordmark size="md" />
                    <Dialog.Close
                      aria-label={COPY.cart.close}
                      data-cursor="button"
                      className="grid h-9 w-9 place-items-center"
                    >
                      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                        <line x1={5} y1={5} x2={19} y2={19} />
                        <line x1={19} y1={5} x2={5} y2={19} />
                      </svg>
                    </Dialog.Close>
                  </div>
                  <CartBody onClose={() => setOpen(false)} onCheckout={() => setDemoOpen(true)} subtotal={subtotal} hasItems={lines.length > 0} />
                </motion.aside>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </>
  );
}

function CartBody({
  onClose,
  onCheckout,
  subtotal,
  hasItems,
}: {
  onClose: () => void;
  onCheckout: () => void;
  subtotal: number;
  hasItems: boolean;
}) {
  const lines = useCart((s) => s.lines);

  if (!hasItems) return <CartEmpty onClose={onClose} />;

  return (
    <>
      <ul className="flex-1 overflow-y-auto -mx-2 px-2">
        {lines.map((l) => (
          <CartLineItem key={l.slug} line={l} />
        ))}
      </ul>
      <div className="mt-6 pt-6 border-t border-[var(--color-ink)]/15 space-y-4">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)]/65">
            {COPY.cart.subtotal}
          </span>
          <span className="font-display text-2xl">{formatINR(subtotal)}</span>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)]/50">
          {COPY.cart.taxNote}
        </p>
        <Button onClick={onCheckout} size="lg" className="w-full">
          {COPY.cart.cta}
        </Button>
      </div>
    </>
  );
}

function DemoModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-[var(--color-ink)]/55 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-[90vw] max-w-md bg-[var(--color-bg)] p-8"
              >
                <Dialog.Title className="font-display text-3xl tracking-[-0.04em] text-[var(--color-ink)]">
                  {COPY.cart.demoModalTitle}
                </Dialog.Title>
                <Dialog.Description className="mt-3 font-body text-[var(--color-ink)]/80">
                  {COPY.cart.demoModalBody}
                </Dialog.Description>
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => onOpenChange(false)}>
                    {COPY.cart.demoModalCta}
                  </Button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
