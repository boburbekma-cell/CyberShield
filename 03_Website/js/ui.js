// UI yordamchilari: DOM yaratish, ikonkalar, progress, yutuqlar, umumiy viktorina.

(function () {
  // h("div", {class: "card", onclick: fn}, "matn", bola, ...)
  // Matn har doim textContent orqali qo'yiladi — XSS bo'lmaydi.
  function h(tag, props, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props || {})) {
      if (value === null || value === undefined || value === false) continue;
      if (key === "class") node.className = value;
      else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
      else if (key === "html") node.innerHTML = value; // faqat ishonchli ichki SVG uchun
      else node.setAttribute(key, value === true ? "" : value);
    }
    append(node, children);
    return node;
  }

  function append(node, children) {
    children.flat(Infinity).forEach(child => {
      if (child === null || child === undefined || child === false) return;
      node.append(child instanceof Node ? child : document.createTextNode(String(child)));
    });
  }

  // Ichki SVG ikonkalar (stroke = joriy matn rangi)
  const ICONS = {
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
    test: '<path d="M9 4h6v3H9z"/><path d="M7 5H5v16h14V5h-2"/><path d="M9 13l2 2 4-4"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z"/>',
    book: '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'
  };

  function icon(name, cls) {
    return h("span", {
      class: "icon " + (cls || ""),
      "aria-hidden": "true",
      html: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ""}</svg>`
    });
  }

  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Doira shaklidagi progress (0–100): `from` qiymatdan to'lib boradi, raqam sanaladi
  function ring(value, label, tone, from = 0) {
    const r = 52, c = 2 * Math.PI * r;
    const clamp = n => Math.max(0, Math.min(100, n));
    const v = clamp(value), start = calm ? v : clamp(from);
    const wrap = h("div", { class: "ring " + (tone || "") });
    wrap.innerHTML = `<svg viewBox="0 0 120 120"><circle class="ring-track" cx="60" cy="60" r="${r}"/><circle class="ring-bar" cx="60" cy="60" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - start / 100)}"/></svg>`;
    const num = h("b", {}, Math.round(start));
    wrap.append(h("div", { class: "ring-label" }, num, h("small", {}, label || "%")));
    if (start !== v) {
      const bar = wrap.querySelector(".ring-bar"), t0 = performance.now();
      requestAnimationFrame(() => requestAnimationFrame(() => bar.setAttribute("stroke-dashoffset", c * (1 - v / 100))));
      (function tick(t) {
        const k = Math.min(1, (t - t0) / 1100), e = 1 - Math.pow(1 - k, 3);
        num.textContent = Math.round(start + (v - start) * e);
        if (k < 1) requestAnimationFrame(tick);
      })(t0);
    }
    return wrap;
  }

  // Raqamni 0 dan sanab chiqarish: countUp(node, 7, n => n + "/10")
  function countUp(node, to, fmt = n => n) {
    if (calm || !to) { node.textContent = fmt(to); return node; }
    const t0 = performance.now();
    (function tick(t) {
      const k = Math.min(1, (t - t0) / 900);
      node.textContent = fmt(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
    return node;
  }

  function progressBar(value, max) {
    const pct = max ? Math.round((value / max) * 100) : 0;
    return h("div", { class: "bar", role: "progressbar", "aria-valuenow": pct, "aria-valuemin": 0, "aria-valuemax": 100 },
      h("span", { style: `width:${pct}%` }));
  }

  let toastTimer;
  function toast(text) {
    const box = document.getElementById("toast");
    box.replaceChildren(icon("star"), h("span", {}, text));
    box.hidden = false;
    box.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { box.classList.remove("show"); setTimeout(() => (box.hidden = true), 300); }, 3200);
  }

  /* ===== Progress va yutuqlar ===== */
  const MODULE_IDS = ["learn", "phishing", "social", "account", "ai", "identity", "library"];

  function journey(s) {
    const steps = [!!s.tests.pre, ...MODULE_IDS.map(id => s.modules[id].done), !!s.tests.post];
    const done = steps.filter(Boolean).length;
    return { done, total: steps.length, pct: Math.round((done / steps.length) * 100) };
  }

  function level(pct) {
    if (pct >= 100) return "CyberShield";
    if (pct >= 75) return "Ekspert";
    if (pct >= 50) return "Himoyachi";
    if (pct >= 25) return "Ehtiyotkor";
    return "Yangi boshlovchi";
  }

  const BADGES = [
    { id: "start", title: "Birinchi qadam", desc: "Boshlang'ich testni topshirdingiz", test: s => !!s.tests.pre },
    { id: "scholar", title: "Bilimdon", desc: "Learn bo'limida 10 ta xavfning hammasini o'qidingiz", test: s => s.modules.learn.opened.length >= 10 },
    { id: "hunter", title: "Phishing ovchisi", desc: "Phishing Detector'da 8+ to'g'ri javob", test: s => s.modules.phishing.best >= 8 },
    { id: "mind", title: "Psixolog", desc: "Barcha ijtimoiy muhandislik vaziyatlarida xavfsiz qaror", test: s => s.modules.social.total > 0 && s.modules.social.best === s.modules.social.total },
    { id: "fortress", title: "Qal'a", desc: "Cybersecurity Score 80 va undan yuqori", test: s => s.modules.account.score >= 80 },
    { id: "detective", title: "Deepfake detektivi", desc: "AI & Deepfake testida xatosiz", test: s => s.modules.ai.total > 0 && s.modules.ai.best === s.modules.ai.total },
    { id: "boundary", title: "Shaxsiy chegara", desc: "Digital Identity testida xatosiz", test: s => s.modules.identity.total > 0 && s.modules.identity.best === s.modules.identity.total },
    { id: "reader", title: "Kutubxonachi", desc: "Kutubxonada 10 ta atamani o'qidingiz", test: s => s.modules.library.opened.length >= 10 },
    { id: "growth", title: "O'sish", desc: "Yakuniy test natijasi boshlang'ichdan yuqori", test: s => s.tests.pre && s.tests.post && s.tests.post.score > s.tests.pre.score },
    { id: "shield", title: "CyberShield", desc: "Butun yo'l tugallandi", test: s => journey(s).pct === 100 }
  ];

  function earnedBadges(s) { return BADGES.filter(b => b.test(s)); }

  /* ===== Umumiy viktorina (AI va Digital Identity modullari uchun) ===== */
  function quiz(questions, onFinish) {
    let i = 0, score = 0;
    const box = h("div", { class: "card quiz" });

    function show() {
      const item = questions[i];
      const feedback = h("div", { class: "feedback", hidden: true });
      const next = h("button", { class: "btn btn-ghost", hidden: true, onclick: () => { i++; i < questions.length ? show() : finish(); } },
        i < questions.length - 1 ? "Keyingi savol" : "Natijani ko'rish", icon("arrow"));
      const options = h("div", { class: "options" });
      item.options.forEach((opt, idx) => {
        options.append(h("button", {
          class: "option",
          onclick: e => {
            const ok = idx === item.correct;
            if (ok) score++;
            options.querySelectorAll("button").forEach((b, j) => {
              b.disabled = true;
              if (j === item.correct) b.classList.add("is-correct");
            });
            if (!ok) e.currentTarget.classList.add("is-wrong");
            feedbackBox(feedback, ok, ok ? "To'g'ri" : "Noto'g'ri", item.why);
            next.hidden = false;
            next.focus();
          }
        }, opt));
      });
      box.replaceChildren(
        h("div", { class: "meta" }, h("span", {}, `Savol ${i + 1} / ${questions.length}`), h("span", {}, `Ball: ${score}`)),
        progressBar(i, questions.length),
        h("p", { class: "question" }, item.q),
        options, feedback, next
      );
    }

    function finish() {
      onFinish(score, questions.length);
      box.replaceChildren(
        h("div", { class: "result-inline" },
          ring((score / questions.length) * 100, `${score}/${questions.length}`, score === questions.length ? "good" : "warn"),
          h("div", {},
            h("h3", {}, score === questions.length ? "Ajoyib, xatosiz!" : "Yaxshi natija"),
            h("p", { class: "muted" }, score === questions.length ? "Siz bu mavzuni yaxshi tushunasiz." : "Xato qilgan savollarni qayta ko'rib chiqing."),
            h("button", { class: "btn", onclick: () => { i = 0; score = 0; show(); } }, "Qaytadan")))
      );
    }

    show();
    return box;
  }

  function feedbackBox(box, ok, title, text, list) {
    box.replaceChildren(...[
      h("div", { class: "feedback-title" }, icon(ok ? "check" : "x"), h("b", {}, title)),
      text ? h("p", {}, text) : null,
      list && list.length ? h("ol", {}, list.map(t => h("li", {}, t))) : null
    ].filter(Boolean)); // replaceChildren null'ni "null" matniga aylantiradi
    box.className = "feedback " + (ok ? "ok" : "bad");
    box.hidden = false;
  }

  function sectionHead(eyebrow, title, text) {
    return h("header", { class: "page-head" },
      h("p", { class: "eyebrow" }, eyebrow),
      h("h1", {}, title),
      text ? h("p", { class: "lead" }, text) : null);
  }

  window.UI = { h, icon, ring, countUp, progressBar, toast, journey, level, BADGES, earnedBadges, quiz, feedbackBox, sectionHead, MODULE_IDS };
})();
