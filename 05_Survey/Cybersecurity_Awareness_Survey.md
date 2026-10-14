# Cybersecurity Awareness Survey (Roadmap — 3-bosqich)

**Maqsad:** platformani yaratishdan oldin foydalanuvchilarning phishing, shubhali havolalar, 2FA, ijtimoiy muhandislik, parollar va deepfake firibgarligi haqidagi bilimini o'rganish.

**Qanday o'tkazish:** Google Forms (yoki qog'oz) orqali. Ism so'ralmaydi — faqat anonim kod (masalan, `S-014`). Javoblarni `survey_responses.csv` faylga saqlang (namuna: `survey_responses_template.csv`). **Faqat real javoblarni yozing.**

---

## A. Ishtirokchi haqida

1. Ishtirokchi kodi: ________
2. Yoshingiz: ☐ 14–17 ☐ 18–21 ☐ 22–25 ☐ 26+
3. Kim siz: ☐ maktab o'quvchisi ☐ talaba ☐ ishlayman ☐ boshqa
4. Kuniga internetda qancha vaqt: ☐ <1 soat ☐ 1–3 soat ☐ 3–6 soat ☐ 6+ soat
5. Qaysi ilovalardan ko'p foydalanasiz: ☐ Telegram ☐ Instagram ☐ TikTok ☐ YouTube ☐ Gmail ☐ bank ilovasi

## B. Tajriba

6. Sizga shubhali xabar yoki havola kelganmi? ☐ ha ☐ yo'q ☐ bilmayman
7. Siz yoki yaqiningiz internetda aldanganmi (akkaunt, pul, ma'lumot)? ☐ ha ☐ yo'q ☐ aytgim kelmaydi
8. Kimdir sizdan SMS kodni so'raganmi? ☐ ha ☐ yo'q

## C. Bilim (har birida bitta to'g'ri javob)

9. **Phishing** nima?
   ☐ zararli dastur ☐ **soxta xabar/sayt orqali ma'lumot o'g'irlash** ☐ internet tezligi ☐ bilmayman
10. **Shubhali havola:** `instagram-verify-login.co` — bu Instagram'ning rasmiy sayti?
    ☐ ha ☐ **yo'q** ☐ bilmayman
11. Saytda qulf (HTTPS) bor — demak sayt xavfsiz?
    ☐ ha, 100% ☐ **yo'q, faqat ulanish shifrlangan** ☐ bilmayman
12. **2FA** nima?
    ☐ ikkita akkaunt ☐ **ikki bosqichli tasdiqlash** ☐ antivirus ☐ bilmayman
13. Telegram/Instagram'da 2FA yoqilganmi? ☐ ha ☐ yo'q ☐ bilmayman *(odat savoli — ball berilmaydi)*
14. **Social engineering:** "bank xodimi" SMS kodni so'rayapti. To'g'ri harakat?
    ☐ kodni aytish ☐ **go'shakni qo'yib, rasmiy raqamga o'zim qo'ng'iroq qilish** ☐ ismini so'rab, keyin aytish
15. **Parollar:** eng kuchli parol?
    ☐ Nozima2005 ☐ 12345678 ☐ **daryo-limon-velosiped-42**
16. Hamma saytda bitta parol ishlatasizmi? ☐ ha ☐ bir nechta ☐ har birida alohida *(odat savoli)*
17. **Deepfake:** "onangiz" ovozi yangi raqamdan pul so'rayapti. Bu:
    ☐ albatta onam ☐ **AI soxta ovoz bo'lishi mumkin — tekshirish kerak** ☐ telefon xatosi
18. O'zingizning kiberxavfsizlik bilimingizni 1–5 baholang: ☐1 ☐2 ☐3 ☐4 ☐5

## D. Ochiq savol

19. Internetda sizni eng ko'p nima xavotirga soladi? ____________________

---

### Tahlil uchun

- Bilim savollari: 9, 10, 11, 12, 14, 15, 17 → har biri 1 ball (maks. 7).
- Odat savollari: 13, 16 — foiz sifatida hisoblanadi.
- Natijalar `06_Statistics` papkasida tahlil qilinadi.
