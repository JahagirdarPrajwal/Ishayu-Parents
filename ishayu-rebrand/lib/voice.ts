/**
 * lib/voice.ts — Single source of truth for ALL UI strings.
 * No string literals in components. Read from COPY.* everywhere.
 *
 * Voice (per prompt §2.4): quietly confident, plain-spoken, naturalist.
 * Sentence case. No buzzwords. Nutrition figures only from §5.2.
 */

export const BUILT_BY = "your-name-here";

export const COPY = {
  brand: {
    name: "Ishayu",
    tagline: "Pure energy, zero fuss.",
    elevator:
      "Five bars. Real ingredients. Made by hand in Bengaluru — no refined sugar, no preservatives, no nonsense.",
    /** The brand's stated promise to the customer (from "Our Promise" in
     *  Ishayu conent April.docx). Surfaced in sustainability + about. */
    promise: [
      {
        title: "No preservatives",
        body: "Only fresh, natural ingredients — healthy and safe for daily snacking.",
      },
      {
        title: "No refined sugar",
        body: "Sweetened with jaggery and a little honey. Gluten-free. Zero oil.",
      },
      {
        title: "No artificial colours",
        body: "Free from synthetic colour. Vibrant from the ingredients themselves.",
      },
      {
        title: "All-natural ingredients",
        body: "Carefully chosen nuts, seeds and grains for the best taste and nutrition.",
      },
    ],
  },

  hero: {
    metaLeft: "Est. Bengaluru, IN",
    metaRight: "FSSAI 11220302001071",
    scroll: "(scroll)",
    bloomToast: "bloom unlocked",
  },

  nav: {
    bars: "Bars",
    story: "Story",
    process: "Process",
    journal: "Journal",
    stockists: "Stockists",
    faq: "FAQ",
    cart: "Cart",
    audioOn: "Wind on",
    audioOff: "Wind off",
    themeDay: "Day",
    themeDusk: "Dusk",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  marquee: [
    "No refined sugar",
    "Zero oil",
    "Gluten free",
    "Real ingredients",
    "Made in Bengaluru",
    "Hand-pressed",
    "FSSAI 11220302001071",
  ],

  founder: {
    kicker: "01 — Who made this",
    headline: "A small kitchen in Bommasandra, Bengaluru.",
    paragraph1:
      "Ishayu is made by Vittarthaa Life Sciences Pvt. Ltd., a family-run Indian wellness brand. We work out of an ISO 9001:2015 and HACCP certified facility on Plot No. 29, 4th Cross, Bommasandra Industrial Area.",
    paragraph2:
      "We started with one belief: a protein bar shouldn't be a chemistry experiment. Roast nuts slowly. Bind with jaggery and honey. Press by hand. Read every word on the back of the pack.",
    pullQuoteLabel: "Awaiting founder quote",
    pullQuote:
      "Our recipes start in a kitchen, not a lab.",
    captionImage: "Vittarthaa Life Sciences Pvt. Ltd. · est. Bengaluru",
    seeMore: "Read the full story",
  },

  process: {
    kicker: "02 — How it's made",
    headline: "Five steps. No shortcuts.",
  },

  story: {
    kicker: "03 — What grows here",
    headline: "Slow food, in a small bar.",
    body:
      "We don't chase the season's loudest superfood. We stay with what India already grows well — moringa, beetroot, ragi, peanuts, jaggery — and let the recipe do the talking. Every 54 g pack is a small argument for honest food.",
    pullQuote: "Honest food, in a small foil pack.",
  },

  showcase: {
    counter: (i: number, n: number) =>
      `${String(i).padStart(2, "0")} / ${String(n).padStart(2, "0")}`,
    addToBag: "Add to bag",
    viewBar: "See what's inside",
  },

  spotlight: {
    headline: "Designed to be eaten. Made to be felt.",
    sub: "Hover, drag, or just watch.",
  },

  ingredients: {
    kicker: "04 — Inside every bar",
    headline: "Things that grew in soil.",
    // Only the ingredients actually used across the five bars (per the brand's
    // Product Information doc). No filler entries.
    items: [
      { id: "peanut", name: "Peanut", note: "Roasted, never fried." },
      { id: "almond", name: "Almond", note: "Whole, hand-sorted." },
      { id: "cashew", name: "Cashew", note: "Half-cuts, never dust." },
      { id: "moringa", name: "Moringa", note: "India's quiet super-leaf." },
      { id: "ragi", name: "Ragi", note: "Sprouted finger millet." },
      { id: "cocoa", name: "Cocoa", note: "Pure, no refined sugar." },
      { id: "beet", name: "Beetroot", note: "Slow-dried for stamina." },
      { id: "jaggery", name: "Jaggery", note: "The only sweetener." },
      { id: "honey", name: "Honey", note: "For warmth, not sweetness." },
      { id: "fenugreek", name: "Fenugreek", note: "Bitter spark to balance." },
    ],
  },

  nutrition: {
    kicker: "05 — Read the back of the pack",
    headline: "Numbers we'll stand by.",
    note:
      "Values per 100 g. We publish what we measure. Where a value is pending real lab data we show — instead of guessing.",
    seeAll: "See all bars",
    cta: "Add to bag",
  },

  sustainability: {
    kicker: "06 — Honestly disclosed",
    headline: "Small steps. Stated plainly.",
    body:
      "Outer cartons are recyclable. The inner foil keeps the bar fresh for four months — we're trialling a compostable replacement. Small steps, honestly disclosed.",
    chips: ["Recyclable carton", "Compostable foil — in trial"],
  },

  stockistsTeaser: {
    kicker: "07 — Where to find us",
    headline: "In a few good places.",
    cta: "All stockists",
  },

  testimonials: {
    kicker: "08 — Said by people who eat them",
    headline: "Quiet praise.",
  },

  journal: {
    kicker: "09 — Field notes",
    headline: "What we're reading, growing, learning.",
    cta: "Read all field notes →",
    placeholderBanner: "Sample article — coming soon.",
    placeholderBody:
      "This is placeholder copy in the editorial layout we'd publish in. Replace with the real piece when it's written. Until then it stays here so the structure is reviewable.",
  },

  faq: {
    kicker: "10 — Honest questions",
    headline: "Things people actually ask.",
    cta: "More questions →",
  },

  newsletter: {
    kicker: "11 — Stay in the field",
    headline: "Grow with us.",
    sub: "One letter a month. No spam, ever.",
    placeholder: "your@email.com",
    cta: "Send me one a month",
    submitting: "Sending…",
    success: "We'll write soon. Welcome.",
    already: "You're already on the list.",
    invalid: "That email looks off — try again?",
    failure: "Couldn't send right now. Try in a minute.",
  },

  comingSoon: {
    kicker: "12 — Coming next",
    headline: "More from the kitchen.",
    pill: "Coming next",
    // The three real upcoming product lines from the brand's content brief.
    items: [
      {
        id: "nutribites",
        name: "Nutri Bites",
        note: "Naturally good. Powerfully nutritious.",
      },
      {
        id: "coatz",
        name: "Coatz",
        note: "Nuts coated in nature's finest herbs & spices.",
      },
      {
        id: "sprinkles",
        name: "Sprinkles",
        note: "Goodness you can sprinkle on.",
      },
    ],
  },

  cart: {
    open: "Open cart",
    close: "Close cart",
    empty: "Your bag is quiet. Add a bar.",
    emptyCta: "Browse the bars",
    addedToast: (name: string) => `Added — ${name}`,
    removedToast: (name: string) => `Removed — ${name}`,
    subtotal: "Subtotal",
    taxNote: "Taxes calculated at checkout.",
    cta: "Continue to checkout",
    demoModalTitle: "Demo only.",
    demoModalBody: "Checkout is disabled in this demo. The cart works, the bag doesn't ship.",
    demoModalCta: "Got it",
    qtyMinus: "Decrease quantity",
    qtyPlus: "Increase quantity",
    remove: "Remove",
  },

  notFound: {
    headline: "Nothing grows here yet.",
    sub: "404 — page not found.",
    cta: "← Back to the field",
  },

  cookie: {
    body:
      "We use a tiny pinch of analytics to see what's working. No third-party trackers.",
    accept: "Allowed",
    deny: "Not now",
  },

  footer: {
    columns: {
      shop: {
        title: "Shop",
        links: [
          { label: "All bars", href: "/#bars" },
          { label: "Moringa", href: "/bars/moringa" },
          { label: "Cocoa", href: "/bars/cocoa" },
          { label: "Peanut Butter", href: "/bars/peanut-butter" },
          { label: "Beet", href: "/bars/beet" },
          { label: "Ragi Millet", href: "/bars/ragi-millet" },
        ],
      },
      company: {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Process", href: "/#process" },
          { label: "Journal", href: "/journal" },
          { label: "Case study", href: "/case-study" },
        ],
      },
      contact: {
        title: "Contact",
        links: [
          { label: "Stockists", href: "/stockists" },
          { label: "FAQ", href: "/faq" },
          { label: "ishayu.in", href: "https://ishayu.in", external: true },
        ],
      },
    },
    legal:
      "© Ishayu — a demo concept site, not affiliated with the live ishayu.in store.",
    builtBy: (who: string) =>
      `Designed and built by ${who}. Not affiliated with Vittarthaa Life Sciences Pvt. Ltd.`,
    fssai: "FSSAI 11220302001071 · ISO 9001:2015 · HACCP certified facility",
    address:
      "Plot No. 29, 4th Cross, Bommasandra Industrial Area, KIADB, Anekal, Bangalore Urban — 560099, Karnataka, India.",
    contactKicker: "Talk to us",
    contactItems: [
      { label: "Office", value: "+91 80 35893150 / 51", href: "tel:+918035893150" },
      { label: "Mobile", value: "+91 98458 12503", href: "tel:+919845812503" },
      { label: "WhatsApp orders", value: "+91 89519 86878", href: "https://wa.me/918951986878" },
      { label: "Email", value: "reachus@ishayu.in", href: "mailto:reachus@ishayu.in" },
    ],
  },

  caseStudy: {
    title: "Ishayu — case study",
    sub: "How a small Bengaluru wellness brand became a quiet luxury demo.",
    sections: {
      brief: "The brief",
      reference: "The reference",
      audit: "The audit",
      system: "The system",
      pages: "The pages",
      build: "The build",
      next: "What's next",
    },
    referenceCaption: "Inspiration, not imitation.",
  },

  pendingFounder:
    "Awaiting founder quote — replace this string from lib/founder.ts.",
} as const;
