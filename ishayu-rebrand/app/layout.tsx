import type { Metadata, Viewport } from "next";
import { Fraunces, Anton, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ViewTransitions } from "next-view-transitions";

import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { ReducedMotionGate } from "@/components/layout/ReducedMotionGate";
import { Cursor } from "@/components/ui/Cursor";
import { Preloader } from "@/components/layout/Preloader";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Toaster } from "sonner";

import "./globals.css";

// — Editorial display: Fraunces (variable, WONK axis enabled)
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
  preload: true,
});

// — Pack-style headline: Anton (bold condensed, mirrors the pack)
const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// — Body / UI: Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// — Micro-copy / mono: JetBrains Mono
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ishayu-rebrand.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ishayu — Real ingredients. Honest energy.",
    template: "%s — Ishayu",
  },
  description:
    "A demo brand refresh for Ishayu protein and energy bars. No refined sugar, zero oil, gluten-free. Made in Bengaluru.",
  applicationName: "Ishayu",
  authors: [{ name: "Ishayu" }],
  keywords: [
    "Ishayu",
    "protein bar",
    "energy bar",
    "moringa bar",
    "ragi millet bar",
    "Indian wellness brand",
    "Bengaluru",
    "no refined sugar",
    "gluten free protein bar",
  ],
  openGraph: {
    type: "website",
    siteName: "Ishayu",
    title: "Ishayu — Real ingredients. Honest energy.",
    description:
      "Five bars. Real ingredients. No refined sugar, no preservatives, no nonsense.",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4EFE6" },
    { media: "(prefers-color-scheme: dark)", color: "#14180F" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${fraunces.variable} ${anton.variable} ${inter.variable} ${jetbrains.variable}`}
      >
        <body className="font-body min-h-dvh">
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="day"
            themes={["day", "dusk"]}
            enableSystem={false}
            disableTransitionOnChange={false}
          >
            <ReducedMotionGate>
              <SmoothScrollProvider>
                <Preloader />
                <Cursor />
                {children}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    classNames: {
                      toast:
                        "!bg-[var(--color-bg-alt)] !text-[var(--color-ink)] !border !border-[color-mix(in_oklab,var(--color-moss)_25%,transparent)] !rounded-none !font-mono !text-xs",
                      title: "!font-mono",
                    },
                  }}
                />
                <CookieBanner />
              </SmoothScrollProvider>
            </ReducedMotionGate>
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  );
}
