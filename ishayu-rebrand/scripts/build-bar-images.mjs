/**
 * scripts/build-bar-images.mjs
 *
 * Re-encode the per-bar lifestyle photographs from
 * `assets/source-bars/<slug>/lifestyle.jpg` into the optimised WebP + JPG
 * served under `public/bars/<slug>/lifestyle-1.{webp,jpg}`.
 *
 * Front / flat / back packshots are NOT handled here anymore — those go
 * through the Python background-removal pipeline:
 *   - scripts/strip_bg.py            (white-background sources)
 *   - scripts/strip_bg_attachments.py (the higher-quality external cutouts)
 * which write transparent PNGs to public/bars-cutout/<slug>/.
 *
 * Run with:  node scripts/build-bar-images.mjs
 */

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const SOURCE_BARS = path.join(REPO_ROOT, "assets", "source-bars");
const PUBLIC_BARS = path.join(REPO_ROOT, "public", "bars");

const LIFESTYLE_LONG_EDGE = 1600;
const SLUGS = ["moringa", "peanut-butter", "cocoa", "beet", "ragi-millet"];

async function buildOne(slug) {
  const src = path.join(SOURCE_BARS, slug, "lifestyle.jpg");
  if (!existsSync(src)) {
    console.warn(`  ! ${slug}: no lifestyle.jpg in assets/source-bars/${slug}/`);
    return;
  }
  const destDir = path.join(PUBLIC_BARS, slug);
  await mkdir(destDir, { recursive: true });

  const buf = await sharp(src).rotate().toBuffer();

  await sharp(buf)
    .resize({
      width: LIFESTYLE_LONG_EDGE,
      height: LIFESTYLE_LONG_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 85, effort: 5 })
    .toFile(path.join(destDir, "lifestyle-1.webp"));

  await sharp(buf)
    .resize({
      width: LIFESTYLE_LONG_EDGE,
      height: LIFESTYLE_LONG_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(path.join(destDir, "lifestyle-1.jpg"));

  console.log(`  ok  ${slug.padEnd(14)} -> public/bars/${slug}/lifestyle-1.{webp,jpg}`);
}

async function main() {
  console.log("Ishayu - lifestyle image pipeline");
  console.log(`  sources: ${SOURCE_BARS}`);
  console.log(`  output:  ${PUBLIC_BARS}`);
  console.log("");
  await mkdir(PUBLIC_BARS, { recursive: true });
  for (const slug of SLUGS) await buildOne(slug);
  console.log("");
  console.log("done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
