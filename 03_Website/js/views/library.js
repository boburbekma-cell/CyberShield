// Modul 7: Cyber Library — qidiruv, kategoriya filtri, ochiladigan kartalar.
window.Views = window.Views || {};

Views.library = function (root) {
  const { h, sectionHead, progressBar } = UI;

  // Qidirilgan so'zni <mark> bilan ajratish (matn xavfsiz: textContent orqali)
  function mark(text, q) {
    if (!q) return text;
    const out = [], low = text.toLowerCase();
    let from = 0, at;
    while ((at = low.indexOf(q, from)) !== -1) {
      out.push(text.slice(from, at), h("mark", {}, text.slice(at, at + q.length)));
      from = at + q.length;
    }
    out.push(text.slice(from));
    return out;
  }
  const items = CSG_DATA.library;
  const CORE = "Asosiy 10"; // roadmap'dagi 10 ta asosiy mavzu
  const cats = ["Hammasi", CORE, ...new Set(items.map(it => it.cat))];
  let activeCat = "Hammasi";

  const search = h("input", { type: "search", id: "library-search", class: "input", placeholder: "Qidirish: 2FA, VPN, deepfake...", oninput: render });
  const chips = h("div", { class: "chips" });
  const list = h("div", { class: "library-list" });
  const counter = h("div", { class: "read-progress" });

  function renderChips() {
    chips.replaceChildren(...cats.map(c =>
      h("button", { class: "chip-btn" + (c === activeCat ? " is-active" : ""), "aria-pressed": c === activeCat ? "true" : "false",
        onclick: () => { activeCat = c; renderChips(); render(); } }, c)));
  }

  function render() {
    const q = search.value.trim().toLowerCase();
    const opened = Store.get().modules.library.opened;
    const found = items.filter(it =>
      (activeCat === "Hammasi" || it.cat === activeCat || (activeCat === CORE && it.core)) &&
      (it.term + " " + it.def + " " + it.example + " " + it.signs).toLowerCase().includes(q));

    list.replaceChildren(...found.map(it => {
      const d = h("details", { class: "term" + (opened.includes(it.term) ? " is-read" : "") },
        h("summary", {}, h("b", {}, mark(it.term, q)), h("span", { class: "chip" }, it.cat)),
        h("dl", {},
          h("dt", {}, "Definition"), h("dd", {}, mark(it.def, q)),
          h("dt", {}, "Example"), h("dd", {}, it.example),
          h("dt", {}, "Warning Signs"), h("dd", { class: "warn-text" }, it.signs),
          h("dt", {}, "Protection"), h("dd", {}, it.protect)));
      d.addEventListener("toggle", () => {
        if (!d.open || Store.get().modules.library.opened.includes(it.term)) return;
        Store.update(s => {
          const m = s.modules.library;
          m.opened.push(it.term);
          if (m.opened.length >= 5) m.done = true;
        });
        d.classList.add("is-read");
        updateCounter();
      });
      return d;
    }));
    if (!found.length) list.append(h("p", { class: "muted" }, "Hech narsa topilmadi. Boshqa so'z bilan qidirib ko'ring."));
  }

  function updateCounter() {
    const n = Store.get().modules.library.opened.length;
    counter.replaceChildren(
      h("p", { class: "muted small" }, `O'qilgan atamalar: ${n} / ${items.length}` + (n < 5 ? ` · modulni tugatish uchun ${5 - n} ta qoldi` : "")),
      progressBar(n, items.length));
  }

  root.append(
    sectionHead("Modul 7", "Cyber Library", "Har bir mavzu: Definition → Example → Warning Signs → Protection."),
    h("div", { class: "library-tools" }, search, chips, counter),
    list
  );
  renderChips();
  render();
  updateCounter();
};
