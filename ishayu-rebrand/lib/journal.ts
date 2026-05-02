/**
 * lib/journal.ts — 3 sample article cards (per prompt §5.10).
 *
 * Every dek explicitly says "(Sample article — coming soon)" so nobody
 * mistakes them for real published posts.
 */

export type Article = {
  slug: string;
  title: string;
  dek: string;
  readMin: number;
  kicker: string;
  pending: true;
};

export const JOURNAL: Article[] = [
  {
    slug: "why-no-refined-sugar",
    title: "Why we don't use refined sugar.",
    dek: "Jaggery, honey, and the math behind a clean energy curve. (Sample article — coming soon.)",
    readMin: 4,
    kicker: "Field notes",
    pending: true,
  },
  {
    slug: "moringa-in-october",
    title: "A field of moringa, in October.",
    dek: "Notes from a farm visit, near Mysuru. (Sample article — coming soon.)",
    readMin: 5,
    kicker: "Field notes",
    pending: true,
  },
  {
    slug: "fifty-four-grams",
    title: "The 54-gram question.",
    dek: "How we landed on the perfect bar size. (Sample article — coming soon.)",
    readMin: 3,
    kicker: "Field notes",
    pending: true,
  },
];

export const getArticle = (slug: string) =>
  JOURNAL.find((a) => a.slug === slug);
