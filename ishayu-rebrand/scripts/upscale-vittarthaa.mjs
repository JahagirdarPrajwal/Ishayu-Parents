/**
 * scripts/upscale-vittarthaa.mjs
 *
 * Source: a 354x158 transparent-background PNG of the Vittarthaa Life
 * Sciences logo. Lanczos-upscale to 1200 px wide so it stays crisp at the
 * rendered size in the founder-section brand-credit plate, and apply a
 * gentle unsharp mask. Alpha is preserved end-to-end (WebP @ alphaQuality
 * 100 is lossless on the alpha channel).
 *
 * Output: public/vittarthaa-mark.{webp,png}
 *
 * Run with:  node scripts/upscale-vittarthaa.mjs
 *
 * NOTE on the filename: this script writes `vittarthaa-mark.*` (not
 * `vittarthaa-logo.*`) so a fresh path/cache key forces both Next.js's
 * image optimizer and the browser to re-fetch when the source changes.
 * Older `vittarthaa-logo.*` files are removed on every run.
 */

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const SRC = path.join(REPO_ROOT, "assets", "reference", "vittarthaa.png");
const OUT_WEBP = path.join(REPO_ROOT, "public", "vittarthaa-mark.webp");
const OUT_PNG = path.join(REPO_ROOT, "public", "vittarthaa-mark.png");

// Clean up the previous filename if it exists, so the optimizer cache key
// is invalidated and we don't ship two copies.
for (const stale of [
  "vittarthaa-logo.webp",
  "vittarthaa-logo.png",
  "vittarthaa-logo.jpg",
]) {
  const p = path.join(REPO_ROOT, "public", stale);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

const TARGET_WIDTH = 1200;

await sharp(SRC)
  .resize({ width: TARGET_WIDTH, kernel: "lanczos3" })
  .sharpen({ sigma: 0.55, m1: 0.4, m2: 1.0 })
  .webp({ quality: 94, alphaQuality: 100, effort: 6 })
  .toFile(OUT_WEBP);

await sharp(SRC)
  .resize({ width: TARGET_WIDTH, kernel: "lanczos3" })
  .sharpen({ sigma: 0.55, m1: 0.4, m2: 1.0 })
  .png({ compressionLevel: 9, palette: false })
  .toFile(OUT_PNG);

console.log(
  "  ok  vittarthaa-mark  ->  webp",
  Math.round(fs.statSync(OUT_WEBP).size / 1024) + " KB,",
  "png", Math.round(fs.statSync(OUT_PNG).size / 1024) + " KB"
);
