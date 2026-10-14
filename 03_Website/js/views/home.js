// Bosh sahifa: progress, yo'l xaritasi va modullar.
window.Views = window.Views || {};

Views.home = function (root) {
  const { h, icon, ring, journey, level, earnedBadges, BADGES } = UI;
  const s = Store.get();
  const D = CSG_DATA;
  const j = journey(s);

  // Keyingi tavsiya qilinadigan qadam
  let cta;
  if (!s.tests.pre) cta = { href: "#/test/pre", text: "Start Security Test" };
  else {
    const next = D.modules.find(m => !s.modules[m.id].done);
    cta = next
      ? { href: "#/" + next.id, text: "Davom etish: " + next.title }
      : !s.tests.post
        ? { href: "#/test/post", text: "Yakuniy testni topshirish" }
        : { href: "#/results", text: "Natijalarni ko'rish" };
  }

  const hero = h("section", { class: "hero" },
    h("div", { class: "hero-text" },
      h("p", { class: "eyebrow" }, s.name ? `Salom, ${s.name}` : "Interaktiv kiberxavfsizlik platformasi"),
      h("h1", { class: "display" }, "CyberShield Girls"),
      h("p", { class: "slogan" }, "Think before you click."),
      h("p", { class: "lead" }, "Zamonaviy kiberxavflarni amaliy simulyatsiyalar orqali tanib olishni o'rganing: phishing, ijtimoiy muhandislik, AI va deepfake firibgarligi. Har bir xato nima uchun xavfli ekanini bilib oling."),
      h("a", { class: "btn btn-primary", href: cta.href }, cta.text, icon("arrow")),
      h("p", { class: "stats-strip" },
        h("span", {}, h("b", {}, D.threats.length), "kiberxavf"),
        h("span", {}, h("b", {}, D.phishing.length), "real xabar"),
        h("span", {}, h("b", {}, D.social.length), "vaziyat"),
        h("span", {}, h("b", {}, D.library.length), "atama"),
        h("span", {}, h("b", {}, BADGES.length), "yutuq"))),
    h("div", { class: "hero-progress card" },
      ring(j.pct, "%"),
      h("div", {},
        h("p", { class: "eyebrow" }, "Darajangiz"),
        h("p", { class: "level" }, level(j.pct)),
        h("p", { class: "muted small" }, `${j.done} / ${j.total} qadam · ${earnedBadges(s).length} / ${BADGES.length} yutuq`)))
  );

  // Yo'l: test → modullar → test → natija (tartib muhim, shuning uchun raqamlangan)
  const modulesDone = UI.MODULE_IDS.filter(id => s.modules[id].done).length;
  const steps = [
    { title: "Boshlang'ich test", text: "Hozirgi bilim darajangizni aniqlaymiz.", done: !!s.tests.pre, href: "#/test/pre" },
    { title: `${D.modules.length} ta modul`, text: `${modulesDone} / ${D.modules.length} tugallandi.`, done: modulesDone === D.modules.length, href: "#/" + (D.modules.find(m => !s.modules[m.id].done) || D.modules[0]).id },
    { title: "Yakuniy test", text: "Xuddi shu savollar — o'sishni o'lchash uchun.", done: !!s.tests.post, href: "#/test/post" },
    { title: "Natija", text: "Oldin va keyin solishtiruvi.", done: !!(s.tests.pre && s.tests.post), href: "#/results" }
  ];
  const path = h("section", {},
    h("h2", { class: "section-title" }, "Sizning yo'lingiz"),
    h("ol", { class: "journey" }, steps.map(st =>
      h("li", { class: st.done ? "is-done" : st === steps.find(x => !x.done) ? "is-next" : "" },
        h("a", { href: st.href },
          h("span", { class: "step-dot" }, st.done ? icon("check") : null),
          h("span", {}, h("b", {}, st.title), h("span", { class: "muted small" }, st.text))))))
  );

  const grid = h("section", {},
    h("h2", { class: "section-title" }, "Modullar"),
    h("div", { class: "module-grid" }, D.modules.map(m => {
      const st = s.modules[m.id];
      let status = "Boshlanmagan", tone = "";
      if (st.done) { status = "Tugallangan"; tone = "good"; }
      else if (st.best || (st.opened && st.opened.length) || (st.checks && st.checks.length)) { status = "Jarayonda"; tone = "warn"; }
      const scoreText = st.total ? `${st.best} / ${st.total}` : m.id === "account" && st.done ? `${st.score} / 100` : "";
      return h("a", { class: "module-card" + (st.done ? " is-done" : ""), href: "#/" + m.id },
        h("div", { class: "module-card-top" }, icon(m.icon, "icon-lg"), h("span", { class: "chip " + tone }, status)),
        h("h3", {}, m.title),
        h("p", { class: "muted" }, m.short),
        scoreText ? h("p", { class: "mono small" }, "Eng yaxshi: " + scoreText) : null);
    }))
  );

  // Bugungi qoida: har kuni phishing darslaridan biri (sana bo'yicha almashadi)
  const lessons = D.phishing.map(m => m.lesson).filter(Boolean);
  const day = Math.floor(Date.now() / 864e5);
  const tip = h("section", { class: "card tip-card" },
    icon("shield"),
    h("div", {},
      h("p", { class: "eyebrow" }, "Bugungi qoida"),
      h("p", {}, lessons[day % lessons.length])));

  root.append(hero, tip, path, grid);
};
