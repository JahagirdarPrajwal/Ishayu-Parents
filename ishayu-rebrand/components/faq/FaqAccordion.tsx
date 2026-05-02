"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { FAQS } from "@/lib/faq";
import { COPY } from "@/lib/voice";
import { Reveal } from "@/components/ui/Reveal";
import { FloralAsterisk } from "@/components/brand/FloralAsterisk";
import Link from "next/link";

export function FaqAccordion({
  showHeader = true,
  limit,
}: {
  showHeader?: boolean;
  limit?: number;
}) {
  const items = limit ? FAQS.slice(0, limit) : FAQS;

  return (
    <section
      data-bg="bg"
      aria-labelledby="faq-title"
      className="relative py-24"
    >
      <div className="shell grid gap-12 md:grid-cols-12">
        {showHeader && (
          <header className="md:col-span-4 flex flex-col gap-4">
            <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-moss)]">
              {COPY.faq.kicker}
            </Reveal>
            <Reveal as="h2" mode="lines" className="font-display text-3xl md:text-5xl tracking-[-0.04em] text-[var(--color-ink)]">
              {COPY.faq.headline}
            </Reveal>
            <Link
              href="/faq"
              data-cursor="link"
              className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)] hover:text-[var(--color-moss)] transition"
            >
              {COPY.faq.cta}
            </Link>
          </header>
        )}

        <div className={showHeader ? "md:col-span-8" : "md:col-span-12"}>
          <Accordion.Root type="single" collapsible className="border-t border-[var(--color-ink)]/15">
            {items.map((q) => (
              <Accordion.Item
                key={q.id}
                value={q.id}
                className="border-b border-[var(--color-ink)]/15 group"
              >
                <Accordion.Header>
                  <Accordion.Trigger
                    data-cursor="button"
                    className="w-full py-6 flex items-center gap-6 text-left group focus-visible:outline-2 focus-visible:outline-[var(--color-moss)] focus-visible:outline-offset-4"
                  >
                    <FloralAsterisk
                      size={16}
                      className="text-[var(--color-moss)] transition-transform duration-500 group-data-[state=open]:rotate-90"
                    />
                    <span className="flex-1 font-display text-xl md:text-2xl tracking-[-0.03em] text-[var(--color-ink)]">
                      {q.q}
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content
                  className="overflow-hidden data-[state=open]:[animation:radix-accordion-down_320ms_cubic-bezier(0.16,1,0.3,1)] data-[state=closed]:[animation:radix-accordion-up_220ms_cubic-bezier(0.16,1,0.3,1)]"
                >
                  <p className="pb-6 pl-10 pr-4 font-body text-base text-[var(--color-ink)]/80 max-w-prose">
                    {q.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>

          <style>{`
            @keyframes radix-accordion-down {
              from { height: 0; opacity: 0; }
              to   { height: var(--radix-accordion-content-height); opacity: 1; }
            }
            @keyframes radix-accordion-up {
              from { height: var(--radix-accordion-content-height); opacity: 1; }
              to   { height: 0; opacity: 0; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

