// CyberShield Girls — interaktiv modullar
// Barcha ma'lumotlar shu faylda: server ham, baza ham kerak emas (1-bosqich).

// Yordamchi: element yaratish (innerHTML o'rniga — XSS'dan xavfsizroq)
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderFeedback(box, ok, title, explanation, flags) {
  box.replaceChildren();
  box.className = "feedback " + (ok ? "ok" : "bad");
  box.append(el("h4", "", title), el("p", "", explanation));
  if (flags && flags.length) {
    const list = el("ul");
    flags.forEach(f => list.append(el("li", "", f)));
    box.append(list);
  }
  box.hidden = false;
}

/* ============ 1. PHISHING DETECTOR ============ */
const phishingMessages = [
  {
    from: "Instagram Security <security@insta-verify-help.com>",
    text: "Your account will be suspended within 30 minutes. Verify your account now:",
    link: "http://instagram-verify-login.co/secure",
    answer: "phishing",
    flags: [
      "Shoshilinchlik: \"30 daqiqa ichida\" — o'ylashga vaqt bermaslik uchun.",
      "Bloklash bilan qo'rqitish.",
      "Domen soxta: insta-verify-help.com — Instagram'ning rasmiy domeni emas.",
      "Havola http:// bilan va begona domenga olib boradi."
    ]
  },
  {
    from: "Telegram: Do'stingiz Madina",
    text: "Salom! Men tanlovda qatnashyapman, iltimos ovoz berib yubor, telefon raqamingni kiritib, SMS kodni yozsang bo'ldi:",
    link: "https://golosovanie-konkurs.top",
    answer: "phishing",
    flags: [
      "Tanish odam nomidan — uning akkaunti allaqachon buzilgan bo'lishi mumkin.",
      "SMS kodni so'rash = akkauntingizni o'g'irlash urinishi.",
      "Shubhali .top domeni."
    ]
  },
  {
    from: "Universitet dekanati (rasmiy kanal)",
    text: "Ertangi kuni 10:00 da 204-xonada guruh yig'ilishi bo'ladi. Qatnashish majburiy.",
    link: "",
    answer: "safe",
    flags: [
      "Havola yo'q, parol yoki kod so'ralmayapti.",
      "Rasmiy kanal, oddiy ma'lumot.",
      "Shunday bo'lsa ham, shubha bo'lsa — kuratordan tekshirib oling."
    ]
  },
  {
    from: "Click <no-reply@click-bonus-uz.net>",
    text: "Tabriklaymiz! Siz 500 000 so'm bonus yutdingiz. Olish uchun karta raqami va CVV kodini kiriting:",
    link: "https://click-bonus-uz.net/prize",
    answer: "phishing",
    flags: [
      "\"Yutuq\" — foyda olish istagidan foydalanish.",
      "Hech bir bank yoki to'lov tizimi CVV kodni so'ramaydi.",
      "Domen rasmiy emas."
    ]
  },
  {
    from: "Google <no-reply@accounts.google.com>",
    text: "Akkauntingizga Windows qurilmasidan yangi kirish bo'ldi. Agar bu siz bo'lsangiz, hech narsa qilish shart emas.",
    link: "",
    answer: "safe",
    flags: [
      "Rasmiy domen: accounts.google.com.",
      "Hech narsa bosishni yoki kiritishni talab qilmayapti.",
      "Maslahat: tekshirish uchun xabardagi havolani emas, ilovani o'zini oching."
    ]
  },
  {
    from: "HR Manager <jobs.career.uz@gmail.com>",
    text: "Sizga uydan ishlash taklifi: kuniga 2 soat, oyiga 15 mln so'm. Ro'yxatdan o'tish uchun 100 000 so'm to'lov qiling.",
    link: "https://bit.ly/3xJob",
    answer: "phishing",
    flags: [
      "Haddan tashqari yaxshi taklif.",
      "Ish uchun oldindan pul so'rash — firibgarlik belgisi.",
      "Qisqartirilgan havola (bit.ly) haqiqiy manzilni yashiradi.",
      "Kompaniya emas, oddiy gmail manzil."
    ]
  }
];

let phishIndex = 0;
let phishScore = 0;

function showPhishMessage() {
  const msg = phishingMessages[phishIndex];
  document.getElementById("phish-progress").textContent = `${phishIndex + 1} / ${phishingMessages.length}`;
  document.getElementById("phish-from").textContent = "Kimdan: " + msg.from;

  const textBox = document.getElementById("phish-text");
  textBox.replaceChildren(document.createTextNode(msg.text + " "));
  if (msg.link) textBox.append(el("span", "link", msg.link));

  document.querySelectorAll("#phish-actions .btn").forEach(b => (b.disabled = false));
  document.getElementById("phish-feedback").hidden = true;
  document.getElementById("phish-next").hidden = true;
}

function answerPhish(choice) {
  const msg = phishingMessages[phishIndex];
  const correct = choice === msg.answer;
  if (correct) phishScore++;
  document.getElementById("phish-score").textContent = phishScore;
  document.querySelectorAll("#phish-actions .btn").forEach(b => (b.disabled = true));

  const verdict = msg.answer === "phishing" ? "Bu phishing edi." : "Bu xavfsiz xabar edi.";
  renderFeedback(
    document.getElementById("phish-feedback"),
    correct,
    correct ? "To'g'ri!" : "Xato",
    verdict + " Belgilar:",
    msg.flags
  );

  const next = document.getElementById("phish-next");
  next.textContent = phishIndex < phishingMessages.length - 1 ? "Keyingi xabar →" : "Natijani ko'rish";
  next.hidden = false;
}

function nextPhish() {
  phishIndex++;
  if (phishIndex < phishingMessages.length) {
    showPhishMessage();
    return;
  }
  // Test tugadi
  const total = phishingMessages.length;
  document.getElementById("phish-progress").textContent = "Test tugadi";
  document.getElementById("phish-from").textContent = "";
  document.getElementById("phish-text").textContent = `Natija: ${phishScore} / ${total}`;
  document.querySelectorAll("#phish-actions .btn").forEach(b => (b.disabled = true));
  renderFeedback(
    document.getElementById("phish-feedback"),
    phishScore >= total - 1,
    phishScore >= total - 1 ? "Ajoyib!" : "Yana mashq qiling",
    "Asosiy qoida: shoshiltirish, qo'rqitish, yutuq va'da qilish yoki kod/parol so'rash — har doim to'xtab o'ylash uchun signal."
  );
  const next = document.getElementById("phish-next");
  next.textContent = "Qaytadan boshlash";
  next.onclick = () => {
    phishIndex = 0;
    phishScore = 0;
    document.getElementById("phish-score").textContent = 0;
    next.onclick = nextPhish;
    showPhishMessage();
  };
}

document.querySelectorAll("#phish-actions .btn").forEach(btn =>
  btn.addEventListener("click", () => answerPhish(btn.dataset.answer))
);
document.getElementById("phish-next").onclick = nextPhish;

/* ============ 2. SOCIAL ENGINEERING SIMULATOR ============ */
const socialScenarios = [
  {
    trick: "Usul: ishonch + shoshilinch",
    text: "Telefon qo'ng'irog'i: \"Assalomu alaykum, bankdan qo'ng'iroq qilyapmiz. Kartangizdan shubhali to'lov bo'lyapti. Bloklash uchun hozir SMS orqali kelgan kodni ayting.\"",
    choices: [
      { text: "Kodni aytaman, pulim saqlanib qolsin", good: false, why: "Bank xodimi hech qachon SMS kodni so'ramaydi. Kod — bu sizning imzoingiz." },
      { text: "Go'shakni qo'yib, kartaning orqasidagi rasmiy raqamga o'zim qo'ng'iroq qilaman", good: true, why: "To'g'ri. Aloqani o'zingiz boshlang — rasmiy raqam orqali." },
      { text: "Avval ismini so'rayman, keyin kodni aytaman", good: false, why: "Firibgar istalgan ismni aytadi. Ism hech narsani isbotlamaydi." }
    ]
  },
  {
    trick: "Usul: qiziqish",
    text: "Instagram'da notanish akkaunt yozdi: \"Seni rasmingni bir guruhda ko'rdim 😳 mana qara:\" va havola yubordi.",
    choices: [
      { text: "Havolani ochib ko'raman", good: false, why: "Qiziqish va xavotir — eng kuchli tuzoq. Havola soxta login sahifaga olib borishi mumkin." },
      { text: "Javob bermayman, akkauntni bloklab, shikoyat qilaman", good: true, why: "To'g'ri. Notanishdan kelgan havolani ochmang." },
      { text: "Do'stimga yuboraman, u ochib ko'rsin", good: false, why: "Bu xavfni do'stingizga o'tkazadi xolos." }
    ]
  },
  {
    trick: "Usul: avtoritet + qo'rquv",
    text: "Email: \"Universitet IT bo'limi. Sizning pochtangiz to'lib qoldi. 24 soat ichida login va parolingizni ushbu formaga kiritmasangiz, akkaunt o'chiriladi.\"",
    choices: [
      { text: "Formaga parolimni kiritaman", good: false, why: "IT bo'limi hech qachon parolni so'ramaydi. Muddat bilan qo'rqitish — phishing belgisi." },
      { text: "IT bo'limiga o'zim borib yoki rasmiy raqamga qo'ng'iroq qilib so'rayman", good: true, why: "To'g'ri. Mustaqil kanal orqali tekshirish — eng ishonchli usul." }
    ]
  }
];

let socialIndex = 0;

function showScenario() {
  const s = socialScenarios[socialIndex];
  document.getElementById("social-progress").textContent = `Vaziyat ${socialIndex + 1} / ${socialScenarios.length}`;
  document.getElementById("social-trick").textContent = s.trick;
  document.getElementById("social-text").textContent = s.text;
  document.getElementById("social-feedback").hidden = true;
  document.getElementById("social-next").hidden = true;

  const box = document.getElementById("social-choices");
  box.replaceChildren();
  s.choices.forEach(choice => {
    const btn = el("button", "btn", choice.text);
    btn.addEventListener("click", () => {
      box.querySelectorAll("button").forEach(b => (b.disabled = true));
      renderFeedback(document.getElementById("social-feedback"), choice.good, choice.good ? "Xavfsiz qaror" : "Xavfli qaror", choice.why);
      const next = document.getElementById("social-next");
      next.textContent = socialIndex < socialScenarios.length - 1 ? "Keyingi vaziyat →" : "Qaytadan boshlash";
      next.hidden = false;
    });
    box.append(btn);
  });
}

document.getElementById("social-next").addEventListener("click", () => {
  socialIndex = (socialIndex + 1) % socialScenarios.length;
  showScenario();
});

/* ============ 3. ACCOUNT SECURITY CHECK ============ */
const habits = [
  { text: "Har bir sayt uchun alohida parol ishlataman", points: 15, tip: "Har xil parollar ishlating — bitta sayt buzilsa, qolganlari xavfsiz qoladi." },
  { text: "Parollarim kamida 12 belgidan iborat", points: 10, tip: "Uzun parol yoki parol-ibora (passphrase) ishlating." },
  { text: "Muhim akkauntlarda 2FA yoqilgan", points: 20, tip: "Telegram, Instagram, Gmail'da 2FA (ikki bosqichli himoya) yoqing." },
  { text: "SMS kod va parolni hech kimga aytmayman", points: 15, tip: "Kodni hech kimga bermang — hatto \"bank xodimi\"ga ham." },
  { text: "Telefon va ilovalarni o'z vaqtida yangilayman", points: 10, tip: "Yangilanishlar xavfsizlik teshiklarini yopadi." },
  { text: "Notanish havolalarni ochishdan oldin tekshiraman", points: 10, tip: "Havolani ochishdan oldin domenni diqqat bilan o'qing." },
  { text: "Profilim yopiq, shaxsiy ma'lumotlarni ochiq qo'ymayman", points: 10, tip: "Manzil, telefon, o'qish joyini ochiq profilda ko'rsatmang." },
  { text: "Ommaviy Wi-Fi'da bank ilovasiga kirmayman", points: 10, tip: "Ommaviy Wi-Fi'da to'lov qilmang yoki VPN ishlating." }
];

const form = document.getElementById("account-form");
habits.forEach((h, i) => {
  const label = el("label", "check");
  const box = document.createElement("input");
  box.type = "checkbox";
  box.id = "habit-" + i;
  box.addEventListener("change", updateScore);
  label.append(box, el("span", "", h.text));
  form.append(label);
});

function updateScore() {
  let score = 0;
  const tips = document.getElementById("score-tips");
  tips.replaceChildren();
  habits.forEach((h, i) => {
    if (document.getElementById("habit-" + i).checked) score += h.points;
    else tips.append(el("li", "", h.tip));
  });

  document.getElementById("cyber-score").textContent = score;
  const ring = document.querySelector(".score-ring");
  const level = document.getElementById("score-level");
  if (score >= 80) { level.textContent = "Yuqori himoya"; ring.style.borderColor = "var(--safe)"; }
  else if (score >= 50) { level.textContent = "O'rtacha himoya"; ring.style.borderColor = "var(--warn)"; }
  else { level.textContent = "Past himoya — xavf yuqori"; ring.style.borderColor = "var(--danger)"; }
  if (score === 100) tips.append(el("li", "", "Zo'r! Barcha asosiy odatlar bajarilgan."));
}

/* ============ 4–6. MA'LUMOT MODULLARI ============ */
const aiCards = [
  ["Deepfake video", "Real odamning yuzi boshqa videoga qo'yiladi. Belgilar: g'alati ko'z qisish, lab harakati ovozga mos emas, yuz chegarasi xira."],
  ["Soxta ovoz (voice clone)", "Bir necha soniyalik audio orqali ovozni nusxalash mumkin. \"Onam\" pul so'rab qo'ng'iroq qilsa — qayta qo'ng'iroq qilib tekshiring."],
  ["Soxta rasmlar", "AI rasmlarda qo'l barmoqlari, matn, quloq va fon ko'pincha g'alati chiqadi."],
  ["Oila so'zi", "Yaqinlaringiz bilan maxfiy \"kod so'z\" kelishib oling — shoshilinch qo'ng'iroqda shuni so'rang."],
  ["Rasmlaringiz xavfsizligi", "Ochiq profildagi rasmlar deepfake uchun xom ashyo bo'lishi mumkin. Kim ko'rishini cheklang."]
];

const girlsCards = [
  ["Yopiq profil", "Kim kuzatishini o'zingiz tanlang. Notanishlarning so'rovlarini qabul qilmang."],
  ["Geolokatsiya", "Rasmga joylashuvni qo'shmang, real vaqtda qayerdaligingizni joylamang."],
  ["Shaxsiy rasmlar", "Internetga tushgan rasm butunlay o'chmaydi. Shaxsiy rasmlarni hech kimga yubormang."],
  ["Shantaj (sextortion)", "Agar kimdir rasm bilan qo'rqitsa: pul bermang, yozishmalarni saqlang, yaqinlaringizga va militsiyaga murojaat qiling."],
  ["Raqamli obro'", "Bugungi post ertaga ish beruvchi ko'radigan narsa bo'lishi mumkin."],
  ["Kiberbulling", "Javob qaytarmang, skrinshot oling, bloklang va shikoyat qiling. Siz yolg'iz emassiz."]
];

const libraryItems = [
  ["Phishing", "Soxta xabar yoki sayt orqali parol, karta ma'lumotlarini o'g'irlash."],
  ["Social Engineering", "Texnikani emas, odamning psixologiyasini aldash: ishonch, qo'rquv, qiziqish."],
  ["Malware", "Zararli dastur: virus, troyan, ransomware, spyware."],
  ["Password", "Uzun, takrorlanmaydigan parol. Parol menejeridan foydalanish tavsiya etiladi."],
  ["2FA", "Ikki bosqichli himoya: paroldan tashqari ikkinchi tasdiq (kod, ilova)."],
  ["VPN", "Internet trafigini shifrlab, ommaviy Wi-Fi'da himoya qiladi."],
  ["Firewall", "Tarmoqqa kiruvchi va chiquvchi ulanishlarni filtrlovchi himoya devori."],
  ["DNS", "Sayt nomini (google.com) IP manzilga aylantiruvchi tizim. Soxta DNS soxta saytga olib borishi mumkin."],
  ["Digital Identity", "Internetdagi raqamli shaxsingiz: akkauntlar, rasmlar, postlar, ma'lumotlar."],
  ["Deepfake", "AI yordamida yaratilgan soxta video, ovoz yoki rasm."],
  ["Ransomware", "Fayllarni shifrlab, qaytarish uchun pul talab qiladigan dastur."],
  ["HTTPS", "Shifrlangan ulanish. Lekin HTTPS sayt xavfsiz degani emas — phishing saytlar ham HTTPS ishlatadi."]
];

function renderCards(containerId, items) {
  const box = document.getElementById(containerId);
  box.replaceChildren();
  items.forEach(([title, text]) => {
    const card = el("div", "info");
    card.append(el("h3", "", title), el("p", "", text));
    box.append(card);
  });
}

document.getElementById("library-search").addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase();
  renderCards("library-grid", libraryItems.filter(([t, d]) => (t + " " + d).toLowerCase().includes(q)));
});

/* ============ ISHGA TUSHIRISH ============ */
showPhishMessage();
showScenario();
updateScore();
renderCards("ai-grid", aiCards);
renderCards("girls-grid", girlsCards);
renderCards("library-grid", libraryItems);
