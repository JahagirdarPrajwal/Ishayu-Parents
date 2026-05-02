"""
build_ambient_audio.py — Slice a short, web-friendly loopable segment out of
the long ambient nature MP3 the user provided.

Source is ~3h38m / 200 MB. We only need ~60 s for the site, looped via
Web Audio API (which loops the decoded buffer seamlessly — no MP3 decoder
priming click between iterations).

Output: public/audio/ambient.mp3
  - 60 s, starting at t=600 (10 min in — well past any intro, settled
    middle of the recording)
  - mono, 44.1 kHz, 96 kbps CBR  (~720 KB on disk, ~3 s download on a
    decent connection)
  - video stream (the embedded album art PNG) stripped
  - tiny 200 ms fade-in / 200 ms fade-out so even if a browser falls back
    to <audio loop> instead of Web Audio, the seam is inaudible
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg

REPO_ROOT = Path(__file__).resolve().parent.parent
SRC = REPO_ROOT / "assets" / "audio" / "ambient-source.mp3"
OUT_DIR = REPO_ROOT / "public" / "audio"
OUT = OUT_DIR / "ambient.mp3"

START_SEC = 600     # 10 minutes in
LENGTH_SEC = 60
FADE_SEC = 0.2


def main() -> int:
    if not SRC.exists():
        print(f"  ! source missing: {SRC}")
        return 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

    fade_out_start = LENGTH_SEC - FADE_SEC
    audio_filter = (
        f"afade=t=in:st=0:d={FADE_SEC},"
        f"afade=t=out:st={fade_out_start}:d={FADE_SEC}"
    )

    cmd = [
        ffmpeg,
        "-hide_banner",
        "-loglevel", "error",
        "-y",
        "-ss", str(START_SEC),
        "-t", str(LENGTH_SEC),
        "-i", str(SRC),
        "-vn",                      # drop the embedded album art
        "-ac", "1",                 # mono
        "-ar", "44100",
        "-af", audio_filter,
        "-c:a", "libmp3lame",
        "-b:a", "96k",
        "-id3v2_version", "3",
        str(OUT),
    ]

    print(f"  src:  {SRC.name}")
    print(f"  out:  {OUT.relative_to(REPO_ROOT)}")
    print(f"  segment: {START_SEC}s for {LENGTH_SEC}s, fade {FADE_SEC}s")
    print()

    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print("  ffmpeg failed:")
        print(result.stderr)
        return result.returncode

    size_kb = OUT.stat().st_size // 1024
    print(f"  ok  ambient.mp3  {size_kb} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
