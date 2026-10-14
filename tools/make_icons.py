# Ilova ikonkalarini yaratadi: qalqon belgisi, qorong'i fon.
# Ishga tushirish: python tools/make_icons.py
from pathlib import Path
from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parent.parent / "03_Website" / "icons"
OUT.mkdir(parents=True, exist_ok=True)

def make(size, name, pad=0.22):
    s = size * 4  # silliq chiziqlar uchun katta chizib, keyin kichraytiramiz
    img = Image.new("RGB", (s, s), (10, 13, 20))
    d = ImageDraw.Draw(img)
    w = s * (1 - 2 * pad)
    x0, y0 = s * pad, s * pad * 0.9
    shield = [(x0 + w / 2, y0), (x0 + w, y0 + w * 0.14), (x0 + w, y0 + w * 0.55),
              (x0 + w / 2, y0 + w * 1.05), (x0, y0 + w * 0.55), (x0, y0 + w * 0.14)]
    d.polygon(shield, fill=(183, 164, 255))
    # ichidagi "check" belgisi
    lw = int(s * 0.045)
    cx, cy = x0 + w / 2, y0 + w * 0.5
    pts = [(cx - w * 0.2, cy), (cx - w * 0.04, cy + w * 0.16), (cx + w * 0.22, cy - w * 0.14)]
    d.line(pts, fill=(20, 15, 43), width=lw, joint="curve")
    for p in (pts[0], pts[2]):
        d.ellipse([p[0] - lw / 2, p[1] - lw / 2, p[0] + lw / 2, p[1] + lw / 2], fill=(20, 15, 43))
    img.resize((size, size), Image.LANCZOS).save(OUT / name)

make(192, "icon-192.png")
make(512, "icon-512.png")
make(180, "apple-touch-icon.png")
print("icons ->", OUT)
