"""Build a deterministic brand share card from existing logo assets (Pillow)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
FONT = Path('C:/Windows/Fonts')
canvas = Image.new('RGB', (1200, 630), '#0b1c17')
draw = ImageDraw.Draw(canvas)
for x in range(0, 1200, 60):
    draw.line((x, 0, x, 630), fill='#10251e')
for y in range(0, 630, 60):
    draw.line((0, y, 1200, y), fill='#10251e')
draw.ellipse((800, 80, 1280, 560), fill='#143b2d', outline='#397555', width=2)
for inset in (50, 110, 180):
    draw.ellipse((800+inset, 80, 1280-inset, 560), outline='#397555', width=2)
for inset in (65, 130, 195):
    draw.ellipse((800, 80+inset, 1280, 560-inset), outline='#397555', width=2)
draw.ellipse((869, 147, 883, 161), fill='#b9d8bd')
draw.ellipse((1106, 390, 1120, 404), fill='#b9d8bd')
logo = Image.open(ROOT / 'server/cpanel/email-logo.png').convert('RGBA')
logo.thumbnail((261, 50), Image.Resampling.LANCZOS)
canvas.paste(logo, (72, 64), logo)
draw.text((72, 202), 'Fikirden', font=ImageFont.truetype(str(FONT/'arialbd.ttf'), 78), fill='#f4f7f1')
draw.text((72, 294), 'çalışan ürüne.', font=ImageFont.truetype(str(FONT/'arialbd.ttf'), 78), fill='#b9d8bd')
draw.text((76, 422), 'Web siteleri, uygulamalar ve oyunlar.', font=ImageFont.truetype(str(FONT/'arial.ttf'), 27), fill='#c1d0c7')
draw.line((76, 535, 1124, 535), fill='#315342', width=2)
draw.text((76, 558), 'burkut.gemnative.com', font=ImageFont.truetype(str(FONT/'arial.ttf'), 23), fill='#b9d8bd')
canvas.save(ROOT / 'public/images/burkut-social.png', optimize=True)
