"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useUi } from "@/lib/store/ui";
import { COPY } from "@/lib/voice";

/**
 * AmbientAudioToggle — gentle meadow wind + crickets, off by default.
 *
 * Loads /audio/ambient.mp3 (a 60 s segment we extracted from the user's
 * long YouTube rip via scripts/build_ambient_audio.py) and loops it
 * through the Web Audio API. Looping the *decoded* AudioBuffer is gapless
 * by design — there's no MP3 decoder priming click between iterations.
 *
 * - The AudioContext is only created on first toggle, so browser autoplay
 *   policies are respected.
 * - The buffer is fetched + decoded once; subsequent toggles just rewire
 *   gain envelopes.
 * - On scroll past the hero, the master gain fades to zero in proportion
 *   to scroll position.
 * - Reduced-motion users get no audio at all.
 */

const AUDIO_URL = "/audio/ambient.mp3";
const TARGET_GAIN = 0.3;
const FADE_IN_SEC = 1.2;
const FADE_OUT_SEC = 0.6;

type Engine = {
  ctx: AudioContext;
  master: GainNode;
  source: AudioBufferSourceNode | null;
  buffer: AudioBuffer;
};

let bufferPromise: Promise<AudioBuffer> | null = null;

async function loadBuffer(ctx: AudioContext): Promise<AudioBuffer> {
  if (!bufferPromise) {
    bufferPromise = (async () => {
      const res = await fetch(AUDIO_URL, { cache: "force-cache" });
      if (!res.ok) throw new Error(`audio fetch failed: ${res.status}`);
      const arr = await res.arrayBuffer();
      return await ctx.decodeAudioData(arr);
    })();
  }
  return bufferPromise;
}

async function startEngine(): Promise<Engine> {
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  const ctx = new Ctx();

  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  const buffer = await loadBuffer(ctx);

  return { ctx, master, source: null, buffer };
}

function attachSource(e: Engine) {
  // BufferSources are one-shot in Web Audio: every time we re-enable the
  // toggle we have to spin up a fresh AudioBufferSourceNode wired to the
  // same buffer + same gain chain.
  const src = e.ctx.createBufferSource();
  src.buffer = e.buffer;
  src.loop = true;
  src.connect(e.master);
  src.start();
  e.source = src;
}

function detachSource(e: Engine) {
  if (!e.source) return;
  try {
    e.source.stop();
    e.source.disconnect();
  } catch {
    // ignore — already stopped
  }
  e.source = null;
}

export function AmbientAudioToggle() {
  const audioOn = useUi((s) => s.audioOn);
  const toggle = useUi((s) => s.toggleAudio);
  const reduced = useReducedMotion();
  const engineRef = useRef<Engine | null>(null);
  const targetVolRef = useRef(TARGET_GAIN);
  const startingRef = useRef(false);

  // On / off + lazy engine boot
  useEffect(() => {
    if (reduced) return;

    if (audioOn) {
      const ensureAndPlay = async () => {
        if (!engineRef.current && !startingRef.current) {
          startingRef.current = true;
          try {
            engineRef.current = await startEngine();
          } catch (err) {
            console.warn("[ambient audio] failed to start", err);
            startingRef.current = false;
            return;
          }
          startingRef.current = false;
        }
        const e = engineRef.current;
        if (!e) return;
        if (e.ctx.state === "suspended") {
          try {
            await e.ctx.resume();
          } catch {}
        }
        if (!e.source) attachSource(e);
        const now = e.ctx.currentTime;
        e.master.gain.cancelScheduledValues(now);
        e.master.gain.setTargetAtTime(targetVolRef.current, now, FADE_IN_SEC / 3);
      };
      void ensureAndPlay();
    } else if (engineRef.current) {
      const e = engineRef.current;
      const now = e.ctx.currentTime;
      e.master.gain.cancelScheduledValues(now);
      e.master.gain.setTargetAtTime(0, now, FADE_OUT_SEC / 3);
      // Leave the source running for ~1 s so the fade-out completes, then
      // disconnect it. The buffer + AudioContext stay around so the next
      // toggle is instant.
      window.setTimeout(() => {
        if (engineRef.current && !useUi.getState().audioOn) {
          detachSource(engineRef.current);
        }
      }, FADE_OUT_SEC * 1000 + 200);
    }
  }, [audioOn, reduced]);

  // Tear down on unmount
  useEffect(() => {
    return () => {
      const e = engineRef.current;
      if (!e) return;
      try {
        detachSource(e);
        e.ctx.close();
      } catch {}
      engineRef.current = null;
    };
  }, []);

  // Fade out as you scroll past the hero
  useEffect(() => {
    if (!audioOn || reduced) return;
    const onScroll = () => {
      const ratio = Math.max(
        0,
        1 - window.scrollY / Math.max(window.innerHeight, 1)
      );
      const target = TARGET_GAIN * ratio;
      targetVolRef.current = target;
      const e = engineRef.current;
      if (!e) return;
      const now = e.ctx.currentTime;
      e.master.gain.setTargetAtTime(target, now, 0.25);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [audioOn, reduced]);

  if (reduced) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={audioOn ? COPY.nav.audioOff : COPY.nav.audioOn}
      aria-pressed={audioOn}
      title={audioOn ? COPY.nav.audioOff : COPY.nav.audioOn}
      data-cursor="button"
      className="grid h-9 w-9 place-items-center rounded-full text-current opacity-80 hover:opacity-100 transition"
    >
      <svg
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
      >
        <path d="M3 14a4 4 0 1 1 0-4M9 4a8 8 0 0 1 0 16M14 7a5 5 0 0 1 0 10" />
        {!audioOn && (
          <line x1={3} y1={3} x2={21} y2={21} stroke="var(--color-terracotta)" strokeWidth={1.6} />
        )}
      </svg>
    </button>
  );
}
