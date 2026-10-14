// CyberShield — barcha kontent shu faylda.
// Yangi xabar, vaziyat yoki atama qo'shish uchun faqat shu faylni tahrirlang.

window.CSG_DATA = {

  /* ===== Modullar ro'yxati (bosh sahifa va menyu uchun) ===== */
  modules: [
    { id: "learn", title: "Learn", short: "10 ta asosiy kiberxavf: nima, qanday ishlaydi, qanday tanish va himoyalanish.", icon: "shield" },
    { id: "phishing", title: "Phishing Detector", short: "Xabarni tahlil qiling: Safe, Phishing yoki Not Sure?", icon: "mail" },
    { id: "social", title: "Social Engineering", short: "Psixologik hujum vaziyatlarida to'g'ri qaror qiling.", icon: "chat" },
    { id: "account", title: "Security Check", short: "Odatlaringizni tekshiring va Cybersecurity Score oling.", icon: "lock" },
    { id: "ai", title: "AI & Deepfake", short: "Soxta ovoz, video, rasm, profil va AI phishing'ni tanish.", icon: "eye" },
    { id: "identity", title: "Digital Identity", short: "Raqamli iz, shaxsiy ma'lumot, rasmlar, geolokatsiya va obro'.", icon: "user" },
    { id: "library", title: "Cyber Library", short: "Definition → Example → Warning Signs → Protection.", icon: "book" }
  ],

  /* ===== 1. PHISHING DETECTOR =====
     parts: oddiy matn (string) yoki shubhali bo'lak {text, flag}.
     flag — flags massividagi tushuntirish raqami (0 dan). */
  phishing: [
    {
      channel: "email", from: "Instagram Security", address: "security@insta-verify-help.com",
      subject: "Account suspension notice",
      parts: [
        { text: "Your account will be suspended within 30 minutes.", flag: 0 },
        " Unusual activity was detected. ",
        { text: "Verify your account now", flag: 1 },
        " to avoid permanent deletion: ",
        { text: "http://instagram-verify-login.co/secure", flag: 2 }
      ],
      answer: "phishing",
      flags: [
        "Shoshilinchlik: \"30 daqiqa ichida\" — o'ylashga vaqt bermaslik uchun.",
        "Bloklash va o'chirish bilan qo'rqitib, darhol harakat qildirish.",
        "Havola Instagram'ga emas, begona instagram-verify-login.co domeniga olib boradi."
      ],
      lesson: "Instagram'dan kelgan rasmiy xabarlar ilovaning o'zidagi Sozlamalar → Xavfsizlik → Instagram'dan xatlar bo'limida ko'rinadi."
    },
    {
      channel: "telegram", from: "Madina 🌸", address: "do'stingiz",
      parts: [
        "Salom! Men tanlovda qatnashyapman, ",
        { text: "iltimos ovoz berib yubor", flag: 0 },
        " 🙏 ",
        { text: "Telefon raqamingni kiritib, SMS kodni yozsang bo'ldi", flag: 1 },
        ": ",
        { text: "golos-konkurs.top/vote", flag: 2 }
      ],
      answer: "phishing",
      flags: [
        "Tanish odam nomidan yozilgan — uning akkaunti allaqachon o'g'irlangan bo'lishi mumkin.",
        "SMS kodni kiritish = Telegram akkauntingizni firibgarga topshirish.",
        "Shubhali .top domeni, rasmiy tanlov sayti emas."
      ],
      lesson: "Do'stingizdan g'alati iltimos kelsa, unga boshqa yo'l bilan (qo'ng'iroq qilib) ishonch hosil qiling."
    },
    {
      channel: "sms", from: "Dekanat", address: "rasmiy guruh",
      parts: ["Ertaga soat 10:00 da 204-xonada guruh yig'ilishi bo'ladi. Talabalar guvohnomasini olib keling."],
      answer: "safe",
      flags: [],
      lesson: "Havola yo'q, parol yoki kod so'ralmayapti, oddiy ma'lumot. Shubha bo'lsa, kuratordan tekshirib oling."
    },
    {
      channel: "sms", from: "CLICK-BONUS", address: "+998 90 xxx xx 17",
      parts: [
        { text: "Tabriklaymiz! Siz 500 000 so'm bonus yutdingiz!", flag: 0 },
        " Pulni olish uchun ",
        { text: "karta raqami va CVV kodini kiriting", flag: 1 },
        ": ",
        { text: "click-bonus-uz.net/prize", flag: 2 }
      ],
      answer: "phishing",
      flags: [
        "Kutilmagan \"yutuq\" — foyda olish istagidan foydalanish.",
        "Hech bir bank yoki to'lov tizimi CVV kodni so'ramaydi.",
        "Domen rasmiy emas, oddiy mobil raqamdan yuborilgan."
      ],
      lesson: "Siz qatnashmagan o'yinda yutib bo'lmaydi. Karta ma'lumotlarini faqat o'zingiz ochgan rasmiy ilovada kiriting."
    },
    {
      channel: "email", from: "Google", address: "no-reply@accounts.google.com",
      subject: "Security alert",
      parts: ["Akkauntingizga Windows qurilmasidan yangi kirish bo'ldi. Agar bu siz bo'lsangiz, hech narsa qilish shart emas. Agar siz bo'lmasangiz, Google Account sozlamalarida faolligingizni tekshiring."],
      answer: "safe",
      flags: [],
      lesson: "Rasmiy domen, hech narsa kiritish talab qilinmayapti. Eng xavfsiz yo'l: xatdagi havolani emas, Google ilovasini o'zingiz ochib tekshiring."
    },
    {
      channel: "email", from: "HR Manager", address: "jobs.career.uz@gmail.com",
      subject: "Uydan ishlash taklifi",
      parts: [
        { text: "Kuniga 2 soat ishlab, oyiga 15 mln so'm!", flag: 0 },
        " Tajriba shart emas. Ro'yxatdan o'tish uchun ",
        { text: "100 000 so'm to'lov qiling", flag: 1 },
        ": ",
        { text: "bit.ly/3xJob", flag: 2 }
      ],
      answer: "phishing",
      flags: [
        "Haddan tashqari yaxshi taklif — real ish bunday bo'lmaydi.",
        "Ish uchun oldindan pul so'rash — klassik firibgarlik.",
        "Qisqartirilgan havola haqiqiy manzilni yashiradi; kompaniya o'rniga oddiy gmail."
      ],
      lesson: "Haqiqiy ish beruvchi sizdan pul so'ramaydi, aksincha sizga to'laydi."
    },
    {
      channel: "instagram", from: "fashion.giveaway.uz", address: "tasdiqlanmagan akkaunt",
      parts: [
        "Siz iPhone 16 giveaway g'olibisiz! 🎉 ",
        { text: "Sovg'ani olish uchun yetkazib berish to'lovi 49 000 so'm", flag: 0 },
        ". ",
        { text: "24 soat ichida javob bermasangiz, sovg'a boshqaga o'tadi", flag: 1 },
        "."
      ],
      answer: "phishing",
      flags: [
        "\"Sovg'a\" uchun pul so'rash — tekin narsa uchun to'lov bo'lmaydi.",
        "Muddat bilan shoshiltirish."
      ],
      lesson: "Giveaway g'olibi rasmiy sahifada e'lon qilinadi, va hech qachon pul so'ralmaydi."
    },
    {
      channel: "sms", from: "UzPost", address: "+998 71 xxx xx 00",
      parts: [
        "Posilkangiz manzil noto'g'riligi sababli to'xtatildi. ",
        { text: "Manzilni yangilang va 3 500 so'm to'lang", flag: 0 },
        ": ",
        { text: "uzpost-delivery.info/track", flag: 1 }
      ],
      answer: "phishing",
      flags: [
        "Kichik summa so'rash — aslida karta ma'lumotlarini o'g'irlash uchun.",
        "Rasmiy pochta sayti emas, o'xshatib yasalgan domen."
      ],
      lesson: "Posilka kutayotgan bo'lsangiz, trek raqamini rasmiy saytga o'zingiz kiriting."
    },
    {
      channel: "telegram", from: "Kurs guruhi", address: "guruh sardori",
      parts: ["Do'stlar, imtihon jadvali universitet saytida e'lon qilindi. Bosh sahifadagi \"Talabalar\" bo'limiga qarang."],
      answer: "safe",
      flags: [],
      lesson: "Havola yo'q, sizni rasmiy saytga o'zingiz kirishga yo'naltiryapti. Bu to'g'ri usul."
    },
    {
      channel: "email", from: "Microsoft 365", address: "admin@micros0ft-support.com",
      subject: "Pochta qutingiz to'ldi",
      parts: [
        "Pochta qutingiz 99% to'ldi. Yangi xatlar qabul qilinmaydi. ",
        { text: "Login va parolingizni tasdiqlang", flag: 0 },
        ": ",
        { text: "micros0ft-support.com/verify", flag: 1 }
      ],
      answer: "phishing",
      flags: [
        "Parolni \"tasdiqlash\" talabi — hech bir xizmat parolni xat orqali so'ramaydi.",
        "Domendagi \"0\" (nol) — \"o\" harfi o'rniga. Bu typosquatting deyiladi."
      ],
      lesson: "Domenni harfma-harf o'qing: micros0ft, g00gle, instagrarn kabi o'xshash nomlar ko'p uchraydi."
    }
  ],

  /* ===== 2. SOCIAL ENGINEERING ===== */
  social: [
    {
      trick: "Ishonch + shoshilinchlik",
      psych: "Firibgar o'zini bank deb tanishtirib ishonch uyg'otadi, \"shubhali to'lov\" bilan qo'rqitadi va o'ylashga vaqt bermaydi. Shoshilgan odam tekshirmaydi.",
      who: "Noma'lum raqam · \"Bank xodimi\"",
      lines: ["Assalomu alaykum, bankdan qo'ng'iroq qilyapmiz.", "Kartangizdan hozir shubhali to'lov bo'lyapti!", "Bloklash uchun SMS orqali kelgan kodni ayting, tezroq."],
      choices: [
        { text: "Kodni aytaman, pulim saqlanib qolsin", good: false, why: "Bank xodimi hech qachon SMS kodni so'ramaydi. Kod — bu sizning imzoingiz, uni aytish to'lovni tasdiqlash degani." },
        { text: "Go'shakni qo'yaman va kartaning orqasidagi rasmiy raqamga o'zim qo'ng'iroq qilaman", good: true, why: "To'g'ri. Aloqani har doim o'zingiz, rasmiy raqam orqali boshlang." },
        { text: "Avval ismi va lavozimini so'rayman, keyin kodni aytaman", good: false, why: "Firibgar istalgan ism va lavozimni aytadi. Bu hech narsani isbotlamaydi." }
      ]
    },
    {
      trick: "Qiziqish + xavotir",
      psych: "\"Rasmingni ko'rdim\" degan gap xavotir va qiziqishni bir vaqtda qo'zg'aydi. Odam his-tuyg'u bilan harakat qilib, havolani tekshirmasdan ochadi.",
      who: "Instagram · notanish akkaunt",
      lines: ["Seni rasmingni bir guruhda ko'rdim 😳", "Kim joylaganini bilasanmi? Mana qara:", "insta-photos-view.com/u/8812"],
      choices: [
        { text: "Havolani ochib ko'raman", good: false, why: "Qiziqish va xavotir — eng kuchli tuzoq. Havola soxta login sahifaga olib borib, parolingizni o'g'irlashi mumkin." },
        { text: "Javob bermayman, akkauntni bloklab, shikoyat qilaman", good: true, why: "To'g'ri. Notanishdan kelgan havolani ochmang. Haqiqatan xavotirda bo'lsangiz, yaqinlaringiz bilan gaplashing." },
        { text: "Do'stimga yuboraman, u ochib ko'rsin", good: false, why: "Bu xavfni do'stingizga o'tkazadi xolos." }
      ]
    },
    {
      trick: "Avtoritet + qo'rquv",
      psych: "Rasmiy tashkilot nomi (avtoritet) va akkaunt o'chirilishi tahdidi (qo'rquv) birga ishlatiladi. Odamlar \"rahbariyat\" talabiga savolsiz bo'ysunishga moyil.",
      who: "Email · \"Universitet IT bo'limi\"",
      lines: ["Sizning universitet pochtangiz to'lib qoldi.", "24 soat ichida login va parolingizni formaga kiritmasangiz, akkaunt o'chiriladi."],
      choices: [
        { text: "Formaga parolimni kiritaman", good: false, why: "IT bo'limi hech qachon parolni so'ramaydi. Muddat bilan qo'rqitish — phishing belgisi." },
        { text: "IT bo'limiga o'zim borib yoki rasmiy raqamga qo'ng'iroq qilib so'rayman", good: true, why: "To'g'ri. Mustaqil kanal orqali tekshirish — eng ishonchli usul." }
      ]
    },
    {
      trick: "Hamdardlik",
      psych: "Yaqin odam qiyin ahvolda degan his yordam berish istagini uyg'otadi. \"Gaplasha olmayman\" degan gap esa tekshirish yo'lini yopadi.",
      who: "Telegram · \"Opangiz\" (yangi raqam)",
      lines: ["Salom, bu men, telefonim buzildi, vaqtincha shu raqamdaman.", "Juda zarur, 300 ming tashlab tur, kechqurun qaytaraman.", "Hozir gaplasha olmayman, shunchaki shu kartaga: 8600 ****"],
      choices: [
        { text: "Darrov pul tashlayman — opam-ku", good: false, why: "Yangi raqam + pul + \"gaplasha olmayman\" — klassik sxema. Ovozini eshitmaguncha pul o'tkazmang." },
        { text: "Opamning eski raqamiga qo'ng'iroq qilaman yoki shaxsiy savol beraman", good: true, why: "To'g'ri. Faqat ikkalangiz biladigan narsani so'rang yoki boshqa kanal orqali tekshiring." },
        { text: "Karta egasining ismini so'rayman", good: false, why: "Firibgar istalgan ism aytadi yoki boshqa odamning kartasidan foydalanadi." }
      ]
    },
    {
      trick: "Foyda + eksklyuzivlik",
      psych: "Katta foyda va'dasi ochko'zlikni, \"faqat 10 kishi\" va \"oxirgi kun\" esa imkoniyatni boy berish qo'rquvini (FOMO) qo'zg'aydi.",
      who: "Telegram kanal · \"Kripto mentor\"",
      lines: ["Faqat 10 kishi uchun yopiq guruh! 🔥", "Bir haftada pulingizni 3 baravar qilamiz, kafolat 100%.", "Joy olish uchun 200$ to'lang, bugun oxirgi kun."],
      choices: [
        { text: "Kichik summa bilan sinab ko'raman", good: false, why: "Kafolatlangan katta foyda yo'q. \"Kichik summa\" ham yo'qoladi, keyin \"chiqarish uchun\" yana pul so'rashadi." },
        { text: "E'tibor bermayman — kafolatli foyda va'dasi firibgarlik belgisi", good: true, why: "To'g'ri. Shoshilinchlik + kafolat + eksklyuzivlik = firibgarlik formulasi." }
      ]
    },
    {
      trick: "Yordam so'rash (pretexting)",
      psych: "Pretexting — firibgar ishonarli bahona (\"yangi kursdoshman\") o'ylab topadi. Yaxshi odam yordam berishni xohlaydi va kod aslida o'ziniki ekanini sezmaydi.",
      who: "Telegram · \"Kursdosh\"",
      lines: ["Salom! Men yangi kursdoshman, Gmail'imga kira olmayapman.", "Tiklash kodi adashib sening raqamingga keldi shekilli, 6 xonali kod.", "Shuni yuborib yuborsang, rahmat!"],
      choices: [
        { text: "Yordam beraman, kodni yuboraman", good: false, why: "Bu kod sizning akkauntingizni tiklash kodi edi. Uni bersangiz, akkauntingizni yo'qotasiz." },
        { text: "Hech qanday kodni bermayman va bu odamni bloklayman", good: true, why: "To'g'ri. Sizga kelgan kod faqat sizniki. \"Adashib keldi\" degan gap — tuzoq." }
      ]
    },
    {
      trick: "Yutuq + shoshilinchlik",
      psych: "Kutilmagan sovg'a quvonch uyg'otadi va ehtiyotkorlikni pasaytiradi. \"Yetkazib berish uchun kichik to'lov\" esa arzimas tuyuladi — aslida maqsad karta ma'lumotlarini olish.",
      who: "SMS · \"Uzum Market aksiyasi\"",
      lines: ["Tabriklaymiz! Siz iPhone 16 yutib oldingiz 🎉", "Sovg'ani olish uchun 2 soat ichida yetkazib berish to'lovi 15 000 so'mni to'lang:", "uzum-prize-gift.top/claim"],
      choices: [
        { text: "15 000 so'm arzon, to'layman", good: false, why: "Hech qanday o'yinda qatnashmagan bo'lsangiz, yutuq ham yo'q. Saytga kiritilgan karta ma'lumotlari bilan hisobingizdan ancha katta summa yechiladi." },
        { text: "Havolani ochmayman; aksiya haqiqatmi — rasmiy ilova yoki saytdan o'zim tekshiraman", good: true, why: "To'g'ri. Rasmiy kompaniyalar .top kabi begona domenlardan foydalanmaydi va yutuq uchun pul so'ramaydi." },
        { text: "Do'stlarimga ham yuboraman, ular ham yutsin", good: false, why: "Bu firibgarlarga yordam berish — havola yana ko'p odamga tarqaladi." }
      ]
    },
    {
      trick: "Avtoritet + ish bosimi",
      psych: "Xabar rahbar nomidan va ish vazifasi sifatida keladi. Odamlar rahbarning talabini tekshirishni noqulay deb biladi — firibgar aynan shundan foydalanadi.",
      who: "Telegram · \"Rahbar\" (yangi akkaunt)",
      lines: ["Salom, bu men, Dilshod Akramovich. Yangi akkauntdan yozyapman.", "Ertangi yig'ilish uchun hisobotni shoshilinch ko'rib chiqing:", "📎 Hisobot_2026.pdf.exe"],
      choices: [
        { text: "Rahbar so'radi, faylni darhol ochaman", good: false, why: "\".pdf.exe\" — bu PDF emas, dastur. Ochilsa, kompyuterga zararli dastur (malware) o'rnatiladi." },
        { text: "Faylni ochmayman va rahbarga eski raqami yoki ishxonadagi rasmiy kanal orqali yozib tekshiraman", good: true, why: "To'g'ri. Yangi akkaunt + shoshilinchlik + g'alati fayl kengaytmasi — uchta xavf belgisi. Boshqa kanal orqali tasdiqlang." },
        { text: "Antivirus bor, ochsam bo'laveradi", good: false, why: "Antivirus har bir yangi zararli dasturni tanimaydi. Shubhali faylni umuman ochmang." }
      ]
    }
  ],

  /* ===== 3. SECURITY CHECK ===== */
  habits: [
    { text: "Har bir sayt uchun alohida parol ishlataman", points: 15, tip: "Har xil parollar ishlating — bitta sayt buzilsa, qolganlari xavfsiz qoladi." },
    { text: "Parollarim kamida 12 belgidan iborat", points: 10, tip: "Uzun parol yoki parol-ibora ishlating: masalan, 3 ta tasodifiy so'z." },
    { text: "Telegram, Instagram va Gmail'da 2FA yoqilgan", points: 15, tip: "Telegram: Sozlamalar → Maxfiylik → Ikki bosqichli tasdiqlash." },
    { text: "SMS kod va parolni hech kimga aytmayman", points: 15, tip: "Kodni hech kimga bermang — hatto \"bank xodimi\" yoki \"do'stingiz\"ga ham." },
    { text: "Telefon va ilovalarni o'z vaqtida yangilayman", points: 10, tip: "Yangilanishlar xavfsizlik teshiklarini yopadi." },
    { text: "Havolani ochishdan oldin domenni tekshiraman", points: 10, tip: "Domenni harfma-harf o'qing: micros0ft ≠ microsoft." },
    { text: "Profilim yopiq, manzil va telefonim ochiq emas", points: 10, tip: "Manzil, telefon, o'qish joyini ochiq profilda ko'rsatmang." },
    { text: "Ommaviy Wi-Fi'da bank ilovasiga kirmayman", points: 5, tip: "Ommaviy Wi-Fi'da to'lov qilmang yoki mobil internetdan foydalaning." },
    { text: "Telefonimda ekran qulfi (PIN / Face ID) bor", points: 5, tip: "Ekran qulfini yoqing — telefon yo'qolsa, ma'lumotlar himoyada qoladi." },
    { text: "Faol seanslarni vaqti-vaqti bilan tekshiraman", points: 5, tip: "Telegram: Sozlamalar → Qurilmalar. Tanimagan seansni yoping." }
  ],

  /* ===== 4. AI & DEEPFAKE ===== */
  ai: {
    cards: [
      { title: "Deepfake video", text: "Real odamning yuzi boshqa videoga qo'yiladi.", signs: ["ko'z qisish g'alati yoki umuman yo'q", "lab harakati ovozga mos emas", "yuz chegarasi va soch xira"] },
      { title: "Soxta ovoz (voice clone)", text: "Bir necha soniyalik audio orqali ovozni nusxalash mumkin.", signs: ["shoshilinch pul so'rash", "yangi raqamdan qo'ng'iroq", "savollarga g'alati, kechikib javob"] },
      { title: "AI rasmlar", text: "Haqiqiy suratdan farqlash qiyin bo'lgan soxta rasmlar.", signs: ["barmoqlar soni va shakli noto'g'ri", "fondagi matn ma'nosiz", "quloq, taqinchoq nosimmetrik"] },
      { title: "Oila kod so'zi", text: "Yaqinlaringiz bilan maxfiy kod so'z kelishib oling.", signs: ["shoshilinch qo'ng'iroqda kod so'zni so'rang", "kod so'zni internetda yozmang"] },
      { title: "Soxta profillar", text: "AI yaratgan yuz va matnlar bilan \"real odam\" profili yasaladi: tanishuv, ish taklifi yoki investitsiya uchun.", signs: ["profil yangi, kuzatuvchilar kam yoki sotib olingan", "rasmlar juda mukammal, boshqa joyda topilmaydi", "tez orada pul, kod yoki shaxsiy rasm so'raydi"] },
      { title: "AI phishing", text: "AI xatosiz, shaxsiy va ishonarli phishing xat yozadi — imlo xatosi endi belgi emas.", signs: ["ismingiz va tafsilotlar bor, lekin so'rov g'alati", "shoshilinchlik va havola", "parol, kod yoki to'lov so'raladi"] },
      { title: "Rasmlaringiz — xom ashyo", text: "Ochiq profildagi rasmlar deepfake uchun ishlatilishi mumkin.", signs: ["profilni yoping", "yuz aniq ko'ringan rasmlarni kamroq joylang"] }
    ],
    // Har qanday shubhali ovoz, video, rasm yoki profilni tekshirish tartibi
    verify: [
      { title: "Manba", text: "Kim yubordi? Rasmiy sahifa, tanish raqam yoki tasdiqlangan akkauntmi? Yangi raqam va yangi akkaunt — birinchi signal." },
      { title: "Kontekst", text: "Bu odam odatda shunday yozadimi yoki gapiradimi? Vaqt, joy va vaziyat mantiqqa to'g'ri keladimi?" },
      { title: "So'rov", text: "Pul, karta, SMS kod, parol yoki shaxsiy rasm so'ralyaptimi? Bunday so'rov — har doim to'xtash belgisi." },
      { title: "Shoshilinchlik", text: "\"Hozir\", \"tezroq\", \"hech kimga aytma\" — o'ylashga vaqt bermaslik firibgarlik belgisi." },
      { title: "Boshqa kanal", text: "Go'shakni qo'yib, tanish raqamga o'zingiz qo'ng'iroq qiling yoki oila kod so'zini so'rang." }
    ],
    quiz: [
      { q: "\"Onangiz\" yangi raqamdan qo'ng'iroq qilib, ovozi xuddi o'zinikidek, shoshilinch pul so'rayapti. Nima qilasiz?", options: ["Darhol pul o'tkazaman", "Go'shakni qo'yib, onamning eski raqamiga qo'ng'iroq qilaman", "Qaysi kartaga ekanini so'rayman"], correct: 1, why: "Ovozni AI bilan nusxalash mumkin. Har doim tanish raqam orqali qayta tekshiring." },
      { q: "Videoda mashhur odam \"investitsiya qiling\" deyapti, lekin lab harakati ovozga to'liq mos emas. Bu nima?", options: ["Oddiy internet sekinligi", "Ehtimoliy deepfake reklama", "Rasmiy reklama"], correct: 1, why: "Mashhur odamlar nomidan deepfake reklamalar ko'p. Rasmiy sahifasidan tekshiring." },
      { q: "Rasmda qo'lda 6 ta barmoq bor va fondagi yozuv ma'nosiz. Bu nimani bildiradi?", options: ["Rasm AI bilan yaratilgan bo'lishi mumkin", "Kamera buzuq", "Hech narsani"], correct: 0, why: "Barmoqlar va matn — AI rasmlarning eng ko'p xato qiladigan joylari." },
      { q: "Instagram'da chiroyli rasmli yangi profil ish taklif qilib, \"ro'yxatdan o'tish uchun\" SMS kodni so'rayapti. Bu:", options: ["Haqiqiy ish beruvchi", "Ehtimoliy soxta (AI) profil — kod bermayman", "Kodni bersam, ish beradi"], correct: 1, why: "Soxta profillar ko'pincha AI rasmlardan foydalanadi. Hech qanday ish beruvchi SMS kodingizni so'ramaydi." },
      { q: "Xat xatosiz, ismingiz bilan yozilgan va universitetingiz logotipi bor, lekin parolni havola orqali \"yangilash\"ni so'rayapti. Bu:", options: ["Xatosiz — demak haqiqiy", "AI phishing bo'lishi mumkin — saytga o'zim kiraman", "Logotip bor — xavfsiz"], correct: 1, why: "AI xatosiz va shaxsiy xat yozadi. Belgi — matn sifati emas, so'rovning o'zi: parol va havola." },
      { q: "Deepfake'dan himoyalanish uchun eng foydali odat qaysi?", options: ["Hech kimga ishonmaslik", "Oila bilan kod so'z kelishish va profilni yopiq tutish", "Telefonni o'chirib qo'yish"], correct: 1, why: "Kod so'z soxta qo'ng'iroqni fosh qiladi, yopiq profil esa rasmlaringizni himoya qiladi." }
    ]
  },

  /* ===== 5. DIGITAL IDENTITY ===== */
  identity: {
    cards: [
      { title: "Raqamli iz", text: "Internetdagi har bir post, like, izoh va ro'yxatdan o'tish iz qoldiradi. Bu iz yillar davomida saqlanadi va uni boshqalar topishi mumkin.", tip: "Ismingizni Google'da qidirib ko'ring — nimalar chiqadi?" },
      { title: "Shaxsiy ma'lumotlar", text: "Ism-familiya, telefon, uy manzili, pasport, karta raqami, o'qish joyi — bularning birikmasi sizni aniq topish imkonini beradi.", tip: "Pasport va karta rasmini chatga yubormang." },
      { title: "Maxfiylik sozlamalari", text: "Har bir ilovada kim profilingizni, raqamingizni va postlaringizni ko'rishini o'zingiz tanlaysiz.", tip: "Telegram: Sozlamalar → Maxfiylik → Telefon raqami → Hech kim." },
      { title: "Ijtimoiy tarmoqlar", text: "Yopiq profil — kim kuzatishini o'zingiz tanlaysiz. Notanish so'rovlar, ayniqsa yangi va rasmsiz akkauntlardan, ko'pincha firibgar yoki bot.", tip: "Notanish odamlarning so'rovlarini qabul qilmang." },
      { title: "Fotosuratlar", text: "Internetga tushgan rasm butunlay o'chmaydi: skrinshot qilinadi, saqlanadi, deepfake uchun ishlatilishi mumkin. Shaxsiy rasmlarni hech kimga yubormang.", tip: "Rasmdagi hujjat, manzil, avtomobil raqamiga e'tibor bering." },
      { title: "Geolokatsiya", text: "Rasmdagi joylashuv va real vaqtdagi stories qayerda ekaningizni ko'rsatadi. Bu sizni kuzatish imkonini beradi.", tip: "Joylashuvni qo'shmang, rasmni keyinroq joylang." },
      { title: "Raqamli obro'", text: "Bugungi post ertaga universitet, ish beruvchi yoki grant komissiyasi ko'radigan narsa bo'lishi mumkin.", tip: "Joylashdan oldin: \"Buni 5 yildan keyin ham ko'rsatishga tayyormanmi?\"" },
      { title: "Akkauntlarni himoyalash", text: "Raqamli shaxsingiz — bu akkauntlaringiz. Ulardan biri buzilsa, nomingizdan firibgarlik qilinishi mumkin.", tip: "Har bir akkauntda alohida parol va 2FA; faol seanslarni tekshiring." }
    ],
    help: [
      "Pul bermang va talablarni bajarmang — bu shantajni to'xtatmaydi.",
      "Yozishmalar, akkaunt nomi va havolalarning skrinshotini saqlang.",
      "O'chirmang, lekin javob ham bermang. Akkauntni bloklang.",
      "Ishonchli kattalarga, ota-onangizga yoki o'qituvchingizga ayting.",
      "Ijtimoiy tarmoqqa shikoyat yuboring va huquq-tartibot organlariga murojaat qiling (102).",
      "Bu sizning aybingiz emas. Yordam so'rash — kuch belgisi."
    ],
    quiz: [
      { q: "Kafeda o'tirib, rasm joylamoqchisiz. Eng xavfsiz yo'l qaysi?", options: ["Joylashuv bilan hozir joylash", "Joylashuvsiz, uyga qaytgach joylash", "Stories'ga jonli efir"], correct: 1, why: "Real vaqtdagi joylashuv sizni kuzatish imkonini beradi." },
      { q: "Qaysi ma'lumotni ochiq profilda ko'rsatish xavfsizroq?", options: ["Uy manzili", "Qiziqishlaringiz (kitob, sport)", "Telefon raqami"], correct: 1, why: "Manzil va telefon sizni topish imkonini beradi, qiziqishlar esa bermaydi." },
      { q: "Internetda tanishgan odam shaxsiy rasm so'rayapti, \"faqat menga\" deydi. Nima qilasiz?", options: ["Yuboraman, unga ishonaman", "Yubormayman va kerak bo'lsa bloklayman", "Yuzimsiz rasm yuboraman"], correct: 1, why: "Yuborilgan rasm ustidan nazorat yo'qoladi va u shantaj uchun ishlatilishi mumkin." },
      { q: "Yangi talaba guvohnomangiz bilan rasm joylamoqchisiz. Nima qilish kerak?", options: ["Shundayligicha joylash", "Ism, raqam va QR-kodni yopib joylash yoki umuman joylamaslik", "Faqat do'stlarga yuborish"], correct: 1, why: "Hujjatdagi ma'lumotlar identity theft (shaxsni o'g'irlash) uchun ishlatilishi mumkin." },
      { q: "Kimdir rasmingiz bilan qo'rqitib, pul so'rayapti. Birinchi qadam?", options: ["Pul beraman, tinchisin", "Dalillarni saqlab, kattalarga va 102 ga murojaat qilaman", "Hamma narsani o'chirib, hech kimga aytmayman"], correct: 1, why: "Pul berish shantajni kuchaytiradi. Dalillar va yordam — to'g'ri yo'l." }
    ]
  },

  /* ===== LEARN: 10 ta asosiy kiberxavf =====
     Har biri: nima bu → qanday ishlaydi → qanday tanish mumkin → qanday himoyalanish. */
  threats: [
    { id: "phishing", title: "Phishing", icon: "mail",
      what: "Soxta xat, SMS yoki sayt orqali parol, karta yoki shaxsiy ma'lumotlarni o'g'irlash.",
      how: "Firibgar taniqli kompaniya (bank, Instagram, universitet) nomidan xabar yuboradi. Havola asl saytga o'xshash soxta sahifaga olib boradi va kiritilgan ma'lumotlar firibgarga ketadi.",
      recognize: ["shoshilinchlik yoki qo'rqitish", "begona yoki o'xshash domen (micros0ft.com)", "parol, kod yoki karta ma'lumotini so'rash", "kutilmagan ilova yoki havola"],
      protect: ["havolaga bosmasdan, rasmiy ilova yoki saytni o'zingiz oching", "domenni harfma-harf o'qing", "2FA yoqing", "shubhali xatni xabar qiling va o'chiring"] },
    { id: "social", title: "Social Engineering", icon: "chat",
      what: "Texnikani emas, odamni aldash: ishonch, qo'rquv, qiziqish, hamdardlik va shoshilinchlikdan foydalanish.",
      how: "Firibgar o'zini bank xodimi, do'st, rahbar yoki texnik yordam deb tanishtiradi va ishonarli bahona (pretext) bilan kod, pul yoki ma'lumot so'raydi.",
      recognize: ["kutilmagan qo'ng'iroq yoki xabar", "kuchli his-tuyg'u: qo'rquv, quvonch, xavotir", "\"hech kimga aytma\", \"tezroq\"", "aloqa kanalini o'zgartirishni so'rash"],
      protect: ["to'xtang va o'ylang", "aloqani o'zingiz, rasmiy kanal orqali qayta boshlang", "SMS kod va parolni hech kimga bermang"] },
    { id: "takeover", title: "Account Takeover", icon: "lock",
      what: "Akkauntingizni boshqa odam egallab olishi: Telegram, Instagram, Gmail yoki bank ilovasi.",
      how: "Parol phishing, sizib chiqqan baza yoki SMS kodni aldab olish orqali qo'lga kiritiladi. So'ng firibgar parolni almashtiradi va nomingizdan do'stlaringizga yozadi.",
      recognize: ["\"yangi qurilmadan kirildi\" xabari", "o'zingiz so'ramagan tasdiqlash kodi", "do'stlarga siz yubormagan xabarlar", "parol ishlamay qolishi"],
      protect: ["har bir akkauntda alohida kuchli parol", "2FA (Telegram'da qo'shimcha parol)", "faol seanslarni tekshirish", "zaxira email va telefonni yangilab turish"] },
    { id: "malware", title: "Malware", icon: "x",
      what: "Zararli dastur: virus, troyan, spyware, ransomware — qurilmaga zarar yetkazadi yoki ma'lumotni o'g'irlaydi.",
      how: "Fayl (.apk, .exe, .pdf.exe), soxta ilova yoki buzilgan sayt orqali o'rnatiladi va fonda ishlaydi.",
      recognize: ["\"Rasmlar.apk\", \"Hisobot.pdf.exe\" kabi fayllar", "ilova ortiqcha ruxsat so'raydi (SMS, kontaktlar)", "telefon qiziydi, sekinlashadi, reklama ko'payadi"],
      protect: ["faqat rasmiy do'kondan ilova o'rnatish", "notanish fayllarni ochmaslik", "qurilma va ilovalarni yangilab turish", "muhim fayllarning zaxira nusxasi"] },
    { id: "password", title: "Password Attacks", icon: "lock",
      what: "Parolni taxmin qilish, terib ko'rish yoki boshqa saytdan sizib chiqqan parolni sinash.",
      how: "Brute force — barcha variantlarni terib ko'rish; dictionary — mashhur parollar ro'yxati; credential stuffing — bitta saytdan sizib chiqqan parolni boshqa saytlarda sinash.",
      recognize: ["muvaffaqiyatsiz kirish urinishlari haqida xabar", "parolingiz ma'lumotlar sizib chiqishida bor (haveibeenpwned.com)"],
      protect: ["kamida 12 belgili parol yoki parol-ibora", "har bir sayt uchun alohida parol", "parol menejeri", "2FA"] },
    { id: "leak", title: "Data Leakage", icon: "eye",
      what: "Shaxsiy ma'lumotlarning ruxsatsiz oshkor bo'lishi — kompaniya bazasidan yoki o'zimizning ehtiyotsizligimiz tufayli.",
      how: "Sayt buzilib bazasi tarqaladi; yoki biz o'zimiz pasport rasmini chatga, uy manzilini ochiq profilga joylaymiz.",
      recognize: ["xizmatdan \"ma'lumotlar sizib chiqdi\" xabari", "sizni ism bilan chaqiradigan notanish spam", "ma'lumotingiz qidiruvda chiqishi"],
      protect: ["kerakmas joyga ma'lumot bermaslik", "maxfiylik sozlamalari", "sizib chiqqan saytda parolni darhol almashtirish"] },
    { id: "identity", title: "Identity Theft", icon: "user",
      what: "Sizning nomingiz va ma'lumotlaringizdan foydalanib firibgarlik qilish.",
      how: "Pasport rasmi, ism va rasmlar orqali soxta akkaunt ochiladi, nomingizdan kredit olinadi yoki tanishlaringizdan pul so'raladi.",
      recognize: ["siz ochmagan akkaunt yoki kredit", "do'stlar \"sen pul so'radingmi?\" deb so'rashi", "nomingizdagi soxta profil"],
      protect: ["hujjat rasmlarini yubormaslik", "soxta profil haqida darhol shikoyat qilish", "akkauntlarni 2FA bilan himoyalash"] },
    { id: "scams", title: "Online Scams", icon: "star",
      what: "Internetdagi firibgarlik: soxta do'kon, yutuq, ish, ijara yoki investitsiya taklifi.",
      how: "Juda yaxshi taklif ko'rsatiladi, oldindan to'lov olinadi va firibgar yo'qoladi. Ba'zan \"pulni chiqarish uchun\" yana to'lov so'raladi.",
      recognize: ["haddan tashqari arzon narx yoki kafolatli foyda", "faqat oldindan to'lov, kartadan kartaga", "\"bugun oxirgi kun\"", "o'yinda qatnashmagan holda yutuq"],
      protect: ["sotuvchi va saytni tekshirish, sharhlarni o'qish", "xavfsiz to'lov usuli", "kafolatli foyda va'dasiga ishonmaslik"] },
    { id: "aiscams", title: "AI Scams", icon: "eye",
      what: "Sun'iy intellekt yordamida yasalgan firibgarlik: AI phishing xatlar, chat-botlar, soxta profillar.",
      how: "AI xatosiz, shaxsiy va ishonarli matn yozadi, real odamga o'xshash profil yaratadi va ko'p odam bilan bir vaqtda suhbatlashadi.",
      recognize: ["juda mukammal, lekin g'alati so'rov", "yangi profil tez orada pul yoki kod so'raydi", "boshqa joyda topilmaydigan rasmlar"],
      protect: ["matn sifatiga emas, so'rovning o'ziga qarang", "manba va kontekstni tekshiring", "pul va kodni hech qachon chatda bermang"] },
    { id: "deepfake", title: "Deepfake", icon: "eye",
      what: "AI yordamida yaratilgan soxta video, ovoz yoki rasm, unda real odam aytmagan narsani aytadi.",
      how: "Bir necha rasm yoki soniyalik ovoz yozuvidan AI model odamning yuzi va ovozini nusxalaydi.",
      recognize: ["lab harakati ovozga mos emas", "ko'z qisish g'alati, yuz chegarasi xira", "yaqin odam ovozi yangi raqamdan shoshilinch pul so'raydi"],
      protect: ["oila kod so'zi", "tanish raqamga qayta qo'ng'iroq", "rasmiy manbadan tekshirish", "profilni yopiq tutish"] }
  ],

  /* ===== 6. CYBER LIBRARY =====
     Har bir mavzu: Definition → Example → Warning Signs → Protection.
     core: true — roadmap'dagi 10 ta asosiy mavzu (birinchi ko'rsatiladi). */
  library: [
    { term: "Phishing", cat: "Hujumlar", core: true, def: "Soxta xabar yoki sayt orqali parol, karta ma'lumotlarini o'g'irlash.", example: "\"Akkauntingiz bloklanadi, mana bu havoladan kiring\" degan xat.", signs: "Shoshilinchlik, begona domen, parol yoki kod so'rash.", protect: "Domenni tekshiring, havola o'rniga rasmiy ilovani o'zingiz oching." },
    { term: "Malware", cat: "Hujumlar", core: true, def: "Zararli dastur: virus, troyan, spyware.", example: "\"Rasmlar.apk\" nomli fayl Telegramda.", signs: ".apk/.exe fayllar, ortiqcha ruxsat so'raydigan ilova, qurilma sekinlashishi.", protect: "Faqat rasmiy do'kondan ilova o'rnating, notanish fayllarni ochmang." },
    { term: "Social Engineering", cat: "Hujumlar", core: true, def: "Texnikani emas, odamning psixologiyasini aldash: ishonch, qo'rquv, qiziqish.", example: "\"Bank xodimi\" qo'ng'iroq qilib SMS kod so'rashi.", signs: "Kutilmagan aloqa, kuchli his-tuyg'u, \"hech kimga aytma\", shoshilinchlik.", protect: "Aloqani o'zingiz, rasmiy kanal orqali qayta boshlang." },
    { term: "Password Security", cat: "Himoya", core: true, def: "Akkauntni himoya qiluvchi parolni kuchli va takrorlanmas qilish.", example: "Yomon: 12345678. Yaxshi: daryo-limon-velosiped-42.", signs: "Bitta parol hamma joyda, qisqa parol, ism + tug'ilgan yil.", protect: "Uzun va takrorlanmaydigan parol, parol menejeri." },
    { term: "Two-Factor Authentication (2FA)", cat: "Himoya", core: true, def: "Ikki bosqichli himoya: paroldan tashqari ikkinchi tasdiq (kod, ilova, kalit).", example: "Telegram'dagi qo'shimcha parol.", signs: "So'ramagan tasdiqlash kodi keldi — kimdir parolingiz bilan kirmoqchi.", protect: "Barcha muhim akkauntlarda yoqing; kodni hech kimga bermang." },
    { term: "Network Security", cat: "Tarmoq", core: true, def: "Uy va ommaviy tarmoqlarda ma'lumotlarni himoya qilish: Wi-Fi, router, shifrlash.", example: "Kafedagi parolsiz \"Free_WiFi\" orqali bank ilovasiga kirish.", signs: "Parolsiz yoki nomi shubhali Wi-Fi, brauzerda sertifikat ogohlantirishi.", protect: "Ommaviy Wi-Fi'da to'lov qilmang, router parolini almashtiring, mobil internetdan foydalaning." },
    { term: "Digital Identity", cat: "Maxfiylik", core: true, def: "Internetdagi raqamli shaxsingiz: akkauntlar, rasmlar, postlar.", example: "Ismingizni Google'da qidirganda chiqadigan narsalar.", signs: "Nomingizdagi soxta profil, ochiq manzil va telefon.", protect: "Vaqti-vaqti bilan o'zingizni qidirib ko'ring, profilni yoping." },
    { term: "AI Security", cat: "AI", core: true, def: "Sun'iy intellektdan xavfsiz foydalanish va AI orqali qilinadigan hujumlardan himoyalanish.", example: "AI chat-botga pasport rasmini yuklash yoki AI yozgan xatosiz phishing xat.", signs: "Juda ishonarli, lekin pul yoki kod so'raydigan xabar; AI ilovasi ortiqcha ma'lumot so'raydi.", protect: "AI xizmatlariga shaxsiy ma'lumot yuklamang; matn sifatiga emas, so'rovga qarang." },
    { term: "Deepfake", cat: "AI", core: true, def: "AI yordamida yaratilgan soxta video, ovoz yoki rasm.", example: "Mashhur odam nomidan soxta investitsiya reklamasi.", signs: "Lab harakati ovozga mos emas, yangi raqamdan tanish ovoz pul so'raydi.", protect: "Rasmiy manbadan tekshiring, oila kod so'zini ishlating." },
    { term: "Online Scams", cat: "Hujumlar", core: true, def: "Internetdagi firibgarlik: soxta do'kon, yutuq, ish yoki investitsiya.", example: "\"iPhone yutdingiz, yetkazib berish uchun 15 000 so'm to'lang\".", signs: "Haddan tashqari arzon, kafolatli foyda, faqat oldindan to'lov, \"bugun oxirgi kun\".", protect: "Sotuvchini tekshiring, oldindan kartaga pul o'tkazmang." },
    { term: "Smishing / Vishing", cat: "Hujumlar", def: "SMS (smishing) yoki telefon qo'ng'irog'i (vishing) orqali phishing.", example: "\"Posilkangiz to'xtatildi, 3 500 so'm to'lang\" SMS.", signs: "Noma'lum raqam, kichik to'lov va havola, kod so'rash.", protect: "SMS'dagi havolaga bosmang, qo'ng'iroqda kod aytmang." },
    { term: "Ransomware", cat: "Hujumlar", def: "Fayllarni shifrlab, qaytarish uchun pul talab qiladigan dastur.", example: "Kompyuterda \"fayllaringiz shifrlandi, 500$ to'lang\" yozuvi.", signs: "Fayllar ochilmaydi, kengaytmasi o'zgargan, to'lov talabi.", protect: "Muhim fayllarning zaxira nusxasini saqlang." },
    { term: "Typosquatting", cat: "Hujumlar", def: "Mashhur domenga o'xshash nom bilan soxta sayt ochish.", example: "micros0ft.com, instagrarn.com.", signs: "Domendagi o'xshash harflar: 0/o, rn/m, l/I, qo'shimcha so'z.", protect: "Domenni harfma-harf o'qing, saytlarni xatcho'pdan oching." },
    { term: "Password Manager", cat: "Himoya", def: "Barcha parollarni shifrlangan holda saqlovchi dastur.", example: "Bitwarden, iCloud Keychain.", signs: "Parollarni daftarda yoki Notes'da saqlash — xavf belgisi.", protect: "Bitta kuchli asosiy parol + 2FA." },
    { term: "VPN", cat: "Tarmoq", def: "Internet trafigini shifrlangan tunnel orqali o'tkazadi.", example: "Ommaviy Wi-Fi'da ishlash.", signs: "Noma'lum bepul VPN ko'p ruxsat so'raydi va reklama ko'rsatadi.", protect: "Faqat ishonchli VPN ishlating; bepul VPN ma'lumot sotishi mumkin." },
    { term: "Firewall", cat: "Tarmoq", def: "Kiruvchi va chiquvchi tarmoq ulanishlarini filtrlovchi himoya devori.", example: "Windows Defender Firewall.", signs: "Noma'lum dastur internetga ulanish ruxsatini so'raydi.", protect: "O'chirib qo'ymang." },
    { term: "DNS", cat: "Tarmoq", def: "Sayt nomini (google.com) IP manzilga aylantiruvchi tizim.", example: "DNS spoofing — soxta saytga yo'naltirish.", signs: "To'g'ri manzil yozilgan, lekin sayt g'alati ko'rinadi yoki sertifikat xatosi.", protect: "Ishonchli tarmoq va HTTPS saytlardan foydalaning." },
    { term: "HTTPS", cat: "Tarmoq", def: "Brauzer va sayt orasidagi shifrlangan ulanish.", example: "Manzil satridagi qulf belgisi.", signs: "Qulf bor, lekin domen begona — bu ham phishing bo'lishi mumkin.", protect: "Esda tuting: phishing saytlar ham HTTPS ishlatadi — qulf xavfsizlik kafolati emas." },
    { term: "Personal Data", cat: "Maxfiylik", def: "Sizni aniqlash mumkin bo'lgan ma'lumot: ism, telefon, manzil, pasport.", example: "Pasport rasmini chatga yuborish.", signs: "Sabab ko'rsatmasdan hujjat yoki manzil so'rash.", protect: "Faqat rasmiy va zarur joylarda bering." },
    { term: "Data Breach", cat: "Maxfiylik", def: "Kompaniyadan foydalanuvchi ma'lumotlarining sizib chiqishi.", example: "Sayt bazasi internetga tarqalishi.", signs: "Xizmatdan ogohlantirish xati, emailingizga spam ko'payishi.", protect: "Har xil parollar, haveibeenpwned.com orqali tekshirish." },
    { term: "Sextortion", cat: "Maxfiylik", def: "Shaxsiy rasm yoki video bilan shantaj qilish.", example: "\"Pul bermasang, rasmni tarqataman\".", signs: "Notanish tez yaqinlashadi, shaxsiy rasm so'raydi, keyin tahdid qiladi.", protect: "Pul bermang, dalil saqlang, yordam so'rang (102)." }
  ],

  /* ===== BOSHLANG'ICH VA YAKUNIY TEST (eksperiment uchun) =====
     Ikkala testda bir xil savollar — natijani solishtirish uchun. */
  test: [
    { cat: "Phishing", q: "\"Your account will be suspended within 30 minutes. Verify now: http://insta-verify.co\" — bu xabar:", options: ["Xavfsiz, Instagram'dan", "Phishing", "Bilmayman"], correct: 1 },
    { cat: "Phishing", q: "Qaysi domen Microsoft'ga tegishli EMAS?", options: ["microsoft.com", "micros0ft-support.com", "account.microsoft.com"], correct: 1 },
    { cat: "Phishing", q: "Saytda qulf belgisi (HTTPS) bor. Bu nimani anglatadi?", options: ["Sayt 100% xavfsiz", "Ulanish shifrlangan, lekin sayt soxta bo'lishi mumkin", "Sayt davlatga tegishli"], correct: 1 },
    { cat: "Social Engineering", q: "\"Bank xodimi\" qo'ng'iroq qilib SMS kodni so'rayapti. To'g'ri harakat:", options: ["Kodni aytish", "Go'shakni qo'yib, rasmiy raqamga o'zim qo'ng'iroq qilish", "Ismini so'rab, keyin aytish"], correct: 1 },
    { cat: "Social Engineering", q: "Do'stingiz yangi raqamdan shoshilinch pul so'rayapti. Nima qilasiz?", options: ["Darhol o'tkazaman", "Uning eski raqamiga qo'ng'iroq qilib tekshiraman", "Karta egasining ismini so'rayman"], correct: 1 },
    { cat: "Account Security", q: "Eng kuchli parol qaysi?", options: ["Nozima2005", "12345678", "daryo-limon-velosiped-42"], correct: 2 },
    { cat: "Account Security", q: "2FA nima?", options: ["Ikki bosqichli tasdiqlash", "Ikkita akkaunt ochish", "Antivirus turi"], correct: 0 },
    { cat: "AI Threats", q: "\"Onangiz\" ovozi bilan yangi raqamdan pul so'rashdi. Ovoz juda o'xshash. Bu:", options: ["Albatta onam", "AI soxta ovoz bo'lishi mumkin — tekshirish kerak", "Telefon xatosi"], correct: 1 },
    { cat: "Digital Identity", q: "Qaysi biri ochiq profil uchun xavfli?", options: ["Sevimli kitob", "Uy manzili va real vaqt joylashuvi", "Sport bilan shug'ullanish"], correct: 1 },
    { cat: "Digital Identity", q: "Kimdir shaxsiy rasm bilan shantaj qilsa, birinchi qadam:", options: ["Pul berish", "Dalil saqlash va yordam so'rash", "Hech kimga aytmaslik"], correct: 1 }
  ]
};
