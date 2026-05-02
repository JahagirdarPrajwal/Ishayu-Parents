/**
 * lib/products.ts — Source of truth for the 5 protein/energy bars.
 *
 * EVERYTHING in this file comes from the official Ishayu product docs
 * supplied by the brand (`Product information ISHAYU Energy bars.docx` /
 * `Ishayu conent April.docx`) and the user's product photography in
 * assets/source-bars/. Do not invent fields.
 *
 * Per prompt §5 / §5.2 — fields stay `null` (rendered as "—") when the
 * real value isn't published yet. Never estimate.
 */

export type BarSlug =
  | "moringa"
  | "peanut-butter"
  | "cocoa"
  | "beet"
  | "ragi-millet";

export type PackType = "Energy Bar" | "Protein Bar" | "Millet Bar";

export type Nutrition = {
  energyKcal: number | null;
  proteinG: number | null;
  carbsG: number | null;
  sugarsG: number | null;
  fatG: number | null;
  saturatedFatG: number | null;
  transFatG: number | null;
  sodiumMg: number | null;
};

export type Bar = {
  slug: BarSlug;
  name: string;
  shortName: string;
  packType: PackType;
  ribbon: string;
  tagline: string;
  /** One-sentence summary used on cards + the description tab header. */
  description: string;
  /** Full product story used on the bar's detail page. From the brand's
   *  "Detailed Product Description" in the spec doc. */
  longDescription: string;
  /** Bullet-list of what sets this bar apart from a normal bar. From the
   *  brand's "What makes it different from normal bars" in the spec. */
  whatsDifferent: string[];
  /** Stock-keeping unit / item code from the brand. */
  sku: string;
  /** Pack dimensions L × B × H (cm). */
  dimensions: string;
  /** Pack colour, descriptive. */
  color: string;
  /** All bars are vegetarian. */
  vegetarian: boolean;
  priceINR: number;
  weightG: number;
  /** Nutrition micro-line shown on cards (e.g. "High protein · High fibre"). */
  proteinLine: string;
  ingredients: string[] | null;
  nutritionPer100g: Nutrition;
  signature: { light: string; dark: string };
  cssVar: { light: string; dark: string };
  images: {
    front: string;
    flat: string;
    lifestyle: string;
    back?: string;
  };
  alt: { front: string; flat: string; lifestyle: string; back?: string };
};

const empty: Nutrition = {
  energyKcal: null,
  proteinG: null,
  carbsG: null,
  sugarsG: null,
  fatG: null,
  saturatedFatG: null,
  transFatG: null,
  sodiumMg: null,
};

export const BARS: Bar[] = [
  {
    slug: "moringa",
    name: "Moringa Energy Bar",
    shortName: "Moringa",
    packType: "Energy Bar",
    ribbon: "SUPER FOOD",
    tagline:
      "Power up with Moringa magic and clean Nutrition — Green Energy, no nonsense.",
    description:
      "Powered by nature, packed with goodness — rich in antioxidants, fibre and essential nutrients.",
    longDescription:
      "Powered by Nature, Packed with Goodness. Made from natural ingredients, this energizing snack contains no preservatives or artificial colors. Rich in antioxidants, fibre, and essential nutrients. A perfect fusion of health and taste, made with natural ingredients to deliver pure nutrition with the added benefits of improved digestibility and sustained energy. Whether you need a quick breakfast, an on-the-go snack, or an energy boost during a busy day, this bar provides wholesome nutrition with zero fuss.",
    whatsDifferent: [
      "Free from refined sugar and artificial additives.",
      "Rich in antioxidants, fibre and essential nutrients.",
      "Moringa-led for a clean, plant-forward energy lift.",
    ],
    sku: "ISHEBMOR54G",
    dimensions: "9 × 4 × 1.5 cm",
    color: "Green",
    vegetarian: true,
    priceINR: 95,
    weightG: 54,
    proteinLine: "Protein source · High fibre",
    ingredients: [
      "Peanut butter",
      "Jaggery",
      "Mixed nuts (peanuts, cashews, almonds)",
      "Oat flour",
      "Moringa powder",
      "Milk powder",
      "Rolled oats",
      "Rice crispies",
      "Honey",
      "Fenugreek powder",
    ],
    nutritionPer100g: {
      ...empty,
      energyKcal: 521.87,
      proteinG: 14.22,
    },
    signature: { light: "#B7CE63", dark: "#3D5A2A" },
    cssVar: {
      light: "var(--color-bar-moringa-light)",
      dark: "var(--color-bar-moringa-dark)",
    },
    images: {
      front: "/bars-cutout/moringa/front.png",
      flat: "/bars-cutout/moringa/flat.png",
      lifestyle: "/bars/moringa/lifestyle-1.webp",
      back: "/bars-cutout/moringa/back.png",
    },
    alt: {
      front: "Ishayu Moringa Energy Bar pack, 54 g, 3/4 angle",
      flat: "Ishayu Moringa Energy Bar pack, 54 g, top-down view",
      lifestyle:
        "Ishayu Moringa Energy Bar on a wood log slice with moringa leaves and cashews",
      back: "Ishayu Moringa Energy Bar — back of pack",
    },
  },
  {
    slug: "peanut-butter",
    name: "Peanut Butter Energy Bar",
    shortName: "Peanut Butter",
    packType: "Energy Bar",
    ribbon: "FOR POWER ENERGY",
    tagline:
      "Fuel up with peanut butter, roasted Peanuts and natural goodness — pure energy, zero fuss.",
    description:
      "A wholesome, protein-source and high-fibre energy bar made with handpicked ingredients — perfect for workouts, midday snacking, or an instant energy boost.",
    longDescription:
      "Made from natural, high-quality ingredients, this Peanut Butter Energy Bar delivers a balanced combination of protein, fibre and healthy fats. It helps support heart health, sustained energy levels and healthy weight management. Made with nutrient-rich ingredients, it's an ideal snack for fitness enthusiasts, busy professionals, or anytime nutrition.",
    whatsDifferent: [
      "Free from refined sugar, artificial additives and colours.",
      "High in dietary fibre, rich in protein.",
      "Healthy fats that support heart health.",
    ],
    sku: "ISHEBPEA54G",
    dimensions: "9 × 4 × 1.5 cm",
    color: "Creamy white",
    vegetarian: true,
    priceINR: 85,
    weightG: 54,
    proteinLine: "Protein source · High fibre",
    ingredients: [
      "Peanut butter",
      "Jaggery",
      "Mixed nuts (peanuts, cashews, almonds)",
      "Oat flour",
      "Milk powder",
      "Rolled oats",
      "Rice crispies",
      "Honey",
      "Fenugreek powder",
    ],
    nutritionPer100g: {
      ...empty,
      energyKcal: 550.49,
      proteinG: 13.05,
    },
    signature: { light: "#E2C492", dark: "#B98A4F" },
    cssVar: {
      light: "var(--color-bar-peanut-light)",
      dark: "var(--color-bar-peanut-dark)",
    },
    images: {
      front: "/bars-cutout/peanut-butter/front.png",
      flat: "/bars-cutout/peanut-butter/flat.png",
      lifestyle: "/bars/peanut-butter/lifestyle-1.webp",
      back: "/bars-cutout/peanut-butter/back.png",
    },
    alt: {
      front: "Ishayu Peanut Butter Energy Bar pack, 54 g, 3/4 angle",
      flat: "Ishayu Peanut Butter Energy Bar pack, 54 g, top-down view",
      lifestyle:
        "Ishayu Peanut Butter Energy Bar on a cream surface with cashews and almonds scattered around",
      back: "Ishayu Peanut Butter Energy Bar — back of pack",
    },
  },
  {
    slug: "cocoa",
    name: "Cocoa Protein Bar",
    shortName: "Cocoa",
    packType: "Protein Bar",
    ribbon: "SMART PROTEIN CHOICE",
    tagline:
      "Power-packed with whey protein, crunchy Nuts, and ragi goodness.",
    description:
      "A nutritious, protein-packed snack made with whey protein, sprouted ragi and crunchy nuts — perfect for on-the-go energy and daily wellness.",
    longDescription:
      "The Cocoa Protein Bar is made from natural ingredients, with no preservatives or artificial colors, offering a wholesome snack that may support heart health and help maintain a healthy weight. Power-packed with whey protein, crunchy nuts and the goodness of sprouted ragi, it delivers sustained energy, protein and fibre in every bite. A nutrient-rich snack anytime — pre/post workouts, quick energy boosts, or healthy snacking anytime.",
    whatsDifferent: [
      "Free from refined sugar, artificial additives and colours.",
      "Power-packed with whey protein for muscle support.",
      "Premium nuts and cocoa for a rich, satisfying taste.",
      "Modern fitness needs meet traditional wholesome ingredients.",
    ],
    sku: "ISHPBCOC54G",
    dimensions: "9 × 4 × 1.5 cm",
    color: "Dark brown",
    vegetarian: true,
    priceINR: 90,
    weightG: 54,
    proteinLine: "High protein · High fibre",
    ingredients: [
      "Peanut butter",
      "Mixed nuts (peanuts, almonds, cashews)",
      "Jaggery",
      "Whey protein",
      "Cocoa powder",
      "Sprouted ragi flour",
      "Honey",
    ],
    nutritionPer100g: {
      ...empty,
      energyKcal: 533.33,
      proteinG: 17.31,
    },
    signature: { light: "#B68A66", dark: "#3E2418" },
    cssVar: {
      light: "var(--color-bar-cocoa-light)",
      dark: "var(--color-bar-cocoa-dark)",
    },
    images: {
      front: "/bars-cutout/cocoa/front.png",
      flat: "/bars-cutout/cocoa/flat.png",
      lifestyle: "/bars/cocoa/lifestyle-1.webp",
      back: "/bars-cutout/cocoa/back.png",
    },
    alt: {
      front: "Ishayu Cocoa Protein Bar pack, 54 g, 3/4 angle",
      flat: "Ishayu Cocoa Protein Bar pack, 54 g, top-down view",
      lifestyle:
        "Ishayu Cocoa Protein Bar on a cream surface with chocolate squares, almonds and cashews",
      back: "Ishayu Cocoa Protein Bar — back of pack",
    },
  },
  {
    slug: "beet",
    name: "Beet Energy Bar",
    shortName: "Beet",
    packType: "Energy Bar",
    ribbon: "BEETROOT FOR BETTER HEALTH",
    tagline:
      "Boost up with Beetroot and crunchy Nuts — pure vitality, zero fuss.",
    description:
      "A wholesome, protein-source and high-fibre energy bar — rich in protein, healthy fats and fibre that may support heart health and healthy weight management.",
    longDescription:
      "Made from natural, high-quality ingredients, this Beet Energy Bar has no preservatives or artificial colors. It's rich in protein, healthy fats and fibre — and may support heart health and help maintain a healthy weight. Made with nutrient-rich ingredients, it's an ideal snack for fitness enthusiasts, busy professionals, or anytime nutrition.",
    whatsDifferent: [
      "Free from refined sugar, artificial additives and colours.",
      "High in dietary fibre, rich in protein.",
      "Healthy fats that support heart health.",
    ],
    sku: "ISHEBBEE54G",
    dimensions: "9 × 4 × 1.5 cm",
    color: "Maroon",
    vegetarian: true,
    priceINR: 90,
    weightG: 54,
    proteinLine: "Protein source · High fibre",
    ingredients: [
      "Peanut butter",
      "Jaggery",
      "Mixed nuts (peanuts, cashews, almonds)",
      "Beetroot powder",
      "Milk powder",
      "Oat flour",
      "Rolled oats",
      "Rice crispies",
      "Honey",
      "Fenugreek powder",
    ],
    nutritionPer100g: {
      ...empty,
      energyKcal: 523.75,
      proteinG: 10.47,
    },
    signature: { light: "#C49096", dark: "#6E1F26" },
    cssVar: {
      light: "var(--color-bar-beet-light)",
      dark: "var(--color-bar-beet-dark)",
    },
    images: {
      front: "/bars-cutout/beet/front.png",
      flat: "/bars-cutout/beet/flat.png",
      lifestyle: "/bars/beet/lifestyle-1.webp",
      back: "/bars-cutout/beet/back.png",
    },
    alt: {
      front: "Ishayu Beet Energy Bar pack, 54 g, 3/4 angle",
      flat: "Ishayu Beet Energy Bar pack, 54 g, top-down view",
      lifestyle:
        "Ishayu Beet Energy Bar with sliced beetroot, oats, almonds and cashews scattered around",
      back: "Ishayu Beet Energy Bar — back of pack",
    },
  },
  {
    slug: "ragi-millet",
    name: "Ragi Millet Bar",
    shortName: "Ragi Millet",
    packType: "Millet Bar",
    ribbon: "TOPPED WITH PUFFED RAGI",
    tagline:
      "Power up with sprouted Ragi and roasted Nuts — pure nutrition, zero fuss.",
    description:
      "A wholesome and nutritious snack made with sprouted ragi and protein-rich nuts — perfect for a quick energy boost anytime.",
    longDescription:
      "A perfect fusion of health and taste, made with natural ingredients to deliver pure nutrition with the added benefits of improved digestibility and sustained energy. It contains no preservatives or artificial colors — making it a smart choice that may support heart health and help maintain a healthy weight. Whether you need a quick breakfast, an on-the-go snack, or an energy boost during a busy day, this bar provides wholesome nutrition with zero fuss.",
    whatsDifferent: [
      "Free from refined sugar and artificial additives.",
      "Sprouted ragi for better nutrient absorption.",
      "Traditional grain meets modern lifestyle snack.",
    ],
    sku: "ISHEBRAG54G",
    dimensions: "9 × 4 × 1.5 cm",
    color: "Dark brown",
    vegetarian: true,
    priceINR: 80,
    weightG: 54,
    proteinLine: "Protein source · High fibre",
    ingredients: [
      "Peanut butter",
      "Mixed nuts (peanuts, cashews, almonds)",
      "Jaggery",
      "Sprouted ragi flour",
      "Cocoa powder",
      "Honey",
      "Puffed ragi",
    ],
    // kcal updated from doc (465.98 vs old 465.18); other detailed values
    // come from the live ishayu.in product page and stay until the brand
    // publishes a full lab panel for the rest of the bars.
    nutritionPer100g: {
      energyKcal: 465.98,
      proteinG: 12.56,
      carbsG: 64.21,
      sugarsG: 14.43,
      fatG: 17.62,
      saturatedFatG: 13.36,
      transFatG: 0.1,
      sodiumMg: 8.81,
    },
    signature: { light: "#C9A36F", dark: "#3A2A20" },
    cssVar: {
      light: "var(--color-bar-ragi-light)",
      dark: "var(--color-bar-ragi-dark)",
    },
    images: {
      front: "/bars-cutout/ragi-millet/front.png",
      flat: "/bars-cutout/ragi-millet/flat.png",
      lifestyle: "/bars/ragi-millet/lifestyle-1.webp",
      back: "/bars-cutout/ragi-millet/back.png",
    },
    alt: {
      front: "Ishayu Ragi Millet Bar pack, 54 g, 3/4 angle",
      flat: "Ishayu Ragi Millet Bar pack, 54 g, top-down view",
      lifestyle:
        "Ishayu Ragi Millet Bar with scattered red ragi grains, almonds and cashews",
      back: "Ishayu Ragi Millet Bar — back of pack with FSSAI license, ingredients and nutrition",
    },
  },
];

export const SHARED = {
  fssai: "11220302001071",
  iso: "ISO 9001:2015",
  haccp: "HACCP certified",
  manufacturer: "Vittarthaa Life Sciences Pvt. Ltd.",
  address:
    "Plot No. 29, 4th Cross, Bommasandra Industrial Area, KIADB, Anekal, Bangalore Urban — 560099, Karnataka, India.",
  storage: "Store in a cool, dry and hygienic place, away from humidity.",
  allergens: "Contains nuts, milk.",
  contact: {
    phoneOffice: "+91 80 35893150",
    phoneOfficeAlt: "+91 80 35893151",
    mobile: "+91 98458 12503",
    whatsapp: "+91 89519 86878",
    email: "reachus@ishayu.in",
  },
  certBadges: [
    { id: "no-refined-sugar", label: "No refined sugar" },
    { id: "no-artificial-flavours", label: "No artificial flavours" },
    { id: "no-preservatives", label: "No preservatives" },
  ],
  testimonials: [
    {
      name: "Nivedita",
      quote:
        "Thank you for gifting the protein bars. They look of high quality in form, taste and feel. I personally ate murunga — was surprised at the product finish, taste and texture.",
    },
    {
      name: "Surya Hegde",
      quote:
        "I'm loving Moringa Nutri Bar. The moringa content is impressive, and it's delicious. A convenient way to get my daily dose of nutrients.",
    },
    {
      name: "Madhavi",
      quote:
        "Glad to see peanut bars without sugar or glucose. Liked moringa — got a mild moringa flavour with a punch of spice which makes it very delicious.",
    },
    {
      name: "Vaishnavi",
      quote:
        "Amazing nutribars. Extremely healthy with multiple health benefits. Perfect as a snack. I absolutely love its taste.",
    },
  ],
} as const;

export function getBar(slug: string): Bar | undefined {
  return BARS.find((b) => b.slug === slug);
}

export function relatedBars(slug: string): Bar[] {
  return BARS.filter((b) => b.slug !== slug);
}

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const formatNutrition = (v: number | null, unit: string) =>
  v == null ? "—" : `${v}\u00A0${unit}`;
