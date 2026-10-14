// Modul 4: Security Check — odatlar bo'yicha Cybersecurity Score.
window.Views = window.Views || {};

Views.account = function (root) {
  const { h, icon, ring, sectionHead } = UI;
  const habits = CSG_DATA.habits;
  const saved = Store.get().modules.account.checks || [];

  const scoreBox = h("div", { class: "score-box" });
  const list = h("div", { class: "checks" }, habits.map((hb, idx) => {
    const box = h("input", { type: "checkbox", id: "habit-" + idx, onchange: update });
    box.checked = saved.includes(idx);
    return h("label", { class: "check", for: "habit-" + idx }, box, h("span", {}, hb.text), h("span", { class: "mono small muted pts" }, "+" + hb.points));
  }));

  let shown = 0; // halqa animatsiyasi oldingi balldan boshlansin
  function update(fromUser) {
    const checks = [];
    let score = 0;
    habits.forEach((hb, idx) => {
      if (document.getElementById("habit-" + idx).checked) { checks.push(idx); score += hb.points; }
    });
    if (fromUser !== false) {
      Store.update(s => { const m = s.modules.account; m.checks = checks; m.score = score; m.done = true; });
    }
    const tone = score >= 80 ? "good" : score >= 50 ? "warn" : "bad";
    const levelText = score >= 80 ? "Yuqori himoya" : score >= 50 ? "O'rtacha himoya" : "Past himoya — xavf yuqori";
    shown = score;
    const tips = habits.filter((_, idx) => !checks.includes(idx)).sort((a, b) => b.points - a.points);
    scoreBox.replaceChildren(
      ring(score, "/ 100", tone, shown),
      h("p", { class: "level " + tone }, levelText),
      tips.length
        ? h("div", {}, h("p", { class: "eyebrow" }, "Shaxsiy tavsiyalar"), h("ul", { class: "tips" }, tips.map(t => h("li", {}, t.tip, " ", h("span", { class: "mono small pts-up" }, "+" + t.points)))))
        : h("p", { class: "muted" }, "Zo'r! Barcha asosiy odatlar bajarilgan.")
    );
  }

  root.append(
    sectionHead("Modul 4", "Security Check", "Halol belgilang: qaysi odatlar sizda bor? Natija shartli Cybersecurity Score bo'ladi."),
    h("div", { class: "account-layout" }, h("div", { class: "card" }, list), h("div", { class: "card sticky" }, scoreBox)),
    h("div", { class: "row-end" }, h("a", { class: "btn btn-primary", href: "#/ai" }, "Keyingi modul", icon("arrow")))
  );
  update(false);
};
