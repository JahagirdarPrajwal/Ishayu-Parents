"""
strip_bg_attachments.py — Convert the user-provided black-background JPG
cutouts (from an external bg-removal service) into transparent PNGs that
overwrite our `front` cutouts.

The external tool returned high-quality cutouts on a SOLID BLACK background
(JPGs can't carry alpha — transparent pixels get baked to (0,0,0) when the
PNG is re-encoded as JPG). All we have to do is reverse that: any pixel
near pure black becomes transparent, with a tiny feather on the alpha edge
so the cutout doesn't read as crunchy on coloured tiles.

We do NOT use flood-fill or erosion here — the source cutouts are already
clean at the pixel level and we want to preserve every bit of the artist /
service's original edge work.

Run:
    py scripts/strip_bg_attachments.py
"""

from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

REPO_ROOT = Path(__file__).resolve().parent.parent
ATTACHMENTS = REPO_ROOT / "assets" / "attachments"
OUT_DIR = REPO_ROOT / "public" / "bars-cutout"

# Filename → bar slug (front shot for each bar).
MAPPING = {
    "1000172883.jpg": "ragi-millet",
    "1000172886.jpg": "beet",
    "1000172887.jpg": "peanut-butter",
    "1000172888.jpg": "moringa",
    "1000172889.jpg": "cocoa",
}

LONG_EDGE = 1400
# How "near-black" counts as background. JPG compression noise can lift true
# blacks to (4, 6, 3) etc. None of the bars contain pixels this dark
# anywhere on the actual pack art (verified by spot-checking the darkest
# bar — cocoa).
BLACK_TOLERANCE = 18
FEATHER_RADIUS = 0.6


def cut_out_black(src: Path, long_edge: int) -> Image.Image:
    img = Image.open(src).convert("RGB")

    # Resize first so the feather radius is consistent across input sizes.
    w, h = img.size
    if max(w, h) > long_edge:
        scale = long_edge / max(w, h)
        img = img.resize(
            (round(w * scale), round(h * scale)), Image.Resampling.LANCZOS
        )

    arr = np.asarray(img)
    # max-channel test ⇒ a pixel is "black-ish" iff every channel is ≤ tol.
    bg_mask = arr.max(axis=2) <= BLACK_TOLERANCE

    alpha = np.where(bg_mask, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha, mode="L")
    if FEATHER_RADIUS > 0:
        alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(FEATHER_RADIUS))

    rgba = img.convert("RGBA")
    rgba.putalpha(alpha_img)
    return rgba


def main() -> int:
    if not ATTACHMENTS.exists():
        print(f"  ! attachments folder missing: {ATTACHMENTS}")
        return 1

    print("Ishayu - attachments to transparent PNGs")
    print(f"  attachments: {ATTACHMENTS}")
    print(f"  output:      {OUT_DIR}")
    print()

    for fname, slug in MAPPING.items():
        src = ATTACHMENTS / fname
        if not src.exists():
            print(f"  ! missing {fname} for {slug}")
            continue

        out_dir = OUT_DIR / slug
        out_dir.mkdir(parents=True, exist_ok=True)
        out_path = out_dir / "front.png"

        rgba = cut_out_black(src, LONG_EDGE)
        rgba.save(out_path, "PNG", optimize=True)

        # Sanity report.
        a = np.array(rgba.split()[3])
        tp = (a < 10).sum() / a.size * 100
        op = (a > 245).sum() / a.size * 100
        size_kb = out_path.stat().st_size // 1024

        print(
            f"  ok  {slug:14s}  ->  front.png  "
            f"transparent {tp:4.1f}%  opaque {op:4.1f}%  ({size_kb} KB)"
        )

    print()
    print("done.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
