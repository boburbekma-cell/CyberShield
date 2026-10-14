// Modul 3: Social Engineering Simulator — chat ko'rinishidagi vaziyatlar.
window.Views = window.Views || {};

Views.social = function (root) {
  const { h, icon, progressBar, ring, feedbackBox, sectionHead } = UI;
  const scenarios = CSG_DATA.social;
  const stage = h("div", { class: "narrow" });
  root.append(
    sectionHead("Modul 3", "Social Engineering Simulator", "Firibgarlar odamni aldaydi: ishonch, qo'rquv, qiziqish va shoshilinchlik orqali. Har bir vaziyatda xavfsiz qarorni tanlang."),
    stage
  );

  let i = 0, score = 0;

  function show() {
    const sc = scenarios[i];
    const feedback = h("div", { class: "feedback", hidden: true });
    const next = h("button", { class: "btn btn-ghost", hidden: true, onclick: () => { i++; i < scenarios.length ? show() : finish(); } },
      i < scenarios.length - 1 ? "Keyingi vaziyat" : "Natijani ko'rish", icon("arrow"));

    const choices = h("div", { class: "options" }, sc.choices.map(ch =>
      h("button", { class: "option", onclick: e => {
        if (ch.good) score++;
        choices.querySelectorAll("button").forEach((b, j) => {
          b.disabled = true;
          if (sc.choices[j].good) b.classList.add("is-correct");
        });
        if (!ch.good) e.currentTarget.classList.add("is-wrong");
        feedbackBox(feedback, ch.good, ch.good ? "Xavfsiz qaror" : "Xavfli qaror", ch.why);
        if (sc.psych) feedback.append(h("p", { class: "lesson" }, icon("eye"), h("span", {}, h("b", {}, "Psixologik usul — " + sc.trick + ". "), sc.psych)));
        next.hidden = false;
        next.focus();
      } }, ch.text)));

    // Chat jonli: "yozmoqda..." → xabar, ketma-ket; oxirida savol va variantlar chiqadi
    const chat = h("div", { class: "chat", "aria-live": "polite" }, h("p", { class: "chat-who mono small" }, sc.who));
    const ask = h("div", { class: "later", hidden: true }, h("p", { class: "question" }, "Siz nima qilasiz?"));
    const card = h("div", { class: "card" },
      h("div", { class: "meta" }, h("span", {}, `Vaziyat ${i + 1} / ${scenarios.length}`), h("span", { class: "chip warn" }, sc.trick)),
      progressBar(i, scenarios.length), chat, ask, choices, feedback, next);
    choices.hidden = true;
    stage.replaceChildren(card);

    const fast = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let n = 0;
    (function type() {
      if (!card.isConnected) return; // foydalanuvchi boshqa sahifaga o'tib ketgan
      if (n === sc.lines.length) { ask.hidden = choices.hidden = false; return; }
      const dots = h("p", { class: "bubble typing" }, h("span"), h("span"), h("span"));
      chat.append(dots);
      setTimeout(() => {
        dots.replaceWith(h("p", { class: "bubble" }, sc.lines[n++]));
        type();
      }, fast ? 0 : Math.min(1400, 450 + sc.lines[n].length * 12));
    })();
  }

  function finish() {
    Store.update(s => {
      const m = s.modules.social;
      m.done = true;
      m.total = scenarios.length;
      m.best = Math.max(m.best, score);
    });
    stage.replaceChildren(h("div", { class: "card result-inline" },
      ring((score / scenarios.length) * 100, `${score}/${scenarios.length}`, score === scenarios.length ? "good" : "warn"),
      h("div", {},
        h("h3", {}, score === scenarios.length ? "Hech qanday tuzoqqa tushmadingiz!" : "Yaxshi, lekin ehtiyot bo'ling"),
        h("p", { class: "muted" }, "Oltin qoida: shubha bo'lsa, aloqani o'zingiz va rasmiy kanal orqali qayta boshlang. Kodni hech kimga bermang."),
        h("div", { class: "btn-row" },
          h("button", { class: "btn", onclick: () => { i = 0; score = 0; show(); } }, "Qaytadan"),
          h("a", { class: "btn btn-primary", href: "#/account" }, "Keyingi modul", icon("arrow"))))));
  }

  show();
};
