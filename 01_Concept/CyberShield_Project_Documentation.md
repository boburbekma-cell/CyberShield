# CyberShield — Project Documentation

**Think before you click.**
Muallif: Nozima · Yo'nalish: Cybersecurity / Information Technology

## Maqsad
Foydalanuvchilarga zamonaviy kiberxavflarni amaliy simulyatsiyalar orqali tanib olish va oldini olishni o'rgatuvchi interaktiv platforma yaratish, so'ng o'qitish samaradorligini tadqiqot (pre-test / post-test) orqali tekshirish.

**Tadqiqot savoli:** CyberShield platformasi foydalanuvchilarning kiberxavflarni tanib olish qobiliyatini oshiradimi?

## Papkalar

Roadmap'dagi papka nomlari va loyihadagi haqiqiy papkalar:

| Roadmap | Loyihada | Ichida |
|---|---|---|
| 01_Concept | `01_Concept` | Konsepsiya PDF, shu hujjat |
| 02_Research | `04_Research` | `Cyber_Threats_Research.md` — 10 ta xavf |
| 03_Design | `02_Design` | `Design_and_Navigation.md` |
| 04_Website | `03_Website` | Sayt (HTML, CSS, JS) |
| 05_Testing | `05_Survey` | Survey savollari, javoblar shabloni |
| 06_Statistics | `06_Statistics` | `analyze_results.py`, `data/` |
| 07_Presentation | `07_Presentation` | 12 slaydlik reja |
| 08_Final_Report | `08_Final_Report` | Hisobot tuzilmasi |

## Roadmap bo'yicha holat

| # | Bosqich | Holat | Qayerda |
|---|---|---|---|
| 1 | Loyihani belgilash | ✅ | Papkalar, shu hujjat |
| 2 | Muammoni o'rganish (10 ta xavf) | ✅ | `04_Research`, saytda **Learn** |
| 3 | Dastlabki so'rovnoma | 🟡 savollar tayyor — **real javoblar yig'ilishi kerak** | `05_Survey` |
| 4 | Platformani loyihalash (menyu) | ✅ | `02_Design` |
| 5 | Dizayn: Dark Cybersecurity + Elegant | ✅ | `css/app.css` |
| 6 | Sayt: HTML, CSS, JS | ✅ | `03_Website` |
| 7 | Home | ✅ | `js/views/home.js` |
| 8 | Phishing Detector (Safe / Phishing / Not Sure) | ✅ | `js/views/phishing.js` |
| 9 | Social Engineering Simulator (bank, kod, yutuq, rahbar fayli…) + psixologik usul | ✅ | `js/views/social.js` |
| 10 | Security Check: Score + shaxsiy tavsiyalar | ✅ | `js/views/account.js` |
| 11 | AI & Deepfake: ovoz, video, rasm, soxta profil, AI phishing + tekshirish tartibi | ✅ | `js/views/info.js` |
| 12 | Digital Identity | ✅ | `js/views/info.js` |
| 13 | Cyber Library: Definition → Example → Warning Signs → Protection | ✅ | `js/views/library.js` |
| 14 | Qulaylik: qidiruv, kategoriyalar, progress, ball, yutuqlar, mobil | ✅ | — |
| 15 | Testlash: pre-test → platforma → post-test | ⬜ real ishtirokchilar bilan o'tkazish kerak | Saytdagi **Security Test** |
| 16 | Statistika | ⬜ skript tayyor, ma'lumot kutilmoqda | `06_Statistics` |
| 17 | Natijani tahlil qilish | ⬜ | `06_Statistics/results_summary.md` |
| 18 | GitHub | ✅ | https://github.com/boburbekma-cell/CyberShield |
| 19 | Saytni onlayn joylash | ✅ GitHub Pages (telefon va kompyuterda tekshiring) | https://boburbekma-cell.github.io/CyberShield/03_Website/ |
| 20 | Taqdimot | 🟡 reja tayyor | `07_Presentation` |
| 21 | Yakuniy hisobot | 🟡 tuzilma tayyor | `08_Final_Report` |

**Sayt havolasi:** https://boburbekma-cell.github.io/CyberShield/03_Website/

## Eksperiment tartibi (15–17-bosqichlar)

1. Har bir ishtirokchiga anonim kod bering (`S-001`, `S-002`, …).
2. Ishtirokchi saytda **Security Test → Boshlang'ich test** ni kod bilan topshiradi.
3. Barcha modullarni o'tadi (Learn → … → Cyber Library).
4. **Yakuniy test** ni topshiradi (xuddi shu 10 savol).
5. **Natijalar → CSV yuklab olish** — faylni `06_Statistics/data/` ga qo'ying.
6. `python 06_Statistics/analyze_results.py` → `results_summary.md`.

> Muhim: barcha foizlar faqat yig'ilgan real ma'lumotlardan hisoblanadi. Natijalarni kutilgan raqamlar bilan almashtirmang.

## Ishlash tamoyili
Bitta modul → kodni tushunish → ishga tushirish → tekshirish → tuzatish → keyingisiga o'tish.
