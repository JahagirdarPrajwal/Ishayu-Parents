/**
 * lib/stockists.ts — Where to find Ishayu (per prompt §5.8).
 *
 * Real URLs only where known. Use `pending: true` for placeholders.
 */

export type Stockist = {
  id: string;
  name: string;
  blurb: string;
  href: string;
  pending?: boolean;
};

export const STOCKISTS: Stockist[] = [
  {
    id: "online",
    name: "Ishayu Online Store",
    blurb: "The full range, shipped across India.",
    href: "https://ishayu.in",
  },
  {
    id: "amazon",
    name: "Amazon India",
    blurb: "Fast delivery via Prime in most cities.",
    href: "https://www.amazon.in/s?k=ishayu",
    pending: true,
  },
  {
    id: "bengaluru",
    name: "Bengaluru — local stockists",
    blurb: "Select wellness stores. Drop us a line for the nearest one.",
    href: "/stockists#bengaluru",
    pending: true,
  },
];
