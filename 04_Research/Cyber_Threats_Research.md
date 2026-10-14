# Kiberxavflar tadqiqoti (Roadmap — 2-bosqich)

Bu hujjat Cyber Library va Learn bo'limining asosi. Har bir xavf uchun: **nima bu**, **qanday ishlaydi**, **qanday tanish mumkin**, **qanday himoyalanish**.

> Matn saytdagi `03_Website/js/data.js` (`threats`) bilan bir xil. Saytda o'zgartirsangiz, shu yerda ham yangilang.

## 1. Phishing

**Nima bu?** Soxta xat, SMS yoki sayt orqali parol, karta yoki shaxsiy ma'lumotlarni o'g'irlash.

**Qanday ishlaydi?** Firibgar taniqli kompaniya (bank, Instagram, universitet) nomidan xabar yuboradi. Havola asl saytga o'xshash soxta sahifaga olib boradi va kiritilgan ma'lumotlar firibgarga ketadi.

**Qanday tanish mumkin?**
- shoshilinchlik yoki qo'rqitish
- begona yoki o'xshash domen (micros0ft.com)
- parol, kod yoki karta ma'lumotini so'rash
- kutilmagan ilova yoki havola

**Qanday himoyalanish?**
- havolaga bosmasdan, rasmiy ilova yoki saytni o'zingiz oching
- domenni harfma-harf o'qing
- 2FA yoqing
- shubhali xatni xabar qiling va o'chiring

## 2. Social Engineering

**Nima bu?** Texnikani emas, odamni aldash: ishonch, qo'rquv, qiziqish, hamdardlik va shoshilinchlikdan foydalanish.

**Qanday ishlaydi?** Firibgar o'zini bank xodimi, do'st, rahbar yoki texnik yordam deb tanishtiradi va ishonarli bahona (pretext) bilan kod, pul yoki ma'lumot so'raydi.

**Qanday tanish mumkin?**
- kutilmagan qo'ng'iroq yoki xabar
- kuchli his-tuyg'u: qo'rquv, quvonch, xavotir
- "hech kimga aytma", "tezroq"
- aloqa kanalini o'zgartirishni so'rash

**Qanday himoyalanish?**
- to'xtang va o'ylang
- aloqani o'zingiz, rasmiy kanal orqali qayta boshlang
- SMS kod va parolni hech kimga bermang

## 3. Account Takeover

**Nima bu?** Akkauntingizni boshqa odam egallab olishi: Telegram, Instagram, Gmail yoki bank ilovasi.

**Qanday ishlaydi?** Parol phishing, sizib chiqqan baza yoki SMS kodni aldab olish orqali qo'lga kiritiladi. So'ng firibgar parolni almashtiradi va nomingizdan do'stlaringizga yozadi.

**Qanday tanish mumkin?**
- "yangi qurilmadan kirildi" xabari
- o'zingiz so'ramagan tasdiqlash kodi
- do'stlarga siz yubormagan xabarlar
- parol ishlamay qolishi

**Qanday himoyalanish?**
- har bir akkauntda alohida kuchli parol
- 2FA (Telegram'da qo'shimcha parol)
- faol seanslarni tekshirish
- zaxira email va telefonni yangilab turish

## 4. Malware

**Nima bu?** Zararli dastur: virus, troyan, spyware, ransomware — qurilmaga zarar yetkazadi yoki ma'lumotni o'g'irlaydi.

**Qanday ishlaydi?** Fayl (.apk, .exe, .pdf.exe), soxta ilova yoki buzilgan sayt orqali o'rnatiladi va fonda ishlaydi.

**Qanday tanish mumkin?**
- "Rasmlar.apk", "Hisobot.pdf.exe" kabi fayllar
- ilova ortiqcha ruxsat so'raydi (SMS, kontaktlar)
- telefon qiziydi, sekinlashadi, reklama ko'payadi

**Qanday himoyalanish?**
- faqat rasmiy do'kondan ilova o'rnatish
- notanish fayllarni ochmaslik
- qurilma va ilovalarni yangilab turish
- muhim fayllarning zaxira nusxasi

## 5. Password Attacks

**Nima bu?** Parolni taxmin qilish, terib ko'rish yoki boshqa saytdan sizib chiqqan parolni sinash.

**Qanday ishlaydi?** Brute force — barcha variantlarni terib ko'rish; dictionary — mashhur parollar ro'yxati; credential stuffing — bitta saytdan sizib chiqqan parolni boshqa saytlarda sinash.

**Qanday tanish mumkin?**
- muvaffaqiyatsiz kirish urinishlari haqida xabar
- parolingiz ma'lumotlar sizib chiqishida bor (haveibeenpwned.com)

**Qanday himoyalanish?**
- kamida 12 belgili parol yoki parol-ibora
- har bir sayt uchun alohida parol
- parol menejeri
- 2FA

## 6. Data Leakage

**Nima bu?** Shaxsiy ma'lumotlarning ruxsatsiz oshkor bo'lishi — kompaniya bazasidan yoki o'zimizning ehtiyotsizligimiz tufayli.

**Qanday ishlaydi?** Sayt buzilib bazasi tarqaladi; yoki biz o'zimiz pasport rasmini chatga, uy manzilini ochiq profilga joylaymiz.

**Qanday tanish mumkin?**
- xizmatdan "ma'lumotlar sizib chiqdi" xabari
- sizni ism bilan chaqiradigan notanish spam
- ma'lumotingiz qidiruvda chiqishi

**Qanday himoyalanish?**
- kerakmas joyga ma'lumot bermaslik
- maxfiylik sozlamalari
- sizib chiqqan saytda parolni darhol almashtirish

## 7. Identity Theft

**Nima bu?** Sizning nomingiz va ma'lumotlaringizdan foydalanib firibgarlik qilish.

**Qanday ishlaydi?** Pasport rasmi, ism va rasmlar orqali soxta akkaunt ochiladi, nomingizdan kredit olinadi yoki tanishlaringizdan pul so'raladi.

**Qanday tanish mumkin?**
- siz ochmagan akkaunt yoki kredit
- do'stlar "sen pul so'radingmi?" deb so'rashi
- nomingizdagi soxta profil

**Qanday himoyalanish?**
- hujjat rasmlarini yubormaslik
- soxta profil haqida darhol shikoyat qilish
- akkauntlarni 2FA bilan himoyalash

## 8. Online Scams

**Nima bu?** Internetdagi firibgarlik: soxta do'kon, yutuq, ish, ijara yoki investitsiya taklifi.

**Qanday ishlaydi?** Juda yaxshi taklif ko'rsatiladi, oldindan to'lov olinadi va firibgar yo'qoladi. Ba'zan "pulni chiqarish uchun" yana to'lov so'raladi.

**Qanday tanish mumkin?**
- haddan tashqari arzon narx yoki kafolatli foyda
- faqat oldindan to'lov, kartadan kartaga
- "bugun oxirgi kun"
- o'yinda qatnashmagan holda yutuq

**Qanday himoyalanish?**
- sotuvchi va saytni tekshirish, sharhlarni o'qish
- xavfsiz to'lov usuli
- kafolatli foyda va'dasiga ishonmaslik

## 9. AI Scams

**Nima bu?** Sun'iy intellekt yordamida yasalgan firibgarlik: AI phishing xatlar, chat-botlar, soxta profillar.

**Qanday ishlaydi?** AI xatosiz, shaxsiy va ishonarli matn yozadi, real odamga o'xshash profil yaratadi va ko'p odam bilan bir vaqtda suhbatlashadi.

**Qanday tanish mumkin?**
- juda mukammal, lekin g'alati so'rov
- yangi profil tez orada pul yoki kod so'raydi
- boshqa joyda topilmaydigan rasmlar

**Qanday himoyalanish?**
- matn sifatiga emas, so'rovning o'ziga qarang
- manba va kontekstni tekshiring
- pul va kodni hech qachon chatda bermang

## 10. Deepfake

**Nima bu?** AI yordamida yaratilgan soxta video, ovoz yoki rasm, unda real odam aytmagan narsani aytadi.

**Qanday ishlaydi?** Bir necha rasm yoki soniyalik ovoz yozuvidan AI model odamning yuzi va ovozini nusxalaydi.

**Qanday tanish mumkin?**
- lab harakati ovozga mos emas
- ko'z qisish g'alati, yuz chegarasi xira
- yaqin odam ovozi yangi raqamdan shoshilinch pul so'raydi

**Qanday himoyalanish?**
- oila kod so'zi
- tanish raqamga qayta qo'ng'iroq
- rasmiy manbadan tekshirish
- profilni yopiq tutish

## Manbalar (tekshirib, to'ldiring)

- [ ] CISA — Avoiding Social Engineering and Phishing Attacks
- [ ] NIST SP 800-63B — Digital Identity Guidelines (parollar, 2FA)
- [ ] ENISA Threat Landscape (yillik hisobot)
- [ ] FBI IC3 — Internet Crime Report
- [ ] O'zbekiston Respublikasi Kiberxavfsizlik markazi (csec.uz) e'lonlari
