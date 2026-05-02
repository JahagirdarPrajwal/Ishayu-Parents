/**
 * lib/founder.ts — Founder / origin story (per prompt §5.5).
 *
 * Public-record facts only. No invented names, ages, or quotes.
 * If a real founder quote is supplied, replace `pullQuote` and remove the
 * `pending: true` flag (which renders the data-pending outline).
 */

export const FOUNDER = {
  brand: "Ishayu",
  legalEntity: "Vittarthaa Life Sciences Pvt. Ltd.",
  city: "Bengaluru",
  area: "Bommasandra Industrial Area",
  facility: "ISO 9001:2015 + HACCP certified facility",
  fssai: "11220302001071",
  productLines: ["Energy Bars", "Nutri Bites", "Coatz", "Sprinkles"],

  pending: true as boolean,
  pullQuote: "Our recipes start in a kitchen, not a lab.",
  pullQuoteAttribution: "— placeholder, awaiting founder quote",

  longForm: [
    "Ishayu is the protein- and energy-bar line from Vittarthaa Life Sciences Pvt. Ltd., a small Indian wellness brand based in Bengaluru.",
    "We work out of an ISO 9001:2015 and HACCP certified facility on Plot No. 29, 4th Cross, Bommasandra Industrial Area. Every pack is FSSAI-licensed (11220302001071) and made by people we know by name.",
    "What we sell is simple: bars made with whole grains, nuts and jaggery, sealed in foil so they keep for four months. What we don't sell is more interesting: refined sugar, glucose syrup, oil, preservatives or artificial flavour.",
    "We started with a kitchen and a single recipe. Today we ship five bars across India, with three more lines — Nutri Bites, Coatz and Sprinkles — coming next.",
  ],
} as const;
