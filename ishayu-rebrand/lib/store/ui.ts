"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UiState = {
  audioOn: boolean;
  toggleAudio: () => void;

  bloomUnlocked: boolean;
  unlockBloom: () => void;

  cookieConsent: "unset" | "allowed" | "denied";
  setCookieConsent: (v: "allowed" | "denied") => void;

  preloaderShown: boolean;
  markPreloaderShown: () => void;
};

export const useUi = create<UiState>()(
  persist(
    (set) => ({
      audioOn: false,
      toggleAudio: () => set((s) => ({ audioOn: !s.audioOn })),

      bloomUnlocked: false,
      unlockBloom: () => set({ bloomUnlocked: true }),

      cookieConsent: "unset",
      setCookieConsent: (v) => set({ cookieConsent: v }),

      preloaderShown: false,
      markPreloaderShown: () => set({ preloaderShown: true }),
    }),
    {
      name: "ishayu-ui",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? sessionStorage : (undefined as unknown as Storage)
      ),
      partialize: (s) => ({
        audioOn: s.audioOn,
        bloomUnlocked: s.bloomUnlocked,
        cookieConsent: s.cookieConsent,
        preloaderShown: s.preloaderShown,
      }),
    }
  )
);
