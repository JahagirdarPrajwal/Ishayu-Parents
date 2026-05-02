"use client";

import { useState } from "react";
import { COPY } from "@/lib/voice";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticLink } from "@/components/ui/MagneticLink";

type State = "idle" | "submitting" | "success" | "already" | "invalid" | "failure";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setState("invalid");
      return;
    }
    setState("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.status === 409) setState("already");
      else if (res.ok) {
        setState("success");
        setEmail("");
      } else setState("failure");
    } catch {
      setState("failure");
    }
  };

  const message: Record<State, string> = {
    idle: COPY.newsletter.sub,
    submitting: COPY.newsletter.submitting,
    success: COPY.newsletter.success,
    already: COPY.newsletter.already,
    invalid: COPY.newsletter.invalid,
    failure: COPY.newsletter.failure,
  };

  return (
    <section
      data-bg="moss"
      aria-labelledby="newsletter-title"
      className="relative py-32 bg-[var(--color-moss)] text-[var(--color-bg)] overflow-hidden"
    >
      <div className="shell flex flex-col gap-8 max-w-3xl">
        <Reveal as="p" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-bg)]/65">
          {COPY.newsletter.kicker}
        </Reveal>
        <Reveal as="h2" mode="lines" className="font-display text-5xl md:text-7xl tracking-[-0.04em] text-[var(--color-bg)]">
          {COPY.newsletter.headline}
        </Reveal>

        <form onSubmit={onSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl" aria-describedby="newsletter-status">
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state !== "idle") setState("idle");
            }}
            placeholder={COPY.newsletter.placeholder}
            className="flex-1 bg-transparent border-b border-[var(--color-bg)]/40 focus:border-[var(--color-bg)] px-1 py-3 font-display text-xl text-[var(--color-bg)] placeholder:text-[var(--color-bg)]/40 outline-none transition"
          />
          <MagneticLink>
            <button
              type="submit"
              data-cursor="button"
              disabled={state === "submitting"}
              className="px-6 h-12 bg-[var(--color-bg)] text-[var(--color-ink)] font-mono text-[11px] uppercase tracking-[0.18em] rounded-full hover:bg-[var(--color-butter)] transition disabled:opacity-60"
            >
              {state === "submitting" ? COPY.newsletter.submitting : COPY.newsletter.cta}
            </button>
          </MagneticLink>
        </form>

        <p
          id="newsletter-status"
          role="status"
          aria-live="polite"
          className="font-mono text-[11px] tracking-wide text-[var(--color-bg)]/75"
        >
          {message[state]}
        </p>
      </div>
    </section>
  );
}
