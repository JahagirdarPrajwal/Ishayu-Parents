# ISHAYU — Protein/Energy Bar Demo Website (Brand Refresh, v3)

## Role
You are a senior creative front-end engineer + art director building a portfolio-grade demo site for a freelance pitch. The output should feel like an Awwwards Site of the Day candidate (Savor, David Protein, Yoy Natura, Forager, Blume*). Every section is intentional, animated, and considered — no stock Bootstrap landing page, no AI-slop boilerplate.

The North Star is the **Blume — Modern Floral Branding and Packaging** reference at `d:\ishayu\Blume _ Modern Floral Branding and Packaging.webp`. Match its mood: oversized editorial serif wordmark sitting on a lush green grass field, modern florals, quiet luxury, generous whitespace, painterly photography, a single floral asterisk used as a connective motif. **Do not copy. Translate.**

---

## 1. Project Context
- Real brand: **Ishayu®** by Vittarthaa Life Sciences Pvt. Ltd., Bengaluru. Live store: https://ishayu.in.
- Demo is a **rebrand pitch**, not a clone of the live site. Same content, completely new visual language.
- **Scope for this build:** 5 protein/energy bars + supporting brand pages. Other lines (sprinkles, seasoned nuts, nutribites) appear only as a "coming soon" strip.
- Repo lives at `d:\ishayu\ishayu-rebrand\` (sibling to existing `basicSite\`, `Moringa\`, `PeanutButter\`, `Cocoa\`, `Beetroot\`, `RagiMillet\`, `prompt.md`, and the Blume reference). Do not touch any of those.
- Final deliverable: a single Next.js app deployable to Vercel.

---

## 2. Visual Reference & Creative Direction
Mood = modern editorial florals + soft naturalism + quiet luxury packaging:
- **Hero:** oversized serif wordmark `ishayu*` over a lush green grass field with wildflowers blowing in the wind.
- **Color story:** sage / moss / olive greens, warm cream, soft butter-yellow, terracotta accent, deep forest for type. Avoid pure white and pure black. Each product moment swaps the accent to that bar's signature pack color.
- **Photography mood:** backlit, golden-hour, shallow depth of field, product half-buried in greenery and petals. Use the user's **real** product photos as authoritative; only generate atmospheric backgrounds (grass, petals, hero field, hand-drawn icons), never the bar itself.
- **Editorial typography:** display serif for brand voice + clean grotesk for body + a bold condensed sans that mirrors the actual pack typography.
- **Whitespace is a design element.** Default to more padding, larger type, fewer items per row.

### 2.1 Brand mark (important — get this right)
The real Ishayu logo is a handwritten script `ishayu®` where the dot of the **i** is a tiny green leaf/sprig (visible on every pack). v3 keeps that leaf-i-dot as the **official mark** AND introduces a **separate floral asterisk** as a decorative motif (à la Blume*). Both coexist — they are not the same glyph:

| Use | Mark |
|---|---|
| Official wordmark in the nav, footer, OG images, favicon | Lowercase `ishayu` set in script-feel Fraunces with the leaf-as-i-dot reproduced as a tiny SVG (`components/brand/Wordmark.tsx`) |
| Decorative asterisk used inline next to the wordmark in the hero, between marquee items, as section dividers, as list bullets, as the "loading" spinner | Hand-drawn 6-petal floral asterisk SVG in `var(--color-moss)` (`components/brand/FloralAsterisk.tsx`). Becomes the active motif of the whole site. |

The leaf-i-dot is identity. The floral asterisk is signature. Do not merge them.

### 2.2 Type system (three families, all free on Google Fonts)

| Role | Family | Notes |
|---|---|---|
| Editorial display (brand wordmark, hero, headlines, brand voice) | **Fraunces** (variable) | `WONK` axis on the hero word, weights 300–900, optical-size enabled. Closest free analogue to Editorial-New / Blume serif. |
| Product wordmark / pack-style headline | **Anton** *or* **Bebas Neue** | Bold, condensed, all-caps. Honors the typography that already exists on every Ishayu pack (`MORINGA / ENERGY BAR`). Use only for product names rendered large. |
| Body / UI | **Inter** via `next/font/google` | Tracking `-0.01em` body, `-0.04em` display. |
| Micro-copy / mono | **JetBrains Mono** | `01 / 05`, `FSSAI 11220302001071`, nutrition callouts, line numbers, footer fine print. |

### 2.3 Color tokens (define in Tailwind v4 `@theme`)

```css
/* — Day mode (default) — */
--color-bg:         #F4EFE6; /* warm cream */
--color-bg-alt:     #EAE3D2; /* deeper cream */
--color-ink:        #1F2A1B; /* near-black forest */
--color-moss:       #4A6A3A; /* primary brand green */
--color-sage:       #8AA174; /* soft green */
--color-olive:      #C7C58A; /* dusty olive */
--color-petal:      #F2C6C0; /* soft pink for floral motifs */

/* Per-bar signatures — taken from real pack photography */
--color-bar-moringa-light: #B7CE63;
--color-bar-moringa-dark:  #3D5A2A;
--color-bar-peanut-light:  #E2C492;
--color-bar-peanut-dark:   #B98A4F;
--color-bar-cocoa-light:   #B68A66;
--color-bar-cocoa-dark:    #3E2418;
--color-bar-beet-light:    #C49096;
--color-bar-beet-dark:     #6E1F26;
--color-bar-ragi-light:    #C9A36F;
--color-bar-ragi-dark:     #3A2A20;

/* — Dusk mode (auto via prefers-color-scheme: dark, plus a manual toggle) — */
[data-theme="dusk"] {
  --color-bg:     #14180F;   /* deep forest */
  --color-bg-alt: #1C2317;
  --color-ink:    #EFE7D4;   /* warm cream becomes type */
  --color-moss:   #8AA174;   /* sage promotes */
  --color-sage:   #B7CE63;
  --color-petal:  #C49096;
  /* bar signature colors stay the same — they're part of the product */
}
```

Each per-bar `*-light` is the soft fill, `*-dark` is the type/accent. AA contrast verified. Dusk mode is an opt-in flex, not a clone — it uses the same palette, inked-down.

### 2.4 Brand voice & tone (use this for ALL generated copy)
**Voice:** quietly confident, plain-spoken, naturalist. A friend who happens to know nutrition, not a gym bro and not a wellness guru.

**Tonal rules:**
1. Short sentences. Sentence-case (never SHOUTING CASE in body copy).
2. Lead with what the food *does*, not adjectives. ("12.56 g protein per 100 g" before "delicious").
3. No buzzwords: avoid "superfood", "clean", "guilt-free", "game-changer", "unlock". Allowed: *real, simple, slow, made by hand, grown nearby, honest*.
4. Hindi-English code-mix is allowed once per page max (e.g. *"Made with* asli *ingredients."*) — never forced.
5. Nutrition claims must come from §6.2 verbatim. Never invent numbers, never round. Use `—` if unknown.
6. CTA verbs: *Add to bag · Read the story · See what's inside · Send me one a month*. Never "Buy now", never "Shop".
7. Empty/error/success states are warm, not jokey. (See §11.)

---

## 3. Tech Stack (use exactly this)
- **Next.js 15** (App Router, TypeScript, RSC where possible, `'use client'` only where animation/three.js needs it).
- **Tailwind CSS v4** — CSS-first `@theme` config in `app/globals.css`, no `tailwind.config.js`.
- **Framer Motion 11+** — component motion, scroll-linked transforms, `AnimatePresence` for route transitions.
- **Lenis** (`lenis/react` `<ReactLenis root />` in root layout) with `autoRaf: true`, `duration: 1.2`, `easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`.
- **GSAP + ScrollTrigger** for the hero wind system, the pinned horizontal showcase, and the section color crossfades. Use `@gsap/react` `useGSAP`.
- **@react-three/fiber + @react-three/drei + @react-three/postprocessing** for the optional 3D spotlight. Lazy-load with `next/dynamic({ ssr: false })`. Static fallback for reduced-motion users.
- **shadcn/ui** primitives (Button, Sheet, Dialog, Tabs, Accordion, Drawer for mobile cart). Restyle to brand.
- **Magic UI / Aceternity UI** selectively, max 3 components total: marquee, animated beam, text reveal.
- **Zustand** for cart state + theme (day/dusk) + audio toggle.
- **next/image**, **next/font**, **sharp** for image optimization.
- **clsx + tailwind-merge** via a `cn()` helper.
- **next-themes** for the day/dusk toggle.
- **next-view-transitions** (or the native View Transitions API where Next 15 exposes it) for cinematic route transitions, falling back to Framer Motion `AnimatePresence` overlay swipes.
- **Vercel Analytics + Speed Insights** (`@vercel/analytics`, `@vercel/speed-insights`) — drop-in, free, no consent required for anonymized counts but still gate behind cookie consent (§9).
- **react-wrap-balancer** for headline line-balancing on display type.

---

## 4. Folder / File Structure (create exactly this)

```
app/
  layout.tsx                 // ReactLenis root, fonts, metadata, theme + audio + cursor providers
  page.tsx                   // Composes home sections
  globals.css                // Tailwind v4 @theme + base styles + custom keyframes
  loading.tsx                // Global loading UI (preloader)
  not-found.tsx              // Art-directed 404
  bars/
    [slug]/
      page.tsx               // Single product page (5 routes)
      loading.tsx            // Per-product skeleton
      opengraph-image.tsx    // Auto-generated OG card per bar
  case-study/
    page.tsx                 // The pitch / process page
  journal/
    page.tsx                 // Index of articles
    [slug]/page.tsx          // Single article
  faq/page.tsx
  stockists/page.tsx
  about/page.tsx             // Founder story page (linked from home Founder section)
  api/
    newsletter/route.ts      // Newsletter handler (logs to console for demo)
  sitemap.ts
  robots.ts
  opengraph-image.tsx        // Default OG card
components/
  brand/
    Wordmark.tsx             // ishayu with the leaf-i-dot SVG
    FloralAsterisk.tsx       // The decorative * motif
    PackBadge.tsx             // Re-creates the 3 cert badges from the pack
  hero/
    Hero.tsx
    GrassField.tsx
    FloatingPetals.tsx
    HeroEasterEgg.tsx        // Hold-to-bloom
  marquee/StripMarquee.tsx
  story/StorySection.tsx
  founder/FounderSection.tsx
  process/HowItsMade.tsx     // Farm-to-bar 5-step horizontal
  products/
    ProductGrid.tsx
    ProductCard.tsx
    ProductSpotlight3D.tsx
    HorizontalShowcase.tsx
  ingredients/IngredientsSection.tsx
  nutrition/NutritionTable.tsx
  sustainability/SustainabilitySection.tsx
  stockists/StockistsTeaser.tsx
  testimonials/TestimonialMarquee.tsx
  journal/JournalTeaser.tsx
  faq/FaqAccordion.tsx
  cta/Newsletter.tsx
  cta/ComingSoonStrip.tsx
  layout/
    Nav.tsx
    Footer.tsx
    SmoothScrollProvider.tsx
    ReducedMotionGate.tsx
    PageTransition.tsx       // AnimatePresence wrapper for route changes
    SectionBackground.tsx    // Drives the cross-section color crossfade
    Preloader.tsx
    CookieBanner.tsx
    BeforeAfterToggle.tsx    // Live ishayu.in vs new build
  cart/
    CartDrawer.tsx           // Desktop slide-over
    CartBottomSheet.tsx      // Mobile bottom sheet
    CartButton.tsx
    CartLineItem.tsx
    CartEmpty.tsx, CartAddedToast.tsx
  audio/AmbientAudioToggle.tsx
  theme/ThemeToggle.tsx
  ui/
    Button.tsx, Badge.tsx, Reveal.tsx, MagneticLink.tsx, Cursor.tsx, BalancedHeading.tsx
lib/
  products.ts                // Source of truth for the 5 bars
  faq.ts, stockists.ts, journal.ts, founder.ts, process.ts, voice.ts
  cn.ts, motion.ts, schema.ts
public/
  bars/<slug>/pack-front.webp pack-flat.webp lifestyle-1.webp ...
  textures/grass.svg, petal-1.svg ... petal-5.svg, hero-field.webp, noise.png, paper.webp
  audio/wind-loop.mp3
  icons/favicon.ico, icon.png, apple-icon.png, manifest.webmanifest
  share/instagram-<slug>.webp     // Generated share cards
```

---

## 5. Content (real data — do not invent)

Create `lib/products.ts` exporting an array of 5 bars. **Use the verbatim taglines, side-ribbon tags, and pack-type labels read from the real packaging.**

| slug          | name                     | pack type    | side ribbon tag            | real tagline (verbatim)                                                              | price (₹) | weight | nutrition footer line         | hero light                       | hero dark                       |
|---------------|--------------------------|--------------|----------------------------|--------------------------------------------------------------------------------------|-----------|--------|-------------------------------|-----------------------------------|----------------------------------|
| moringa       | Moringa Energy Bar       | Energy Bar   | SUPER FOOD                 | Power up with Moringa magic and clean Nutrition — Green Energy, no nonsense.         | 95        | 54g    | Protein source · High fiber   | `--color-bar-moringa-light`       | `--color-bar-moringa-dark`       |
| peanut-butter | Peanut Butter Energy Bar | Energy Bar   | FOR POWER ENERGY           | Fuel up with roasted Peanuts and natural goodness — pure energy, zero fuss.          | 85        | 54g    | Protein source · High fiber   | `--color-bar-peanut-light`        | `--color-bar-peanut-dark`        |
| cocoa         | Cocoa Protein Bar        | Protein Bar  | SMART PROTEIN CHOICE       | Power-packed with whey protein, crunchy Nuts, and ragi goodness.                     | 90        | 54g    | High protein · High fiber     | `--color-bar-cocoa-light`         | `--color-bar-cocoa-dark`         |
| beet          | Beet Energy Bar          | Energy Bar   | BEETROOT FOR BETTER HEALTH | Boost up with beetroot and crunchy Nuts — pure vitality, zero fuss.                  | 90        | 54g    | Protein source · High fiber   | `--color-bar-beet-light`          | `--color-bar-beet-dark`          |
| ragi-millet   | Ragi Millet Bar          | Millet Bar   | TOPPED WITH PUFFED RAGI    | Power up with sprouted Ragi and roasted Nuts — pure nutrition, zero fuss.            | 80        | 54g    | Protein source · High fiber   | `--color-bar-ragi-light`          | `--color-bar-ragi-dark`          |

### 5.1 Shared pack elements (reproduce as `<PackBadge>`)
Three white circular cert badges with thin moss outline and slashed iconography:
- **No refined sugar** (sugar-cube + slash)
- **No artificial flavours** (test-tube + slash, optional ISO ring)
- **No preservatives** (flask + slash)

Standard footer line below every product card:
> `Net Weight : 54g | <protein-line> | High fiber · No artificial flavour · No preservatives · Made in India`

### 5.2 Real ingredients & nutrition (from the back of pack)

| | per 100 g (Ragi Millet) |
|---|---|
| Energy | 465.18 kcal |
| Protein | 12.56 g |
| Carbohydrates | 64.21 g |
| Total sugars | 14.43 g |
| Total fat | 17.62 g |
| Saturated fat | 13.36 g |
| Trans fat | <0.1 g |
| Sodium | 8.81 mg |

Ragi Millet ingredient list (verbatim): *Peanut butter, Jaggery, Peanuts, Sprouted Ragi flour, Cocoa powder, Honey, Almonds, Cashews, Puffed Ragi.* Allergens: *Contains nuts.* Storage: *Store in a cool, dry and hygienic place, away from humidity.*

For **Peanut Butter**, use ishayu.in's published numbers: `550.49 kcal / 13.05 g protein per 100 g`. For the other three bars, fields stay `—` until real data is supplied. Do not estimate.

### 5.3 Legal / manufacturer (footer + every product page)
- **FSSAI Lic No.** `11220302001071`
- **ISO 9001:2015 & HACCP** certified facility
- **Mfd. and Mktd. by:** Vittarthaa Life Sciences Pvt. Ltd.
- **Address:** Plot No. 29, 4th Cross, Bommasandra Industrial Area, KIADB, Anekal, Bangalore Urban–560099, Karnataka, India.

### 5.4 Real testimonials (verbatim, from ishayu.in)
1. **Nivedita** — "...thank you for gifting the protein bars. they look of high quality in form, taste and feel. I personally ate murunga was surprised at the product finish, taste and texture..."
2. **Surya Hegde** — "I'm loving Moringa Nutri Bar! The moringa content is impressive, and it's delicious. It's a convenient way to get my daily dose of nutrients."
3. **Madhavi** — "Good product. Glad to see peanut bars without sugar or glucose. Liked moringa, got a mild moringa flavour with a punch of spice which makes it very delicious."
4. **Vaishnavi** — "Amazing nutribars! Extremely healthy with multiple health benefits. Perfect as a snack. I absolutely love its taste."

### 5.5 Founder / origin story (`lib/founder.ts`)
The brand is owned by **Vittarthaa Life Sciences Pvt. Ltd.**, Bengaluru. Public-record information only — do not fabricate names, ages, photos, or quotes. The Founder section copy must be written in the brand voice (§2.4) using only the verifiable facts:
- Indian wellness brand based in Bommasandra, Bengaluru.
- Bars made in an ISO 9001:2015 + HACCP certified facility.
- FSSAI-licensed manufacturer (`11220302001071`).
- Product range spans nuts, sprinkles, nutribites, and bars.

If a real founder quote is later supplied by the user, it slots into the section labelled `{{ founder_quote_pending }}`. Until then, render the section with a placeholder pull-quote in italic Fraunces:
> *"Our recipes start in a kitchen, not a lab. — placeholder, awaiting founder quote"*

…and a small `data-pending` outline so the user can spot what to replace.

### 5.6 How it's made — 5 steps (`lib/process.ts`)
A horizontal 5-step ribbon, each step with a hand-drawn icon + 1 line of copy:
1. **Sourced** — *Whole grains, nuts and jaggery from Indian farms.*
2. **Prepped** — *Roasted slow, never deep-fried. Zero refined oil.*
3. **Bound** — *Held together with honey and jaggery — no syrups, no glucose.*
4. **Pressed** — *Hand-pressed into 54 g portions in a HACCP-certified kitchen.*
5. **Sealed** — *Foil-wrapped for shelf life, recyclable outer carton.*

(Generic + verifiable. If user supplies a more accurate process later, replace the strings without redesigning the layout.)

### 5.7 FAQ (`lib/faq.ts`) — 8 questions, brand-voice answers, all verifiable
1. **What is the shelf life?** — *Best within 4 months of packing. Look for the Mfg. Date stamped on the back.*
2. **Are these gluten-free?** — *The recipes use no wheat. We list every ingredient on the back of the pack — please read it before buying if you have an allergy.*
3. **Do they contain nuts?** — *Yes. Every bar contains almonds, cashews, or peanuts. Pack labelled "Contains nuts".*
4. **Vegetarian or vegan?** — *Vegetarian. Cocoa Protein Bar contains whey and honey, so it isn't vegan. Other bars contain honey.*
5. **Refrigerate?** — *No. Cool, dry, away from humidity is enough.*
6. **Where are they made?** — *Bengaluru, in our ISO 9001:2015 and HACCP certified facility.*
7. **How do I know it's real Ishayu?** — *FSSAI Lic No. 11220302001071 is printed on every pack.*
8. **Do you ship outside India?** — *Currently India only. International — we're working on it.*

### 5.8 Stockists (`lib/stockists.ts`)
The live Ishayu store is at https://ishayu.in. Show three tiles: **Ishayu Online Store**, **Amazon India**, **Local stockists in Bengaluru**. Each tile has a "View →" link. Real URLs only where known; placeholders marked `{{ pending }}` otherwise.

### 5.9 Sustainability note (`lib/sustainability.ts`)
Single short editorial paragraph — facts only, taken from the recycle marks visible on the pack back:
> *Outer cartons are recyclable. The inner foil keeps the bar fresh for four months — we're trialling a compostable replacement. Small steps, honestly disclosed.*

### 5.10 Journal teaser (`lib/journal.ts`) — 3 dummy article cards
Title / dek / 4-min read. All three explicitly say "(Sample article — coming soon)" in the dek so nobody mistakes them for real published posts:
1. **Why we don't use refined sugar** — *Jaggery, honey, and the math behind a clean energy curve.*
2. **A field of moringa, in October** — *Notes from a farm visit, near Mysuru.*
3. **The 54-gram question** — *How we landed on the perfect bar size.*

---

## 6. Image Asset Pipeline (mandatory — do this first)

Real product photography lives in five folders at the workspace root. **Read the images directly with your image-reading tool** to choose the cleanest frames.

### 6.1 Source folders → expected outputs

| Source folder              | `pack-front.jpg` (3/4 angle) | `pack-flat.jpg` (top-down) | `lifestyle-1.jpg` (cinematic) | `pack-back.jpg` |
|----------------------------|-------------------------------|------------------------------|--------------------------------|-----------------|
| `d:\ishayu\Moringa\`       | yes                           | yes                          | wood-log + leaves shot         | optional        |
| `d:\ishayu\PeanutButter\`  | yes                           | yes                          | scattered nuts shot            | —               |
| `d:\ishayu\Cocoa\`         | yes                           | yes                          | chocolate + nuts shot          | —               |
| `d:\ishayu\Beetroot\`      | yes                           | yes                          | sliced beet + oats             | —               |
| `d:\ishayu\RagiMillet\`    | yes                           | yes                          | scattered ragi + nuts          | back-label shot |

### 6.2 Optimization rules
- For each chosen JPG, output **WebP @ q85** + **JPG @ q82** under `public/bars/<slug>/`.
- Max long edge: 1600 px lifestyle, 1200 px pack.
- Strip EXIF, never ship raw multi-MB originals.
- `next/image` everywhere. `priority` only on the above-fold hero on the product page.

### 6.3 Generation rules (only for atmosphere, never for bars)
- **Never regenerate the bar packaging** — real photos are authoritative for color/copy/badges.
- **You may generate** grass SVGs, flower SVGs, decorative ingredient line drawings (peanut, cocoa pod, beet, moringa leaf, ragi grain, flax, ginger), noise/paper textures, and **one** wide editorial hero field background (golden-hour, painterly, warm cream sky, tall grass, scattered tiny white wildflowers, 1920×1080) saved as `public/textures/hero-field.webp`. Comment the prompt at the top of `Hero.tsx` so it can be re-rendered.
- Verify generated output matches the brief; regenerate up to 2 more times before falling back to a CSS gradient.

### 6.4 Per-section image use (full map)

| Section                    | Image                                                                |
|----------------------------|----------------------------------------------------------------------|
| Hero                       | None — illustrated grass + petals + generated `hero-field.webp` only |
| Founder                    | Editorial b/w-tinted background image of a kitchen / hands. If unavailable, use a generated abstract (label `data-generated`). |
| How it's made              | 5 hand-drawn SVG icons                                               |
| Story (`What grows here`)  | `bars/moringa/lifestyle-1.jpg` (wood-log composition)                |
| Horizontal showcase        | Each slide: `bars/<slug>/pack-front.jpg`                             |
| 3D spotlight               | Texture: `bars/cocoa/pack-flat.jpg`. Static fallback: same image.    |
| Ingredients ribbon         | Generated SVG icons only                                             |
| Nutrition tabs             | Tab thumbnail: `bars/<slug>/pack-front.jpg` (256 px)                 |
| Sustainability             | Crop of `bars/ragi-millet/pack-back.jpg` showing the recycle mark    |
| Stockists                  | Vector logos only                                                    |
| Testimonials               | None                                                                 |
| Journal teaser             | Generated atmospheric crops, each labelled `data-generated`          |
| FAQ                        | None                                                                 |
| Coming soon                | None — color tiles only                                              |
| Product detail page        | Hero: `pack-front.jpg`. Gallery: `pack-flat.jpg` + `lifestyle-1.jpg` (+ `pack-back.jpg` for ragi). |
| Share cards (`/share/...`) | Auto-composited from `pack-flat.jpg` + `*-light` background          |

---

## 7. Page Composition (top to bottom on `/`)

### 7.1 Preloader — `Preloader.tsx`
- Cream full-screen overlay. Center: the script `ishayu` wordmark draws itself stroke-by-stroke (SVG `pathLength`) over `~1.2 s`, the leaf-i-dot pops in last with a small spring. The floral asterisk spins beside it as a "loading" mark.
- Below: a 1-px moss progress bar from 0 → 100% based on `document.fonts.ready` + key images decoded.
- On complete, overlay slides up revealing the hero. Total budget ≤ 1.6 s on a fast connection; auto-dismiss at 2.5 s no matter what.
- Skipped if the user has visited in the last 30 minutes (sessionStorage flag).
- `prefers-reduced-motion`: instant fade, 200 ms.

### 7.2 Sticky top nav — `Nav.tsx`
- Transparent over hero, fades to cream-with-blur on scroll.
- Left: small `ishayu*` mark (Wordmark + FloralAsterisk).
- Center: Bars · Story · Process · Journal · Stockists · FAQ.
- Right: Theme toggle (sun/moon), Audio toggle (§9.5), Cart button.
- Mobile: hamburger opens shadcn `Sheet` from the right with the same links in big serif type.

#### 7.2a Hero-to-nav handoff (signature move)
As the user scrolls past the hero, the giant centered `ishayu*` wordmark **shrinks and translates** into the nav-left wordmark slot. Implement with `useScroll` + `useTransform` mapping `scale 1 → 0.08`, `x` from center to nav-left, `y` from hero-center to nav-baseline, opacity of decorative leaf-i-dot pulses once on dock. The nav slot only renders the small wordmark *after* dock completes; before that it shows an empty spacer to avoid double-render.

### 7.3 Hero — "The Field" — `Hero.tsx`
- Full-viewport. Background: layered SVG grass (3 depth layers, parallax via `useScroll`/`useTransform` on `y`). Each blade is an SVG path; GSAP timeline + `transform-box: fill-box` + sine-wave per-blade delay so wind ripples across the field. Generated `hero-field.webp` sits behind everything as the soft golden-hour wash.
- Petals: 12–18 SVG petals on a long-loop GSAP timeline with randomized rotation/scale/opacity/`xPercent`. Studio Ghibli, not snowflakes. Apply a subtle `feGaussianBlur` SVG filter to the back-most petals for depth.
- Wordmark: centered Fraunces ~22vw, `ishayu` with a small superscript floral asterisk. On mount, each glyph fades + translates up + WONK axis interpolates `0 → 100` over 1.2 s, stagger 0.06 s.
- Sub-line: *"Pure energy, zero fuss."* italic Fraunces 1.5 rem.
- Tiny meta corners: top-left `Est. Bengaluru, IN`, top-right `FSSAI 11220302001071`. Mono.
- Scroll cue: "(scroll)" mono label that bobs.

#### 7.3a Easter egg — `HeroEasterEgg.tsx`
- Press-and-hold the floral asterisk in the wordmark for ≥ 1.5 s → the asterisk "blooms" (scale `1 → 2.4`, petals separate and drift across the screen on a one-shot GSAP timeline, dispersing as 6 individual `<FloralAsterisk>` instances). A tiny mono toast in the corner reads `bloom unlocked`. Stored in localStorage; on subsequent visits, holding it again triggers a slightly different drift path.
- Disabled under `prefers-reduced-motion`.

### 7.4 Marquee strip — `StripMarquee.tsx`
Full-bleed moss band, cream serif text scrolling endlessly. Items separated by the floral asterisk:
> No refined sugar  *  Zero oil  *  Gluten free  *  Real ingredients  *  Made in Bengaluru  *  …
Duplicated track + GSAP infinite `translateX`. Pauses on hover.

### 7.5 Founder section — `FounderSection.tsx`
- Two-column editorial. Left: stacked text — kicker `01 — Who made this`, headline in Fraunces (e.g. *"A small kitchen in Bommasandra, Bengaluru."*), 2 short paragraphs from §5.5, placeholder pull-quote.
- Right: tall image placeholder (b/w-tint generated kitchen scene), captioned with mono fine print *"Vittarthaa Life Sciences Pvt. Ltd. · est. Bengaluru"*.
- Reveal: line-by-line on scroll.
- Anchor: `#about` (the `/about` route deep-dives this same content with more space).

### 7.6 How it's made — `HowItsMade.tsx`
- Section kicker `02 — How it's made`, headline *"Five steps. No shortcuts."*
- A horizontal 5-step ribbon (§5.6). Each step: number (mono), hand-drawn icon, title (Anton/Bebas), one-line description (Inter).
- Connector line between steps animates as you scroll into view (drawn with `pathLength`).
- Mobile: vertical timeline with the same connector drawing top-to-bottom.

### 7.7 Story section — "What grows here" — `StorySection.tsx`
- Two-column. Left: `bars/moringa/lifestyle-1.jpg` cropped tall.
- Right: editorial paragraph in Fraunces with a drop-cap, pull-quote in the middle. `Reveal` with line-stagger.

### 7.8 Product showcase — pinned horizontal scroll — `HorizontalShowcase.tsx`
- 5 bars, horizontal row, pinned vertically. GSAP ScrollTrigger pin + horizontal `x` translate; width = `(5 * 100vw) - 100vw`.
- Each slide: background fades to that bar's `*-light`; giant condensed-sans product name in `*-dark` behind the pack; centered floating `pack-front.jpg` with subtle drop shadow + 3° tilt that levels as the slide enters; right column has the side-ribbon tag (mono), verbatim tagline (Fraunces italic), price `₹85` (Fraunces), magnetic `Add to bag` button in `*-dark`; bottom-left has the three `<PackBadge>` chips.
- Counter top-right: `01 / 05` (mono).
- Mobile fallback: vertical `ProductGrid` with snap-scroll, no pinning (§10).

### 7.9 3D spotlight — `ProductSpotlight3D.tsx`
- Single R3F canvas, lazy. Floating bar plane mapped with `bars/cocoa/pack-flat.jpg`. Slow rotation + bob + mouse-tilt. Scroll rotates 360°.
- Behind: soft radial gradient + animated noise (`feTurbulence`).
- Headline (Fraunces italic): *"Designed to be eaten. Made to be felt."*
- Reduced-motion / mobile: `next/image` of `pack-flat.jpg` with a slow CSS float-y.

### 7.10 Ingredients ribbon — `IngredientsSection.tsx`
- Horizontal ribbon of small SVG icons (peanut, cocoa pod, beet, moringa leaf, ragi grain, flax, ginger), single-line, sage stroke.
- Each icon idles with a subtle wobble/spin. On hover: enlarges and reveals name + benefit.

### 7.11 Nutrition + USP grid — `NutritionTable.tsx`
- Two columns. Left: nutrition table (Ragi Millet seeded from §5.2; switching tabs swaps data; unknown fields show `—`).
- Right: animated checklist of USPs that ticks in on scroll.
- shadcn `Tabs` to switch between the 5 bars without leaving the section. Each tab label has a 32 px thumbnail of `pack-front.jpg`.

### 7.12 Sustainability — `SustainabilitySection.tsx`
- Single editorial paragraph from §5.9 set large in Fraunces over a desaturated crop of `pack-back.jpg` showing the recycle mark.
- Two small mono labels: `recyclable carton` and `compostable foil — in trial`.

### 7.13 Stockists teaser — `StockistsTeaser.tsx`
- Three tiles (§5.8). Hover lifts. Click → `/stockists`.

### 7.14 Testimonials marquee — `TestimonialMarquee.tsx`
- Two stacked rows scrolling in opposite directions. Cream rounded panels, Fraunces quote, name in mono. Pause on hover. Use the 4 verbatim reviews from §5.4 + duplicate.

### 7.15 Journal teaser — `JournalTeaser.tsx`
- Three article cards from §5.10. Each: small generated atmospheric image (data-generated), kicker (`Field notes`), Fraunces title, mono dek, mono read-time.
- "Read all field notes →" link to `/journal`.

### 7.16 FAQ — `FaqAccordion.tsx`
- shadcn `Accordion`, restyled. Each question in Fraunces; answers in Inter from §5.7. Floral asterisk used as the open/close marker (rotates 90° when open).

### 7.17 Newsletter / CTA — `Newsletter.tsx`
- Full-bleed moss section. Big Fraunces headline *"Grow with us."*
- Email input + magnetic submit. Microcopy: *"One letter a month. No spam, ever."*
- States: idle / submitting / success / invalid / already-subscribed (§11).

### 7.18 Coming soon strip — `ComingSoonStrip.tsx`
- Three tiles: Sprinkles, Seasoned Nuts, Nutribites. Each with a "Coming next" pill. `whileHover` tilt.

### 7.19 Footer — `Footer.tsx`
- 4 columns: large wordmark on the left taking half the width, then Shop / Company / Contact stacks.
- Bottom row: full FSSAI license, ISO/HACCP badges, manufacturer address (§5.3), copyright, demo disclaimer *"A demo concept site, not affiliated with the live ishayu.in store."*, and a small `Made by <name>` credit (the freelancer's name configurable via `lib/voice.ts` constant `BUILT_BY`).
- Final flourish: a single floral asterisk centered below everything.

---

## 8. Special routes

### 8.1 Product detail — `app/bars/[slug]/page.tsx`
Hero with `*-light` background, large condensed-sans product name in `*-dark`, big `pack-front.jpg`, sticky right rail "Add to bag" with quantity stepper, side-ribbon tag in mono.
Tabs: Description / Ingredients / Nutrition / Reviews. Gallery: `pack-front.jpg`, `pack-flat.jpg`, `lifestyle-1.jpg` (+ `pack-back.jpg` for ragi). "You may also like" carousel of the other 4 bars.

### 8.2 About — `app/about/page.tsx`
Long-form version of the Founder section. Two scroll columns, image + text. Pulls from `lib/founder.ts`. Quotes flagged `data-pending` until real ones land.

### 8.3 Journal — `app/journal/page.tsx` + `[slug]`
Index = grid of the 3 sample cards from §5.10. Clicking any card opens an article page with a clear banner *"Sample article — coming soon"* and a 2-paragraph lorem-style placeholder so the layout is reviewable.

### 8.4 FAQ — `app/faq/page.tsx`
Full-page version of `FaqAccordion`, indexable for SEO, with anchor links per question.

### 8.5 Stockists — `app/stockists/page.tsx`
Three large tiles (Ishayu Online, Amazon India, Bengaluru local) + a small contact form at the bottom (`mailto:` for demo).

### 8.6 Case study — `app/case-study/page.tsx` (the pitch page)
This is the page the freelance client will actually decide on. Long scroll, magazine-layout. Sections:
1. **The brief** — 2 sentences on what the user asked for.
2. **The reference** — Blume image embedded with a respectful caption "*Inspiration, not imitation*".
3. **The audit** — `<BeforeAfterToggle />` showing a screenshot of live `ishayu.in` vs the new hero. Slider drag.
4. **The system** — color tokens, type pairings, motion easings rendered as live swatches/specimens.
5. **The pages** — gallery of every section with a one-line rationale.
6. **The build** — bullet list of the stack (§3) with one-line "why" per choice.
7. **What's next** — sprinkles, nuts, nutribites, internationalization.
8. Footer with `BUILT_BY`.

This route exists to win the gig. Treat it as the second-most-important page after the home hero.

### 8.7 404 — `app/not-found.tsx`
Art-directed. Single full-screen scene: a cream background with the floral asterisk drifting alone across an empty field. Headline (Fraunces italic): *"Nothing grows here yet."* Sub: mono "404 — page not found". CTA: `← Back to the field` (links to `/`).

### 8.8 Per-route loading — `app/loading.tsx` + `app/bars/[slug]/loading.tsx`
Skeleton states using moss-on-cream shimmer. Never a default Next spinner.

---

## 9. Choreography & global interactions

### 9.1 Page transitions — `PageTransition.tsx`
Wrap `{children}` in the root layout. On route change, AnimatePresence renders a moss curtain that wipes from bottom-left to top-right (`clip-path: polygon`), holds 200 ms, then wipes off-screen top-right to bottom-left. Total 700 ms. Underneath, the new route fades up with `y: 16 → 0`. If the `View Transitions API` is available, prefer it; the curtain is the fallback.

### 9.2 Section color crossfades — `SectionBackground.tsx`
A fixed full-viewport background div is driven by `useScroll` on `<main>`. Each section declares its own background token via a data attribute (e.g. `data-bg="moss"`). As you scroll past each section's midpoint, the fixed background interpolates between tokens with `easeInOutSine`. Sections themselves are transparent. This produces the cinematic cream → moss → bar-light feel without hard-cuts.

### 9.3 Cursor states — `Cursor.tsx`
A small custom cursor (moss circle, ink dot in center) with these states (driven by `data-cursor` on the hovered element):

| `data-cursor` value | Visual |
|---|---|
| default          | 8 px moss circle |
| link             | scales 1.6×, label "→" appears below |
| button           | scales 2.5×, becomes solid `*-dark` of current section |
| image            | scales 4×, becomes a translucent moss disc |
| drag             | becomes `↔` glyph; used on the horizontal showcase |
| 3d               | becomes `360°` glyph; used on the spotlight |
| disabled         | becomes a strike-through |

Hide on touch devices (`@media (pointer: coarse)`).

### 9.4 Cart drawer — `CartDrawer.tsx` (desktop) / `CartBottomSheet.tsx` (mobile)
States, all with copy in §11:
- **Empty:** illustrated bag with floral asterisks scattered around. Copy: *"Your bag is quiet. Add a bar."* CTA → home `#bars`.
- **Adding (toast):** When `Add to bag` is clicked, the bar's `pack-front.jpg` flies along an arc into the cart icon (Framer Motion `layoutId`). Cart icon badge bumps with a spring; ambient toast slides in: *"Added — {name}"*.
- **With items:** Each line item shows pack thumbnail, name (Fraunces), tagline (Inter), price, qty stepper, remove (✕). Subtotal in mono. CTA `Continue to checkout` is a magnetic button. Demo only — clicking it opens a friendly modal: *"Checkout is disabled in this demo."*
- **Clearing:** small fade.
- Mobile: `CartBottomSheet` uses shadcn `Drawer`, swipe-down dismiss, snap-points `[0.5, 1]`.

### 9.5 Ambient audio — `AmbientAudioToggle.tsx`
- Tiny sound icon in the nav. Off by default, never auto-plays.
- Plays a low-volume wind loop (`public/audio/wind-loop.mp3`, ≤ 200 KB, seamless 12 s loop). On the hero only — fades out as you scroll past the hero, fades back in if you return.
- State persisted in localStorage. Disabled if `prefers-reduced-motion: reduce`.
- Source the audio from a CC0 library (Pixabay / freesound.org) and credit it in `/case-study`.

### 9.6 Easter egg
Specified in §7.3a (hero asterisk hold-to-bloom). Discoverable but not advertised.

### 9.7 Day / Dusk theme — `ThemeToggle.tsx`
- Uses `next-themes` with `attribute="data-theme"` and values `day | dusk | system`. Default `system`.
- Toggle in nav: a sun icon morphing into a moon (single SVG `path` interpolation, GSAP).
- Tokens swap from §2.3. Bar signature colors do not change (they belong to the product).
- Test every section in dusk before declaring done.

---

## 10. Mobile-specific specs
- Custom cursor disabled.
- Cart uses bottom sheet (`CartBottomSheet`), swipe-down to dismiss, snap-points `[0.5, 1]`.
- Horizontal showcase becomes a vertical CSS scroll-snap list (`scroll-snap-type: y mandatory`); no GSAP pin.
- Touch targets ≥ 44 × 44 px (cert badges, qty steppers, nav links).
- Add-to-bag triggers a haptic blip via `navigator.vibrate(8)` (no-op on iOS, fine).
- Reduce petal count from ~16 → ~6 on `< 768 px` and skip the `feGaussianBlur` filter to keep the hero at 60 fps.
- Disable the 3D spotlight under `< 768 px` and just show the static `pack-flat.jpg`.
- Preloader: 800 ms cap on mobile.

---

## 11. Microcopy library — `lib/voice.ts`

```ts
export const BUILT_BY = "your-name-here"; // appears in footer + case study
export const COPY = {
  cart: {
    empty:        "Your bag is quiet. Add a bar.",
    addedToast:   (name: string) => `Added — ${name}`,
    removedToast: (name: string) => `Removed — ${name}`,
    subtotal:     "Subtotal",
    cta:          "Continue to checkout",
    demoModal:    "Checkout is disabled in this demo. The cart works, the bag doesn't ship.",
  },
  newsletter: {
    placeholder:  "your@email.com",
    cta:          "Send me one a month",
    submitting:   "Sending…",
    success:      "We'll write soon. Welcome.",
    already:      "You're already on the list.",
    invalid:      "That email looks off — try again?",
    failure:      "Couldn't send right now. Try in a minute.",
  },
  notFound: {
    headline:     "Nothing grows here yet.",
    sub:          "404 — page not found.",
    cta:          "← Back to the field",
  },
  cookie: {
    body:         "We use a tiny pinch of analytics to see what's working. No third-party trackers.",
    accept:       "Allowed",
    deny:         "Not now",
  },
  pendingFounder: 'Awaiting founder quote — replace this string from lib/founder.ts.',
};
```

All UI text reads from `COPY.*` — no string literals in components.

---

## 12. Motion system rules

Define 4 shared easings in `lib/motion.ts`:

| name           | curve                                | use                       |
|----------------|--------------------------------------|---------------------------|
| `easeOutExpo`  | `[0.16, 1, 0.3, 1]`                  | entrance reveals          |
| `easeInOutSine`| `[0.45, 0.05, 0.55, 0.95]`           | wind / loops / bg crossfades |
| `easeOutBack`  | `[0.34, 1.56, 0.64, 1]`              | buttons + magnetic        |
| `linear`       | `linear`                             | marquees                  |

- Default reveal: `opacity 0 → 1`, `y 24 → 0`, duration `0.9s`, `easeOutExpo`, stagger `0.08`.
- Every text block over 32 px: split into spans, reveal on scroll.
- Wrap the whole app in `<ReducedMotionGate>` — disables GSAP timelines, R3F, ambient audio, easter egg, and sets `MotionConfig reducedMotion="user"` if `prefers-reduced-motion: reduce`.

---

## 13. SEO + production hygiene

### 13.1 Structured data — `lib/schema.ts`
For each product detail page emit JSON-LD `Product` + `Offer` + `Brand`:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Cocoa Protein Bar",
  "image": ["https://.../bars/cocoa/pack-front.jpg"],
  "description": "Power-packed with whey protein, crunchy Nuts, and ragi goodness.",
  "brand": { "@type": "Brand", "name": "Ishayu" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "price": "90",
    "availability": "https://schema.org/InStock"
  }
}
```

Plus `WebSite` + `Organization` (with FSSAI + ISO + address from §5.3) on the home page.

### 13.2 OG images
- Default: `app/opengraph-image.tsx` — generated card with `ishayu*` wordmark, sub-line, hero-field gradient, 1200×630.
- Per product: `app/bars/[slug]/opengraph-image.tsx` — `pack-flat.jpg` on a fill of `*-light`, product name in `*-dark`, side-ribbon tag in mono. Generated at build via `next/og`.

### 13.3 Favicon set
- `app/icon.png` (32 + 192 + 512) → small floral asterisk in moss on cream.
- `app/apple-icon.png` (180×180) → same.
- `public/manifest.webmanifest` for PWA installability.

### 13.4 `app/sitemap.ts` + `app/robots.ts`
Standard App Router conventions. Include `/`, `/about`, `/case-study`, `/faq`, `/stockists`, `/journal`, all `/bars/[slug]`, all `/journal/[slug]`.

### 13.5 Cookie / consent — `CookieBanner.tsx`
Tiny bottom-left card on first visit with §11 copy. Two buttons: `Allowed` enables Vercel Analytics; `Not now` doesn't load it. Persisted in localStorage.

### 13.6 Analytics
`@vercel/analytics` + `@vercel/speed-insights` mounted in `layout.tsx`, gated behind cookie consent.

---

## 14. Performance & Accessibility (non-negotiable)
- LCP < 2.5 s on Vercel.
- Hero wordmark must be SSR (no FOUT).
- `next/font` `display: 'swap'`, `preload: true` for Fraunces, Anton/Bebas, Inter.
- Decorative SVGs `aria-hidden="true"`; product images get descriptive alts ("Ishayu Cocoa Protein Bar pack, 54 g").
- Body text on cream meets `4.5:1`. `*-dark` on `*-light` verified AA.
- Visible focus ring: `2px outline var(--color-moss)`, offset `4px`. Tab order matches reading order in every section.
- Semantics: `<main>`, `<nav>`, `<section aria-labelledby>` throughout. Live regions for cart toast (`role="status"`).
- Lighthouse target: Perf ≥ 90, A11y ≥ 95, Best Practices 100, SEO 100.
- Image budget: total bars ≤ 3 MB after WebP. Audio file ≤ 200 KB. Hero JS ≤ 120 KB.
- Audio toggle, easter egg, and 3D spotlight are all individually keyboard-operable.

---

## 15. Pitch extras

### 15.1 Share cards (`/public/share/instagram-<slug>.webp`)
At build time (a small `scripts/build-share-cards.ts` invoked by `prebuild`), composite each bar's `pack-flat.jpg` over a 1080×1350 fill of its `*-light`, with the product name in `*-dark` Anton/Bebas, the tagline below in Fraunces italic, and a small floral asterisk in the corner. Used in `/case-study` to prove the system extends beyond the URL.

### 15.2 `<BeforeAfterToggle />`
Slider component on `/case-study` (and optionally on `/`). Drag handle reveals two stacked screenshots: the live `ishayu.in` home (provide as `public/case-study/before.jpg`, manually captured by user) and your new hero (`public/case-study/after.jpg`).

### 15.3 `BUILT_BY` credit
Footer + bottom of `/case-study`: *"Designed and built by {BUILT_BY}. Not affiliated with Vittarthaa Life Sciences Pvt. Ltd."* Ensures the demo doubles as a portfolio piece.

---

## 16. Deliverable & Dev Workflow
1. Initialize at `d:\ishayu\ishayu-rebrand\` (sibling to `basicSite/`, the bar folders, the Blume reference, and `prompt.md`). Use `pnpm create next-app@latest ishayu-rebrand --ts --app --tailwind --eslint`.
2. Install:
   ```bash
   pnpm add framer-motion lenis gsap @gsap/react three @react-three/fiber @react-three/drei \
     @react-three/postprocessing zustand clsx tailwind-merge lucide-react sharp \
     next-themes next-view-transitions react-wrap-balancer \
     @vercel/analytics @vercel/speed-insights
   ```
3. shadcn:
   ```bash
   pnpm dlx shadcn@latest init
   pnpm dlx shadcn@latest add button sheet dialog tabs accordion input drawer toast
   ```
4. Run the image pipeline (§6) before writing any UI.
5. Implement `lib/voice.ts` early so all microcopy reads from one file.
6. Commit in conventional chunks (`feat: hero grass field`, `feat: case study route`, etc.).
7. Run `pnpm lint` and `pnpm build` before declaring done. Fix every warning. Run Lighthouse on the deployed Vercel URL.

---

## 17. Build Order (do not skip ahead)
1. Scaffold project, fonts (3 families), theme tokens (day + dusk), Lenis provider, ReducedMotionGate, layout, Nav (with theme toggle + audio toggle), Footer (with `BUILT_BY`).
2. `lib/voice.ts`, `lib/products.ts`, `lib/founder.ts`, `lib/process.ts`, `lib/faq.ts`, `lib/stockists.ts`, `lib/journal.ts`, `lib/sustainability.ts`, `lib/schema.ts`, `lib/motion.ts`.
3. Brand primitives: `Wordmark.tsx`, `FloralAsterisk.tsx`, `PackBadge.tsx`, `Cursor.tsx`, `Reveal.tsx`, `MagneticLink.tsx`, `BalancedHeading.tsx`.
4. Run image pipeline (§6). Verify every bar has its 4 outputs.
5. `Preloader.tsx` + `SectionBackground.tsx` + `PageTransition.tsx` (the global choreography spine).
6. Hero with grass + petals + wordmark + easter egg + ambient audio. Ship only when it feels Awwwards-worthy.
7. Hero-to-nav handoff (the wordmark dock).
8. Marquee strip + Founder + How it's made + Story.
9. ProductCard + ProductGrid (mobile fallback) + HorizontalShowcase (desktop pinned scroll).
10. 3D spotlight (lazy + static fallback). Skip if it can't hit 60 fps.
11. Ingredients ribbon, Nutrition tabs, Sustainability, Stockists teaser, Testimonials, Journal teaser, FAQ, Newsletter, Coming soon.
12. Cart system (`CartButton` + `CartDrawer` + `CartBottomSheet` + line items + all §9.4 states).
13. Product detail pages (`/bars/[slug]`).
14. Special routes: `/about`, `/journal` (+ `[slug]`), `/faq`, `/stockists`, `/not-found`, per-route `loading.tsx`.
15. `/case-study` route (mood board, system swatches, before/after, gallery).
16. SEO/hygiene: `lib/schema.ts` JSON-LD, per-route `opengraph-image.tsx`, favicon set, `manifest.webmanifest`, `sitemap.ts`, `robots.ts`.
17. Cookie banner + Vercel Analytics + Speed Insights.
18. Share cards build script (`scripts/build-share-cards.ts`, wired to `prebuild`).
19. Reduced-motion + a11y + Lighthouse + dusk-mode pass on every page.
20. Vercel deploy. Smoke-test the live URL on a real phone.

---

## 18. Final Reminders
- This is a **pitch demo**, so it must look art-directed. If something looks generic, redo it.
- When in doubt, choose the more editorial, more typographic, more whitespace-heavy option.
- **Do not invent products, taglines, prices, nutrition figures, founder names, founder quotes, or testimonials.** Every string must come from §5 (real) or be marked `—` / `data-pending` / `(Sample article — coming soon)` / `data-generated` so the user sees what to replace.
- **Do not generate or alter the bar packaging artwork.** The real product photos in `Moringa/`, `PeanutButter/`, `Cocoa/`, `Beetroot/`, `RagiMillet/` are authoritative for color, text, and badges. Generated imagery is allowed only for atmospheric backgrounds (grass, petals, hero field, journal moodshots) and decorative ingredient line-icons.
- Honor the existing pack typography: bold-condensed-sans for product names; editorial Fraunces serif for the brand voice; the leaf-i-dot wordmark is identity, the floral asterisk is signature — never merge them.
- The Blume reference is a mood, not a template. Do not put the word "Blume" anywhere in code or UI.
- After each major section, summarize what you built and link the screenshot path so the user can review before you move on.

**Begin with step 1 of the build order. Confirm the plan back to me in 5 lines, then start.**