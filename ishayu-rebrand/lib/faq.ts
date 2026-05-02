/**
 * lib/faq.ts — 8 honest questions (per prompt §5.7).
 */

export type Faq = {
  id: string;
  q: string;
  a: string;
};

export const FAQS: Faq[] = [
  {
    id: "shelf-life",
    q: "What is the shelf life?",
    a: "Best within 4 months of packing. Look for the Mfg. Date stamped on the back of the pack.",
  },
  {
    id: "gluten-free",
    q: "Are these gluten-free?",
    a: "The recipes use no wheat. We list every ingredient on the back of the pack — please read it before buying if you have an allergy.",
  },
  {
    id: "nuts",
    q: "Do they contain nuts?",
    a: "Yes. Every bar contains almonds, cashews, or peanuts. The pack is labelled 'Contains nuts'.",
  },
  {
    id: "vegetarian-vegan",
    q: "Vegetarian or vegan?",
    a: "Vegetarian. Cocoa Protein Bar contains whey and honey, so it isn't vegan. Other bars contain honey.",
  },
  {
    id: "refrigerate",
    q: "Do I need to refrigerate?",
    a: "No. Cool, dry, away from humidity is enough.",
  },
  {
    id: "made-where",
    q: "Where are they made?",
    a: "Bengaluru, in our ISO 9001:2015 and HACCP certified facility.",
  },
  {
    id: "real-ishayu",
    q: "How do I know it's real Ishayu?",
    a: "FSSAI Lic No. 11220302001071 is printed on every pack.",
  },
  {
    id: "ship-international",
    q: "Do you ship outside India?",
    a: "Currently India only. International — we're working on it.",
  },
];
