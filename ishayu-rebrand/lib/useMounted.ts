"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getServerSnapshot = () => false;
const getClientSnapshot = () => true;

/**
 * Returns `false` during SSR / before hydration, `true` once mounted on the
 * client. Replaces the `useState(false) + useEffect(setTrue)` pattern that
 * Next 16's `react-hooks/set-state-in-effect` lint rule flags.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
