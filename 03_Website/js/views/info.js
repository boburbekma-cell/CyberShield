// Modul 5 (AI & Deepfake) va Modul 6 (Digital Identity): kartalar + viktorina.
window.Views = window.Views || {};

Views.ai = function (root) {
  const { h, icon, sectionHead, quiz } = UI;
  const D = CSG_DATA.ai;
  root.append(
    sectionHead("Modul 5", "AI & Deepfake", "Sun'iy intellekt yordamida soxta ovoz, video, rasm, profil va phishing xat yasash oson bo'lib qoldi. Belgilarini bilib oling."),
    h("div", { class: "info-grid" }, D.cards.map(c =>
      h("article", { class: "info" },
        h("h3", {}, c.title),
        h("p", { class: "muted" }, c.text),
        h("ul", { class: "signs" }, c.signs.map(sg => h("li", {}, sg)))))),
    h("section", { class: "help card" },
      h("div", { class: "help-head" }, icon("eye", "icon-lg"),
        h("div", {}, h("h2", {}, "Shubhali bo'lsa — 5 qadamli tekshiruv"), h("p", { class: "muted" }, "Ovoz, video, rasm yoki profil qanchalik ishonarli bo'lmasin, shu tartibda tekshiring."))),
      h("ol", { class: "help-steps" }, D.verify.map(v => h("li", {}, h("b", {}, v.title + ": "), v.text)))),
    h("h2", { class: "section-title" }, "O'zingizni tekshiring"),
    h("div", { class: "narrow" }, quiz(D.quiz, (score, total) => saveQuiz("ai", score, total))),
    h("div", { class: "row-end" }, h("a", { class: "btn btn-primary", href: "#/identity" }, "Keyingi modul", icon("arrow")))
  );
};

Views.identity = function (root) {
  const { h, icon, sectionHead, quiz } = UI;
  const D = CSG_DATA.identity;
  root.append(
    sectionHead("Modul 6", "Digital Identity", "Raqamli iz, shaxsiy ma'lumotlar, maxfiylik, ijtimoiy tarmoqlar, rasmlar, geolokatsiya, raqamli obro' va akkauntlar himoyasi."),
    h("div", { class: "info-grid" }, D.cards.map(c =>
      h("article", { class: "info" },
        h("h3", {}, c.title),
        h("p", { class: "muted" }, c.text),
        h("ul", { class: "signs" }, h("li", {}, c.tip))))),
    h("section", { class: "help card" },
      h("div", { class: "help-head" }, icon("shield", "icon-lg"),
        h("div", {}, h("h2", {}, "Shantaj yoki tahdid bo'lsa"), h("p", { class: "muted" }, "Shu qadamlarni ketma-ket bajaring."))),
      h("ol", { class: "help-steps" }, D.help.map(t => h("li", {}, t)))),
    h("h2", { class: "section-title" }, "O'zingizni tekshiring"),
    h("div", { class: "narrow" }, quiz(D.quiz, (score, total) => saveQuiz("identity", score, total))),
    h("div", { class: "row-end" }, h("a", { class: "btn btn-primary", href: "#/library" }, "Keyingi modul", icon("arrow")))
  );
};

function saveQuiz(id, score, total) {
  Store.update(s => {
    const m = s.modules[id];
    m.done = true;
    m.total = total;
    m.best = Math.max(m.best, score);
  });
}
