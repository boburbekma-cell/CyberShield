// Modul 2: Phishing Detector.
// "Belgi ovi": avval shubhali joylarni bosib belgilaysiz, keyin qaror qilasiz.
// Javobdan keyin haqiqiy belgilar ketma-ket yonadi: topilganlari yashil, topilmaganlari qizil.
window.Views = window.Views || {};

Views.phishing = function (root) {
  const { h, icon, progressBar, ring, feedbackBox, sectionHead } = UI;
  const messages = CSG_DATA.phishing;
  const CHANNEL = { email: "Email", sms: "SMS", telegram: "Telegram", instagram: "Instagram" };

  const stage = h("div", { class: "narrow" });
  root.append(
    sectionHead("Modul 2", "Phishing Detector", "Firibgar kabi o'ylamang, detektiv kabi o'qing: shubhali joylarni belgilang, keyin qaror qiling."),
    stage
  );

  let i = 0, score = 0, streak = 0, found = 0, totalFlags = 0;

  // Xabarni bo'laklarga ajratamiz: shubhali bo'lak (flag) yoki oddiy gap — hammasi bosiladigan
  function pieces(msg) {
    return msg.parts.flatMap(part => typeof part === "string"
      ? (part.match(/[^.!?]+[.!?]*\s*/g) || [part]).map(text => ({ text }))
      : [part]);
  }

  function renderMessage(msg, list, marked, revealed) {
    let n = 0;
    const body = h("p", { class: "msg-body" }, list.map((p, idx) => {
      if (p.text.trim().length < 4) return p.text; // ": ", " 🙏 " kabi qisqa ulagichlar
      const flagged = revealed && p.flag !== undefined;
      const mark = marked.has(idx);
      const cls = ["seg", !revealed && "tap", !revealed && mark && "is-marked", flagged && "is-flagged",
        flagged && mark && "is-hit", revealed && mark && !flagged && "is-miss"].filter(Boolean).join(" ");
      return h("span", {
        class: cls,
        style: flagged ? `--n:${n++}` : null,
        role: revealed ? null : "button",
        tabindex: revealed ? null : 0,
        "aria-pressed": revealed ? null : String(mark),
        "data-i": idx
      }, p.text, flagged ? h("sup", { class: "seg-num" }, p.flag + 1) : null);
    }));
    return h("article", { class: "message ch-" + msg.channel },
      h("header", { class: "msg-head" },
        h("span", { class: "avatar" }, msg.from.charAt(0)),
        h("div", { class: "msg-who" }, h("b", {}, msg.from), h("span", { class: "mono small muted" }, msg.address)),
        h("span", { class: "chip" }, CHANNEL[msg.channel])),
      msg.subject ? h("p", { class: "msg-subject" }, msg.subject) : null,
      body);
  }

  function show() {
    const msg = messages[i];
    const list = pieces(msg);
    const marked = new Set();
    const holder = h("div", {}, renderMessage(msg, list, marked, false));
    const feedback = h("div", { class: "feedback", hidden: true });
    const next = h("button", { class: "btn btn-ghost", hidden: true, onclick: () => { i++; i < messages.length ? show() : finish(); } },
      i < messages.length - 1 ? "Keyingi xabar" : "Natijani ko'rish", icon("arrow"));
    const hint = h("p", { class: "hunt-hint" }, icon("eye"), h("span", {}, "Shubhali joylarni bosib belgilang (ixtiyoriy), so'ng qaror qiling."));

    // Belgilash: bosish yoki Enter/Probel
    const toggle = e => {
      const seg = e.target.closest(".seg.tap");
      if (!seg || (e.type === "keydown" && e.key !== "Enter" && e.key !== " ")) return;
      e.preventDefault();
      const idx = +seg.dataset.i;
      marked.has(idx) ? marked.delete(idx) : marked.add(idx);
      seg.classList.toggle("is-marked");
      seg.setAttribute("aria-pressed", String(marked.has(idx)));
    };
    holder.addEventListener("click", toggle);
    holder.addEventListener("keydown", toggle);

    const answer = choice => {
      // "Not Sure" — xato hisoblanmaydi, lekin ball ham berilmaydi; belgilar baribir tushuntiriladi
      const ok = choice === msg.answer;
      const unsure = choice === "unsure";
      score += ok; streak = ok ? streak + 1 : 0;
      actions.querySelectorAll("button").forEach(b => (b.disabled = true));
      holder.replaceChildren(renderMessage(msg, list, marked, true));
      hint.remove();

      const flagIdx = list.map((p, idx) => p.flag !== undefined ? idx : -1).filter(idx => idx >= 0);
      const hits = flagIdx.filter(idx => marked.has(idx)).length;
      found += hits; totalFlags += flagIdx.length;

      const verdict = msg.answer === "phishing" ? "Bu phishing edi." : "Bu xavfsiz xabar edi.";
      feedbackBox(feedback, ok, ok ? "To'g'ri!" : unsure ? "Ishonchingiz komil emas edi" : "Xato", (unsure ? "Shubha bo'lsa, to'xtash — to'g'ri odat. " : "") + verdict + (msg.flags.length ? " Belgilar:" : ""), msg.flags);
      if (flagIdx.length) feedback.append(h("p", { class: "hunt-score" }, icon("eye"), `Siz topgan belgilar: ${hits} / ${flagIdx.length}`));
      feedback.append(h("p", { class: "lesson" }, icon("shield"), h("span", {}, msg.lesson)));
      updateMeta();
      next.hidden = false;
      next.focus();
    };

    const actions = h("div", { class: "decide" },
      h("button", { class: "btn btn-safe", onclick: () => answer("safe") }, icon("check"), "Safe"),
      h("button", { class: "btn btn-danger", onclick: () => answer("phishing") }, icon("x"), "Phishing"),
      h("button", { class: "btn btn-unsure", onclick: () => answer("unsure") }, icon("eye"), "Not Sure"));

    const meta = h("div", { class: "meta" }, h("span", {}, `Xabar ${i + 1} / ${messages.length}`), h("span", {}));
    function updateMeta() {
      meta.lastChild.replaceChildren(h("span", {},
        streak >= 2 ? h("span", { class: "chip hot" }, `Ketma-ket ${streak}`) : null,
        ` Ball: ${score}`));
    }
    updateMeta();

    stage.replaceChildren(h("div", { class: "card" }, meta, progressBar(i, messages.length), hint, holder, actions, feedback, next));
  }

  function finish() {
    Store.update(s => {
      const m = s.modules.phishing;
      m.done = true;
      m.total = messages.length;
      m.best = Math.max(m.best, score);
    });
    const good = score >= messages.length - 2;
    stage.replaceChildren(h("div", { class: "card result-inline" },
      ring((score / messages.length) * 100, `${score}/${messages.length}`, good ? "good" : "warn"),
      h("div", {},
        h("h3", {}, good ? "Ajoyib natija!" : "Yana mashq qiling"),
        totalFlags ? h("p", { class: "hunt-score" }, icon("eye"), `Detektiv ko'zi: ${found} / ${totalFlags} belgi topildi`) : null,
        h("p", { class: "muted" }, "Asosiy qoida: shoshiltirish, qo'rqitish, yutuq va'da qilish yoki kod/parol so'rash — to'xtab o'ylash uchun signal."),
        h("div", { class: "btn-row" },
          h("button", { class: "btn", onclick: () => { i = score = streak = found = totalFlags = 0; show(); } }, "Qaytadan"),
          h("a", { class: "btn btn-primary", href: "#/social" }, "Keyingi modul", icon("arrow"))))));
  }

  show();
};
