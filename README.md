# Ishayu — rebrand demo

A portfolio-grade rebrand pitch for **Ishayu** (Vittarthaa Life Sciences Pvt. Ltd.) — a Bengaluru wellness brand making protein and energy bars without refined sugar, oil, or preservatives.

The site is a single-page editorial story for the five bars currently in market — Moringa, Peanut Butter, Cocoa, Beet, and Ragi Millet — plus product detail routes, a journal, FAQ, stockists, and a case study.

> This is a **concept site**, not affiliated with the live `ishayu.in` store. All product copy, nutrition values, ingredient lists, certifications, and contact details come from the brand's own product information sheet (May 2026).

---

## Repository layout

```
ishayu/
├── ishayu-rebrand/          ← the Next.js 16 app (deploy this to Vercel)
│   ├── app/                 — App Router routes
│   ├── components/          — Brand, layout, section, and UI components
│   ├── lib/                 — Data, voice, schema, hooks
│   ├── public/              — Optimised, ready-to-ship assets
│   ├── assets/              — Source files (photos, audio, references)
│   └── scripts/             — Build helpers (image cutouts, audio prep, upscaling)
└── README.md                ← you are here
```

The app folder is self-contained. Everything outside `ishayu-rebrand/` is reference material.

---

## Local development

```bash
cd ishayu-rebrand
npm install
npm run dev
```

Then open <http://localhost:3000>.

A production build:

```bash
npm run build
npm start
```

---

## Deploy to Vercel

The app lives in a subfolder, so when you import this repo into Vercel:

1. Click **Add New → Project** and select `Ishayu-Parents`.
2. In **Configure Project**, set:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `ishayu-rebrand`
   - **Build Command:** `next build` (default)
   - **Output Directory:** `.next` (default)
3. Optional environment variable:
   - `NEXT_PUBLIC_SITE_URL` — your deployed URL (defaults to `https://ishayu-rebrand.vercel.app` for OG images and JSON-LD)
4. Hit **Deploy**.

That's it — no `vercel.json` needed. Subsequent pushes to `main` auto-deploy.

---

## What's in this build

- **Hero** with the brand wordmark over a hand-painted grass field, ambient audio toggle, day/dusk theme switch.
- **Founder** section featuring the parent brand (Vittarthaa Life Sciences) credit plate.
- **How it's made** — five-step scroll-driven progress timeline.
- **Five-bar showcase** — pinned horizontal carousel on desktop, vertical product grid on mobile.
- **Per-bar pages** at `/bars/[slug]` with description / ingredients / nutrition / reviews tabs, full SKU + dimensions + colour spec, and "what makes it different" callouts.
- **Editorial sections** — story, ingredients, nutrition (with status caption: "Spec sheet · 2 of 8 values published" for bars whose full lab panel is still pending), sustainability, stockists, testimonials, journal teasers, FAQ, newsletter, coming-soon (Nutri Bites, Coatz, Sprinkles).
- **Cart** drawer (UI only — no real checkout, demo).
- **/case-study** page documenting the build approach.
- Full SEO: per-route OG images, JSON-LD (Product, Organization, WebSite), sitemap, robots, manifest.

---

## Tech

- **Framework**: Next.js 16 (App Router, Turbopack, RSC)
- **Styling**: Tailwind CSS v4 (CSS-first `@theme`)
- **Animation**: Framer Motion + GSAP/ScrollTrigger
- **Smooth scroll**: Lenis (synced to GSAP via `ScrollSync`)
- **State**: Zustand (cart, audio, theme)
- **UI primitives**: Radix UI (Dialog, Tabs, Accordion), Vaul (Drawer)
- **Analytics**: Vercel Analytics + Speed Insights (cookie-gated)
- **Deployment**: Vercel

---

## Source assets policy

- Everything under `ishayu-rebrand/assets/` is local working material (lifestyle photos, attachments, the Vittarthaa logo, the original `blume-reference.webp` mood board).
- The 60-minute raw `ambient-source.mp3` (~191 MB) is **gitignored** — it's the input to `scripts/build_ambient_audio.py` which extracts the 60-second loop served at `public/audio/ambient.mp3` (704 KB).
- The brand's `.docx` copy decks are also gitignored; the extracted copy already lives in `lib/voice.ts` and `lib/products.ts`.

---

## Credits

Demo concept site by Prajwal Jahagirdar. Brand, product photography, recipes, and trademarks belong to **Vittarthaa Life Sciences Pvt. Ltd.** (FSSAI 11220302001071, ISO 9001:2015 + HACCP certified facility, Bengaluru).
