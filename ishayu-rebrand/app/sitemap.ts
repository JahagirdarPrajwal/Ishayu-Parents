import type { MetadataRoute } from "next";
import { BARS } from "@/lib/products";
import { JOURNAL } from "@/lib/journal";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ishayu-rebrand.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/case-study`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/stockists`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];
  return [
    ...base,
    ...BARS.map((b) => ({
      url: `${SITE}/bars/${b.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...JOURNAL.map((a) => ({
      url: `${SITE}/journal/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
