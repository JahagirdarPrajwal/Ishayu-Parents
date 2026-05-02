"use client";

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  const subscribe = (cb: () => void) => {
    if (typeof window === "undefined") return () => {};
    const m = window.matchMedia(query);
    m.addEventListener("change", cb);
    return () => m.removeEventListener("change", cb);
  };
  const getClient = () =>
    typeof window !== "undefined" && window.matchMedia(query).matches;
  const getServer = () => false;
  return useSyncExternalStore(subscribe, getClient, getServer);
}
