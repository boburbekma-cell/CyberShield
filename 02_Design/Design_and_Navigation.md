# Dizayn va navigatsiya (Roadmap — 4–5-bosqichlar)

## Uslub: Dark Cybersecurity + Elegant

| Element | Qiymat | Qayerda |
|---|---|---|
| Fon | `#05070c` (qora-ko'k) | `--bg` |
| Matn | `#e6edf7` (och) | `--text` |
| Asosiy aksent | `#3b82f6` (ko'k) | `--accent` |
| Ikkinchi aksent | `#22d3ee` (havorang) | `--accent-2` |
| Ogohlantirish / xavf | `#f87171` (qizil) | `--danger` |
| Xavfsiz | `#34d399` (yashil) | `--safe` |
| Shubha (Not Sure) | `#fbbf24` (sariq) | `--warn` |
| Shrift | Inter / tizim shrifti, kod uchun monospace | `--font-body`, `--font-mono` |

Barcha ranglar `03_Website/css/app.css` faylining boshida (`:root`) turibdi.

## Menyu (sayt bilan bir xil tartib)

```
Home ─ Learn ─ Phishing Detector ─ Social Engineering ─ Security Check
     ─ AI & Deepfake ─ Digital Identity ─ Cyber Library
Eksperiment: Security Test (pre/post) ─ Natijalar ─ Profil
```

- **Kompyuter:** chap tomonda menyu, o'ngda kontent.
- **Telefon:** yuqorida logo va daraja, pastda 5 ta tugma: Asosiy · Mashq · Test · Lug'at · Profil.

## Ekranlar prototipi

```
HOME                                  PHISHING DETECTOR
┌───────────────────────────────┐     ┌───────────────────────────────┐
│ CyberShield Girls             │     │ Xabar 1/10           Ball: 0  │
│ Think before you click.       │     │ ┌───────────────────────────┐ │
│ Qisqa tavsif                  │     │ │ Instagram Security        │ │
│ [ Start Security Test → ]     │     │ │ Your account will be      │ │
│ 10 xavf · 10 xabar · 8 vaziyat│     │ │ suspended in 30 minutes…  │ │
├───────────────────────────────┤     │ └───────────────────────────┘ │
│ Sizning yo'lingiz: test →     │     │ [ Safe ] [ Phishing ] [Not Sure]│
│ 7 modul → yakuniy test → natija│    │ Tushuntirish + belgilar       │
├───────────────────────────────┤     └───────────────────────────────┘
│ Modul kartalari (7 ta)        │
└───────────────────────────────┘
```

## Foydalanuvchi yo'li

1. Boshlang'ich test (pre-test) → 2. Learn → 3–7. Simulyatsiyalar va Cyber Library → 8. Yakuniy test (post-test) → 9. Natijalar va CSV eksport.
