// Modul 1: Learn — 10 ta asosiy kiberxavf.
// Har biri: nima bu → qanday ishlaydi → qanday tanish mumkin → qanday himoyalanish.
window.Views = window.Views || {};

Views.learn = function (root) {
  const { h, icon, sectionHead, progressBar } = UI;
  const threats = CSG_DATA.threats;
  const NEED = 5; // modulni tugatish uchun o'qilishi kerak bo'lgan mavzular

  // Mavzuga mos amaliy mashq
  const PRACTICE = {
    phishing: ["#/phishing", "Phishing Detector"],
    social: ["#/social", "Social Engineering"],
    takeover: ["#/account", "Security Check"],
    password: ["#/account", "Security Check"],
    scams: ["#/social", "Social Engineering"],
    aiscams: ["#/ai", "AI & Deepfake"],
    deepfake: ["#/ai", "AI & Deepfake"],
    identity: ["#/identity", "Digital Identity"],
    leak: ["#/identity", "Digital Identity"]
  };

  const counter = h("div", { class: "read-progress" });
  function updateCounter() {
    const n = Store.get().modules.learn.opened.length;
    counter.replaceChildren(
      h("p", { class: "muted small" }, `O'qilgan mavzular: ${n} / ${threats.length}` + (n < NEED ? ` · modulni tugatish uchun ${NEED - n} ta qoldi` : "")),
      progressBar(n, threats.length));
  }

  const list = h("div", { class: "library-list" }, threats.map(t => {
    const read = Store.get().modules.learn.opened.includes(t.id);
    const go = PRACTICE[t.id];
    const d = h("details", { class: "term" + (read ? " is-read" : "") },
      h("summary", {}, h("b", {}, t.title), icon(t.icon)),
      h("dl", {},
        h("dt", {}, "Nima bu?"), h("dd", {}, t.what),
        h("dt", {}, "Qanday ishlaydi?"), h("dd", {}, t.how),
        h("dt", {}, "Qanday tanish mumkin?"), h("dd", {}, h("ul", { class: "signs" }, t.recognize.map(x => h("li", {}, x)))),
        h("dt", {}, "Qanday himoyalanish?"), h("dd", {}, h("ul", { class: "tips" }, t.protect.map(x => h("li", {}, x))))),
      go ? h("a", { class: "btn btn-ghost", href: go[0] }, "Amalda sinash: " + go[1], icon("arrow")) : null);
    d.addEventListener("toggle", () => {
      if (!d.open || Store.get().modules.learn.opened.includes(t.id)) return;
      Store.update(s => {
        const m = s.modules.learn;
        m.opened.push(t.id);
        if (m.opened.length >= NEED) m.done = true;
      });
      d.classList.add("is-read");
      updateCounter();
    });
    return d;
  }));

  root.append(
    sectionHead("Modul 1", "Learn", "Zamonaviy kiberxavflarning 10 tasi: nima ekanini, qanday ishlashini, qanday tanib olish va himoyalanishni bilib oling."),
    h("div", { class: "library-tools" }, counter),
    list,
    h("div", { class: "row-end" }, h("a", { class: "btn btn-primary", href: "#/phishing" }, "Keyingi modul", icon("arrow")))
  );
  updateCounter();
};
