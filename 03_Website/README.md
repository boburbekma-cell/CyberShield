# CyberShield Girls

**Think before you click.**

Qizlar va talabalar uchun raqamli xavfsizlik bo'yicha interaktiv ta'lim platformasi (PWA).

## Imkoniyatlar

- **Boshlang'ich va yakuniy test.** Eksperiment uchun 10 ta savol. Natijalar kategoriyalar bo'yicha solishtiriladi, tadqiqot uchun CSV eksport bor.
- **7 ta modul** (roadmap tartibida):
  - Learn: 10 ta kiberxavf — nima bu, qanday ishlaydi, qanday tanish, qanday himoyalanish.
  - Phishing Detector: 10 ta xabar, Safe / Phishing / Not Sure, shubhali joylar raqam bilan belgilanadi.
  - Social Engineering Simulator: 8 ta chat-vaziyat va psixologik usul tushuntirishi.
  - Security Check: Cybersecurity Score 0–100 va shaxsiy tavsiyalar.
  - AI & Deepfake: belgilar, 5 qadamli tekshiruv va viktorina.
  - Digital Identity: raqamli iz, maxfiylik, rasmlar, geolokatsiya, shantaj holatida qadamlar.
  - Cyber Library: 21 ta mavzu, Definition → Example → Warning Signs → Protection, qidiruv va kategoriyalar.
- **Progress, daraja va 10 ta yutuq.** Hammasi qurilmada (localStorage) saqlanadi.
- **iPhone / Mac:** "Ekranga qo'shish" orqali ilova bo'lib ochiladi. Serverda turganda internetsiz ham ishlaydi.

## Ishga tushirish

- Eng oddiy yo'li: `index.html` faylini brauzerda ochish.
- VS Code'da: **Live Server** kengaytmasini o'rnating va pastdagi **Go Live** tugmasini bosing.

## Fayllar

```
index.html            — ilova karkasi
css/app.css           — dizayn (Dark Cybersecurity + Elegant)
js/data.js            — BARCHA kontent: xabarlar, vaziyatlar, savollar, atamalar
js/store.js           — progressni saqlash
js/ui.js              — yordamchilar, ikonkalar, yutuqlar
js/views/*.js         — har bir sahifa alohida faylda
js/app.js             — router va menyu
manifest.webmanifest  — PWA sozlamalari
sw.js                 — offline rejim
icons/                — ilova ikonkalari
```

Yangi xabar yoki savol qo'shish uchun faqat `js/data.js` faylini tahrirlang.

## Bitta faylga yig'ish (Telegram uchun)

```
python tools/build_single.py     # → dist/CyberShield_Girls.html
```

Muallif: Nozima · Cybersecurity / IT
