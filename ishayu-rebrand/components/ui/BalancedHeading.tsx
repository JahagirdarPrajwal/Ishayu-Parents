"use client";

import * as React from "react";
import Balancer from "react-wrap-balancer";
import { cn } from "@/lib/cn";

type Props = {
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  children: React.ReactNode;
};

export function BalancedHeading({ as: Tag = "h2", className, children }: Props) {
  return (
    <Tag className={cn("font-display", className)}>
      <Balancer>{children}</Balancer>
    </Tag>
  );
}
