/**
 * lib/schema.ts — JSON-LD generators (per prompt §13.1).
 */

import type { Bar } from "./products";
import { SHARED } from "./products";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ishayu-rebrand.vercel.app";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ishayu",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    sameAs: ["https://ishayu.in"],
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Plot No. 29, 4th Cross, Bommasandra Industrial Area, KIADB, Anekal",
      addressLocality: "Bengaluru",
      postalCode: "560099",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    parentOrganization: {
      "@type": "Organization",
      name: SHARED.manufacturer,
    },
    identifier: `FSSAI ${SHARED.fssai}`,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ishayu",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/bars/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function productSchema(bar: Bar) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: bar.name,
    image: [`${SITE_URL}${bar.images.front}`, `${SITE_URL}${bar.images.flat}`],
    description: bar.tagline,
    brand: { "@type": "Brand", name: "Ishayu" },
    category: bar.packType,
    weight: { "@type": "QuantitativeValue", value: bar.weightG, unitCode: "GRM" },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/bars/${bar.slug}`,
      priceCurrency: "INR",
      price: String(bar.priceINR),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: SHARED.manufacturer },
    },
  };
}
