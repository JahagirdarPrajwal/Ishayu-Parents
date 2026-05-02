"""
strip_bg.py — Remove the studio-white background from the bar packshots and
write transparent PNGs the site references directly.

Sources live in `assets/source-bars/<slug>/{front,flat,back}.jpg` (copied in
from the workspace bar folders). Outputs are written to
`public/bars-cutout/<slug>/{front,flat,back}.png` — fresh URL paths, so
Next.js' image cache can never serve a stale, white-background version.

Strategy
--------
1. 4-corner flood-fill with colour tolerance to mark the background. This is
   the key trick — flooding from the corners only marks pixels actually
   *connected* to the studio sweep, so near-white interior elements (the
   cream "Real ingredients. Honest energy." panel, the printed Ishayu mark,
   highlights on the foil) stay opaque.
2. 1 px erosion of the foreground so we don't bleed into the bar's edge.
3. Sub-pixel Gaussian feather on the alpha channel so the cut isn't crunchy
   on coloured backgrounds.
4. Resize to 1400 px long edge, save as PNG with optimised compression.

Run:
    py scripts/strip_bg.py

Requires Pillow + numpy (already installed).
"""

from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

REPO_ROOT = Path(__file__).resolve().parent.parent
ASSETS_DIR = REPO_ROOT / "assets" / "source-bars"
OUT_DIR = REPO_ROOT / "public" / "bars-cutout"

SLUGS = ["moringa", "peanut-butter", "cocoa", "beet", "ragi-millet"]
KINDS = ("front", "flat", "back")

LONG_EDGE = 1400
TOLERANCE = 22          # how close to background-corner colour counts as bg
FEATHER_RADIUS = 1.2    # Gaussian blur on alpha edge (subpixel feathering)
BORDER_TRIM_PX = 1      # erode the mask 1 px so we don't eat into the subject


def flood_background_mask(arr: np.ndarray, tol: int) -> np.ndarray:
    """Flood-fill from each of the 4 corners. Pixels reached by the fill
    (within `tol` of the seed) are background. Returns a bool mask, True
    where background."""
    h, w, _ = arr.shape
    visited = np.zeros((h, w), dtype=bool)
    corners = [(0, 0), (0, w - 1), (h - 1, 0), (h - 1, w - 1)]

    for cy, cx in corners:
        if visited[cy, cx]:
            continue
        seed = arr[cy, cx].astype(np.int16)
        # Skip corners that aren't on a near-white sweep.
        if seed.mean() < 230:
            continue

        queue: deque[tuple[int, int]] = deque()
        queue.append((cy, cx))
        visited[cy, cx] = True

        while queue:
            y, x = queue.popleft()
            for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                ny, nx = y + dy, x + dx
                if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
                    diff = np.abs(arr[ny, nx].astype(np.int16) - seed).max()
                    if diff <= tol:
                        visited[ny, nx] = True
                        queue.append((ny, nx))

    return visited


def erode_foreground(mask: np.ndarray, px: int) -> np.ndarray:
    """Single-pixel erosion of the foreground keeps the cut from eating
    sub-pixel JPEG noise at the bar's outline."""
    if px <= 0:
        return mask
    fg = ~mask
    eroded = fg.copy()
    eroded[1:, :] &= fg[:-1, :]
    eroded[:-1, :] &= fg[1:, :]
    eroded[:, 1:] &= fg[:, :-1]
    eroded[:, :-1] &= fg[:, 1:]
    return ~eroded


def cut_out(src_path: Path, long_edge: int) -> Image.Image:
    img = Image.open(src_path).convert("RGB")
    w, h = img.size
    if max(w, h) > long_edge:
        scale = long_edge / max(w, h)
        img = img.resize(
            (round(w * scale), round(h * scale)), Image.Resampling.LANCZOS
        )

    arr = np.asarray(img)
    bg_mask = flood_background_mask(arr, TOLERANCE)
    bg_mask = erode_foreground(bg_mask, BORDER_TRIM_PX)

    alpha = np.where(bg_mask, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha, mode="L")
    if FEATHER_RADIUS > 0:
        alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(FEATHER_RADIUS))

    rgba = img.convert("RGBA")
    rgba.putalpha(alpha_img)
    return rgba


def process_one(slug: str) -> None:
    src_dir = ASSETS_DIR / slug
    if not src_dir.exists():
        print(f"  ! source folder missing for {slug}: {src_dir}")
        return

    out_dir = OUT_DIR / slug
    out_dir.mkdir(parents=True, exist_ok=True)

    written: list[str] = []
    for kind in KINDS:
        src = src_dir / f"{kind}.jpg"
        if not src.exists():
            print(f"  - {slug}/{kind}: no source, skipping")
            continue
        rgba = cut_out(src, LONG_EDGE)
        out_path = out_dir / f"{kind}.png"
        rgba.save(out_path, "PNG", optimize=True)
        size_kb = out_path.stat().st_size // 1024
        written.append(f"{kind}.png ({size_kb} KB)")

    print(f"  ok  {slug:14s}  ->  " + ", ".join(written))


def main() -> int:
    print("Ishayu - python background strip (PNG output)")
    print(f"  sources: {ASSETS_DIR}")
    print(f"  output:  {OUT_DIR}")
    print()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for slug in SLUGS:
        process_one(slug)
    print()
    print("done.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
