"""Prepare web assets from the user's original transparent PNGs.

Only alpha bounds, proportional scaling and format conversion are used.
The artwork is not redrawn. Requires Pillow; originals stay untouched.
"""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
target = root / "public/images/brand"
target.mkdir(parents=True, exist_ok=True)
mark = Image.open(root / "onlylogo.png").convert("RGBA")
mark = mark.crop(mark.getchannel("A").getbbox())
lockup = Image.open(root / "bürkütlogopng.png").convert("RGBA")
# In the supplied 4000px lockup, the lettering begins below y=2800.
wordmark = lockup.crop((0, 2800, lockup.width, lockup.height))
wordmark = wordmark.crop(wordmark.getchannel("A").getbbox())
lockup = lockup.crop(lockup.getchannel("A").getbbox())

for name, original, width in [
    ("logo-mark.webp", mark, 192),
    ("logo-wordmark.webp", wordmark, 512),
    ("logo-lockup.webp", lockup, 640),
]:
    image = original.resize((width, round(width * original.height / original.width)), Image.Resampling.LANCZOS)
    image.save(target / name, "WEBP", lossless=True, method=6)
    print(name, image.size, (target / name).stat().st_size)

for size in (32, 180):
    icon = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    scaled = mark.copy()
    scaled.thumbnail((round(size * .94), round(size * .94)), Image.Resampling.LANCZOS)
    icon.alpha_composite(scaled, ((size-scaled.width)//2, (size-scaled.height)//2))
    icon.save(target / f"favicon-{size}.png", optimize=True)
