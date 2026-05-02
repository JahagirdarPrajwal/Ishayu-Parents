/**
 * lib/process.ts — Farm-to-bar process (per prompt §5.6).
 */

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  iconId: "sourced" | "prepped" | "bound" | "pressed" | "sealed";
};

export const PROCESS: ProcessStep[] = [
  {
    number: "01",
    title: "Sourced",
    description: "Whole grains, nuts and jaggery from Indian farms.",
    iconId: "sourced",
  },
  {
    number: "02",
    title: "Prepped",
    description: "Roasted slow, never deep-fried. Zero refined oil.",
    iconId: "prepped",
  },
  {
    number: "03",
    title: "Bound",
    description: "Held together with honey and jaggery — no syrups, no glucose.",
    iconId: "bound",
  },
  {
    number: "04",
    title: "Pressed",
    description: "Hand-pressed into 54 g portions in a HACCP-certified kitchen.",
    iconId: "pressed",
  },
  {
    number: "05",
    title: "Sealed",
    description: "Foil-wrapped for shelf life, recyclable outer carton.",
    iconId: "sealed",
  },
];
