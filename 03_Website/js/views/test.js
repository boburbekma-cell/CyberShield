// Boshlang'ich va yakuniy test (eksperiment uchun).
// Test davomida to'g'ri javob ko'rsatilmaydi — aks holda o'lchov buziladi.
window.Views = window.Views || {};

Views.test = function (root, kind) {
  const { h, icon, ring, sectionHead } = UI;
  kind = kind === "post" ? "post" : "pre";
  const questions = CSG_DATA.test;
  const s = Store.get();
  const title = kind === "pre" ? "Boshlang'ich test" : "Yakuniy test";

  const page = h("div", { class: "narrow" });
  root.append(page);

  function intro() {
    const existing = s.tests[kind];
    const code = h("input", { id: "participant-code", class: "input", placeholder: "masalan: S-014", value: s.participant || "", autocomplete: "off" });
    page.replaceChildren(...[
      sectionHead("Security Test", title,
        kind === "pre"
          ? "10 ta savol real vaziyatlar asosida. Bu sizning hozirgi darajangiz — xato qilishdan qo'rqmang."
          : "Xuddi shu 10 ta savol. Natija boshlang'ich test bilan solishtiriladi."),
      kind === "post" && !s.tests.pre
        ? h("div", { class: "notice" }, "Siz hali boshlang'ich testni topshirmagansiz. Solishtirish uchun avval uni yeching.", " ", h("a", { href: "#/test/pre" }, "Boshlang'ich testga o'tish"))
        : null,
      existing
        ? h("div", { class: "notice" }, `Oldingi natijangiz: ${existing.score} / ${existing.total}. Qayta topshirsangiz, natija yangilanadi.`)
        : null,
      h("div", { class: "card test-brief" },
        h("div", { class: "brief-stats" },
          h("div", {}, h("b", {}, questions.length), h("span", {}, "savol")),
          h("div", {}, h("b", {}, "~5"), h("span", {}, "daqiqa")),
          h("div", {}, h("b", {}, new Set(questions.map(q => q.cat)).size), h("span", {}, "yo'nalish"))),
        h("div", { class: "chips" }, [...new Set(questions.map(q => q.cat))].map(c => h("span", { class: "chip" }, c))),
        h("ul", { class: "tips" },
          h("li", {}, "Test davomida to'g'ri javob ko'rsatilmaydi — bu o'lchov aniq bo'lishi uchun."),
          h("li", {}, "Bilmasangiz, eng xavfsiz tuyulgan variantni tanlang."),
          h("li", {}, "Klaviaturada 1–4 raqamlari bilan tanlab, Enter bilan o'tishingiz mumkin."))),
      h("div", { class: "card form-card" },
        h("label", { for: "participant-code" }, "Ishtirokchi kodi ", h("span", { class: "muted" }, "(ixtiyoriy, tadqiqot uchun)")),
        code,
        h("p", { class: "muted small" }, "Ismingiz o'rniga anonim kod ishlatiladi. Natijalar faqat shu qurilmada saqlanadi."),
        h("button", { class: "btn btn-primary", onclick: () => {
          Store.update(st => { st.participant = code.value.trim(); });
          run();
        } }, "Testni boshlash", icon("arrow"))
      )
    ].filter(Boolean));
  }

  function run() {
    let i = 0;
    const answers = [];

    function show() {
      const item = questions[i];
      let picked = null;
      const next = h("button", { class: "btn btn-primary", disabled: true, onclick: () => {
        answers.push(picked);
        i++;
        i < questions.length ? show() : finish(answers);
      } }, i < questions.length - 1 ? "Keyingi" : "Yakunlash", icon("arrow"));

      const options = h("div", { class: "options" }, item.options.map((opt, idx) =>
        h("button", { class: "option", onclick: e => {
          picked = idx;
          options.querySelectorAll(".option").forEach(b => b.classList.remove("is-picked"));
          e.currentTarget.classList.add("is-picked");
          next.disabled = false;
          next.focus({ preventScroll: true });
        } }, opt)));

      page.replaceChildren(
        h("p", { class: "eyebrow" }, title),
        h("div", { class: "card quiz" },
          h("div", { class: "meta" }, h("span", {}, `Savol ${i + 1} / ${questions.length}`), h("span", { class: "chip" }, item.cat)),
          h("div", { class: "dots" }, questions.map((_, n) => h("span", { class: n < i ? "is-done" : n === i ? "is-now" : "" }))),
          h("p", { class: "question" }, item.q),
          options,
          h("div", { class: "row-end" }, next))
      );
      window.scrollTo(0, 0);
    }
    show();
  }

  function finish(answers) {
    let score = 0;
    const byCat = {};
    questions.forEach((q, idx) => {
      const ok = answers[idx] === q.correct;
      if (ok) score++;
      byCat[q.cat] = byCat[q.cat] || { c: 0, t: 0 };
      byCat[q.cat].t++;
      if (ok) byCat[q.cat].c++;
    });
    const result = { score, total: questions.length, date: new Date().toISOString(), byCat, answers };
    Store.update(st => { st.tests[kind] = result; });

    const pre = Store.get().tests.pre;
    const compare = kind === "post" && pre
      ? h("p", { class: "lead" }, `Boshlang'ich: ${pre.score} → Yakuniy: ${score}. `,
          score > pre.score ? `O'sish: +${score - pre.score} ball.` : score === pre.score ? "Natija o'zgarmadi." : "Natija pasaydi — modullarni qayta ko'rib chiqing.")
      : null;

    page.replaceChildren(
      sectionHead("Test yakunlandi", `${score} / ${questions.length}`),
      h("div", { class: "card result-inline" },
        ring((score / questions.length) * 100, "%", score >= 8 ? "good" : score >= 5 ? "warn" : "bad"),
        h("div", {},
          compare || h("p", { class: "lead" }, kind === "pre"
            ? "Bu sizning boshlang'ich nuqtangiz. Endi modullarni o'ting va yakuniy testda o'sishingizni ko'ring."
            : "Natijangiz saqlandi."),
          h("div", { class: "btn-row" },
            kind === "pre"
              ? h("a", { class: "btn btn-primary", href: "#/learn" }, "Learn bo'limidan boshlash", icon("arrow"))
              : h("a", { class: "btn btn-primary", href: "#/results" }, "Natijalarni ko'rish", icon("arrow")),
            h("a", { class: "btn", href: "#/" }, "Bosh sahifa")))),
      h("section", { class: "card" },
        h("h2", { class: "section-title" }, "Yo'nalishlar bo'yicha"),
        h("div", { class: "bars" }, Object.entries(byCat).map(([cat, v]) =>
          h("div", { class: "bar-group" },
            h("p", { class: "bar-label" }, cat),
            h("div", { class: "hbar" },
              h("div", { class: "hbar-track" }, h("span", { class: "hbar-fill post", style: `width:${Math.round(v.c / v.t * 100)}%` })),
              h("span", { class: "mono small" }, `${v.c}/${v.t}`))))))
    );
    window.scrollTo(0, 0);
  }

  intro();
};
