// App — marshrutlash (router), menyu, yutuq xabarlari va offline rejim.

(function () {
  const { h, icon, journey, level, earnedBadges, toast } = UI;

  // Manzil (#/...) → sahifa
  const ROUTES = {
    "": { view: "home", title: "Asosiy" },
    "test": { view: "test", title: "Security Test" },
    "learn": { view: "learn", title: "Learn" },
    "phishing": { view: "phishing", title: "Phishing Detector" },
    "social": { view: "social", title: "Social Engineering" },
    "account": { view: "account", title: "Security Check" },
    "ai": { view: "ai", title: "AI & Deepfake" },
    "identity": { view: "identity", title: "Digital Identity" },
    "library": { view: "library", title: "Cyber Library" },
    "results": { view: "results", title: "Natijalar" },
    "profile": { view: "profile", title: "Profil" }
  };

  const NAV = [
    // Tartib roadmap'dagi menyu bo'yicha: Home → Learn → simulyatsiyalar → Library
    { href: "#/", label: "Home", icon: "home", key: "" },
    { href: "#/learn", label: "Learn", icon: "shield", key: "learn" },
    { href: "#/phishing", label: "Phishing Detector", icon: "mail", key: "phishing" },
    { href: "#/social", label: "Social Engineering", icon: "chat", key: "social" },
    { href: "#/account", label: "Security Check", icon: "lock", key: "account" },
    { href: "#/ai", label: "AI & Deepfake", icon: "eye", key: "ai" },
    { href: "#/identity", label: "Digital Identity", icon: "user", key: "identity" },
    { href: "#/library", label: "Cyber Library", icon: "book", key: "library" },
    { section: "Eksperiment" },
    { href: "#/test/pre", label: "Security Test", icon: "test", key: "test" },
    { href: "#/results", label: "Natijalar", icon: "chart", key: "results" },
    { href: "#/profile", label: "Profil", icon: "user", key: "profile" }
  ];

  // Telefondagi pastki menyu — 5 ta asosiy bo'lim
  const TABS = [
    { href: "#/", label: "Asosiy", icon: "home", key: "" },
    { href: "#/phishing", label: "Mashq", icon: "shield", key: "phishing", also: ["learn", "social", "account", "ai", "identity"] },
    { href: "#/test/pre", label: "Test", icon: "test", key: "test" },
    { href: "#/library", label: "Lug'at", icon: "book", key: "library" },
    { href: "#/profile", label: "Profil", icon: "user", key: "profile", also: ["results"] }
  ];

  function parse() {
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    return { key: parts[0] || "", param: parts[1] };
  }

  function buildNav() {
    const side = document.getElementById("sidenav");
    side.replaceChildren(...NAV.map(item => item.section
      ? h("p", { class: "nav-section" }, item.section)
      : h("a", { href: item.href, "data-key": item.key }, icon(item.icon), h("span", {}, item.label))));

    const tabs = document.getElementById("tabbar");
    tabs.replaceChildren(...TABS.map(t =>
      h("a", { href: t.href, "data-key": t.key, "data-also": (t.also || []).join(" ") }, icon(t.icon), h("span", {}, t.label))));
  }

  function markActive(key) {
    document.querySelectorAll("#sidenav a, #tabbar a").forEach(a => {
      const also = (a.dataset.also || "").split(" ").filter(Boolean);
      const on = a.dataset.key === key || also.includes(key);
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }

  function updateLevelChips() {
    const j = journey(Store.get());
    document.querySelectorAll("[data-level]").forEach(node => {
      node.replaceChildren(h("span", { class: "level-dot", style: `--p:${j.pct}` }), h("span", {}, `${level(j.pct)} · ${j.pct}%`));
    });
  }

  function render() {
    const { key, param } = parse();
    const route = ROUTES[key] || ROUTES[""];
    const view = document.getElementById("view");
    view.replaceChildren();
    view.classList.remove("enter");
    void view.offsetWidth; // animatsiyani qayta ishga tushirish
    view.classList.add("enter");
    Views[route.view](view, param);
    document.title = (key ? route.title + " · " : "") + "CyberShield Girls";
    markActive(ROUTES[key] ? key : "");
    window.scrollTo(0, 0);
    view.focus({ preventScroll: true });
  }

  // Yangi yutuq olinganda xabar ko'rsatish (sahifani qayta chizmaydi)
  Store.onChange((now, before) => {
    updateLevelChips();
    const had = new Set(earnedBadges(before).map(b => b.id));
    earnedBadges(now).filter(b => !had.has(b.id)).forEach(b => toast("Yangi yutuq: " + b.title));
  });

  // Modul kartasida yorug'lik sichqoncha ortidan yuradi (CSS --mx/--my)
  document.addEventListener("pointermove", e => {
    const card = e.target.closest && e.target.closest(".module-card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  });

  // Klaviatura: 1–9 raqamlari bilan javob variantini tanlash
  document.addEventListener("keydown", e => {
    if (e.ctrlKey || e.metaKey || e.altKey || e.target.closest("input, textarea")) return;
    const n = Number(e.key);
    if (!n) return;
    const opts = document.querySelectorAll("#view .options .option:not(:disabled)");
    if (opts[n - 1]) { e.preventDefault(); opts[n - 1].click(); }
  });

  window.addEventListener("hashchange", render);
  buildNav();
  updateLevelChips();
  render();

  // Offline rejim (faqat http/https da ishlaydi; faylni to'g'ridan-to'g'ri ochganda o'tkazib yuboriladi)
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
