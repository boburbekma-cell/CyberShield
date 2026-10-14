// Natijalar: boshlang'ich va yakuniy test solishtiruvi + CSV eksport (tadqiqot uchun).
window.Views = window.Views || {};

Views.results = function (root) {
  const { h, icon, sectionHead, countUp } = UI;
  const s = Store.get();
  const { pre, post } = s.tests;

  root.append(sectionHead("Eksperiment", "Natijalar", "Boshlang'ich va yakuniy test natijalarini solishtirish."));

  if (!pre) {
    root.append(h("div", { class: "card empty" },
      icon("chart", "icon-lg"),
      h("h3", {}, "Hali natija yo'q"),
      h("p", { class: "muted" }, "Boshlang'ich testni topshiring — natijalar shu yerda paydo bo'ladi."),
      h("a", { class: "btn btn-primary", href: "#/test/pre" }, "Start Security Test", icon("arrow"))));
    return;
  }

  const pct = r => Math.round((r.score / r.total) * 100);
  const delta = post ? post.score - pre.score : null;

  root.append(h("div", { class: "stat-row" },
    stat("Boshlang'ich test", `${pre.score}/${pre.total}`, `${pct(pre)}% · ${fmtDate(pre.date)}`),
    stat("Yakuniy test", post ? `${post.score}/${post.total}` : "—", post ? `${pct(post)}% · ${fmtDate(post.date)}` : "hali topshirilmagan"),
    stat("O'zgarish", delta === null ? "—" : (delta > 0 ? "+" : "") + delta, delta === null ? "yakuniy testdan keyin" : delta > 0 ? "o'sish" : delta === 0 ? "o'zgarishsiz" : "pasayish",
      delta > 0 ? "good" : delta < 0 ? "bad" : "")));

  // Kategoriyalar bo'yicha gorizontal ustunlar
  const cats = Object.keys(pre.byCat);
  root.append(h("section", { class: "card" },
    h("div", { class: "legend" }, h("span", { class: "key key-pre" }, "Boshlang'ich"), h("span", { class: "key key-post" }, "Yakuniy")),
    h("div", { class: "bars" }, cats.map(cat => {
      const a = pre.byCat[cat], b = post && post.byCat[cat];
      return h("div", { class: "bar-group" },
        h("p", { class: "bar-label" }, cat),
        barRow("pre", a.c, a.t),
        b ? barRow("post", b.c, b.t) : null);
    }))));

  // Xulosa: eng katta o'sish va eng zaif yo'nalish
  const ratio = (r, c) => r.byCat[c].c / r.byCat[c].t;
  const last = post || pre;
  const weakest = cats.reduce((a, c) => ratio(last, c) < ratio(last, a) ? c : a, cats[0]);
  const best = post && cats.reduce((a, c) => ratio(post, c) - ratio(pre, c) > ratio(post, a) - ratio(pre, a) ? c : a, cats[0]);
  root.append(h("section", { class: "card tip-card" }, icon("eye"),
    h("div", {},
      h("p", { class: "eyebrow" }, "Xulosa"),
      best && ratio(post, best) > ratio(pre, best) ? h("p", {}, "Eng katta o'sish: ", h("b", {}, best), ".") : null,
      h("p", {}, "Ko'proq mashq kerak: ", h("b", {}, weakest), ". Shu mavzudagi modulni qayta ko'rib chiqing."))));

  if (!post) {
    root.append(h("div", { class: "notice" }, "Barcha modullarni o'tgach, yakuniy testni topshiring. ",
      h("a", { href: "#/test/post" }, "Yakuniy testga o'tish")));
  }

  // Tadqiqotchi uchun eksport
  const csv = toCSV(s);
  const csvBox = h("textarea", { id: "csv-output", class: "input mono", rows: 3, readonly: true });
  csvBox.value = csv;
  root.append(h("section", { class: "card" },
    h("h2", { class: "section-title" }, "Tadqiqot uchun eksport"),
    h("p", { class: "muted" }, "Har bir ishtirokchining natijasini bitta qator qilib yig'ing va Excel / Google Sheets'ga qo'ying (06_Statistics papkasi uchun)."),
    csvBox,
    h("div", { class: "btn-row" },
      h("button", { class: "btn", onclick: e => copy(csv, csvBox, e.currentTarget) }, "Nusxalash"),
      h("button", { class: "btn", onclick: () => download(csv, s.participant) }, "CSV yuklab olish"))));

  function stat(label, value, sub, tone) {
    // "7/10" yoki "+3" kabi qiymatlardagi birinchi sonni sanab chiqaramiz
    const m = /^([+-]?)(\d+)(.*)$/.exec(value);
    const node = h("p", { class: "stat-value" }, value);
    if (m) countUp(node, +m[2], n => m[1] + n + m[3]);
    return h("div", { class: "card stat " + (tone || "") }, h("p", { class: "eyebrow" }, label), node, h("p", { class: "muted small" }, sub));
  }

  function barRow(kind, c, t) {
    const p = Math.round((c / t) * 100);
    return h("div", { class: "hbar" },
      h("div", { class: "hbar-track" }, h("span", { class: "hbar-fill " + kind, style: `width:${p}%` })),
      h("span", { class: "mono small" }, `${c}/${t}`));
  }
};

function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("uz-UZ", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function toCSV(s) {
  const cats = Object.keys(s.tests.pre.byCat);
  const head = ["participant", "pre_score", "post_score", "total", ...cats.flatMap(c => [`pre_${c}`, `post_${c}`]), "pre_date", "post_date"];
  const { pre, post } = s.tests;
  const row = [s.participant || "anonim", pre.score, post ? post.score : "", pre.total,
    ...cats.flatMap(c => [pre.byCat[c].c, post ? post.byCat[c].c : ""]),
    pre.date.slice(0, 10), post ? post.date.slice(0, 10) : ""];
  const esc = v => /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : v;
  return head.map(esc).join(",") + "\n" + row.map(esc).join(",");
}

function copy(text, box, btn) {
  const done = () => { btn.textContent = "Nusxalandi"; setTimeout(() => (btn.textContent = "Nusxalash"), 1800); };
  try {
    navigator.clipboard.writeText(text).then(done, () => { box.select(); });
  } catch (e) { box.select(); }
}

function download(text, code) {
  const blob = new Blob(["﻿" + text], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `cybershield_${code || "natija"}.csv`;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
