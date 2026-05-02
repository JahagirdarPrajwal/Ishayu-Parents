"use client";

import * as React from "react";
import { MotionConfig, useReducedMotion } from "framer-motion";

const Ctx = React.createContext({ reducedMotion: false });

export function useReducedMotionGate() {
  return React.useContext(Ctx);
}

export function ReducedMotionGate({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion() ?? false;
  return (
    <Ctx.Provider value={{ reducedMotion: reduced }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </Ctx.Provider>
  );
}
