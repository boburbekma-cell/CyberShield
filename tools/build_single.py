# Butun ilovani BITTA .html faylga yig'adi (Telegram orqali yuborish yoki ish stoli uchun).
# Ishga tushirish: python tools/build_single.py
# Natija: dist/CyberShield_Girls.html
import base64, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "03_Website"
DIST = ROOT / "dist"
DIST.mkdir(exist_ok=True)

html = (SITE / "index.html").read_text(encoding="utf-8")

# CSS ni ichiga joylash
css = (SITE / "css" / "app.css").read_text(encoding="utf-8")
html = html.replace('<link rel="stylesheet" href="css/app.css">', "<style>\n" + css + "\n</style>")

# JS fayllarni ichiga joylash (tartib saqlanadi)
def inline_js(match):
    src = match.group(1)
    code = (SITE / src).read_text(encoding="utf-8").replace("</script", r"<\/script")
    return f"<script>/* {src} */\n{code}\n</script>"
html = re.sub(r'<script src="([^"]+)"></script>', inline_js, html)

# Ikonkani data URI qilish; manifest va service worker bitta faylda ishlamaydi
icon = base64.b64encode((SITE / "icons" / "apple-touch-icon.png").read_bytes()).decode()
html = html.replace('href="icons/apple-touch-icon.png"', f'href="data:image/png;base64,{icon}"')
html = html.replace('<link rel="icon" type="image/png" href="icons/icon-192.png">', f'<link rel="icon" type="image/png" href="data:image/png;base64,{icon}">')
html = html.replace('  <link rel="manifest" href="manifest.webmanifest">\n', "")

out = DIST / "CyberShield_Girls.html"
out.write_text(html, encoding="utf-8")
print(f"{out}  ({out.stat().st_size // 1024} KB)")

# Ish stolidagi nusxani ham yangilash (Telegram orqali yuborish uchun shu fayl ishlatiladi)
desktop = Path.home() / "Desktop"
if desktop.is_dir():
    (desktop / out.name).write_text(html, encoding="utf-8")
    print(f"{desktop / out.name}  (yangilandi)")
