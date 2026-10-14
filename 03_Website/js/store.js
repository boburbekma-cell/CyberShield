// Store — foydalanuvchi progressini brauzer xotirasida (localStorage) saqlaydi.
// Server yo'q: ma'lumot faqat shu qurilmada qoladi.

(function () {
  const KEY = "cybershield-girls:v1";

  function emptyState() {
    return {
      name: "",
      participant: "",
      tests: { pre: null, post: null },
      modules: {
        learn: { done: false, opened: [] },
        phishing: { done: false, best: 0, total: 0 },
        social: { done: false, best: 0, total: 0 },
        account: { done: false, score: 0, checks: [] },
        ai: { done: false, best: 0, total: 0 },
        identity: { done: false, best: 0, total: 0 },
        library: { done: false, opened: [] }
      }
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return emptyState();
      // Yangi maydonlar qo'shilsa ham eski saqlangan ma'lumot buzilmasin
      const saved = migrate(JSON.parse(raw));
      const base = emptyState();
      return {
        ...base,
        ...saved,
        tests: { ...base.tests, ...saved.tests },
        modules: Object.fromEntries(
          Object.keys(base.modules).map(k => [k, { ...base.modules[k], ...(saved.modules || {})[k] }])
        )
      };
    } catch (e) {
      return emptyState();
    }
  }

  // Eski versiyadagi nomlarni yangisiga o'tkazish (roadmap bo'yicha qayta nomlangan)
  const OLD_CATS = { "Parol va 2FA": "Account Security", "AI & Deepfake": "AI Threats", "Maxfiylik": "Digital Identity" };
  function migrate(saved) {
    const m = saved.modules || {};
    if (m.girls && !m.identity) m.identity = m.girls; // CyberSafety for Girls → Digital Identity
    delete m.girls;
    Object.values(saved.tests || {}).forEach(t => {
      if (!t || !t.byCat) return;
      t.byCat = Object.fromEntries(Object.entries(t.byCat).map(([c, v]) => [OLD_CATS[c] || c, v]));
    });
    return saved;
  }

  let state = load();
  const listeners = [];

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* xususiy rejim — saqlanmaydi */ }
  }

  window.Store = {
    get: () => state,
    // fn(state) holatni o'zgartiradi, keyin saqlanadi va tinglovchilar xabardor qilinadi
    update(fn) {
      const before = JSON.parse(JSON.stringify(state));
      fn(state);
      save();
      listeners.forEach(l => l(state, before));
    },
    reset() {
      const before = state;
      state = emptyState();
      save();
      listeners.forEach(l => l(state, before));
    },
    onChange: fn => listeners.push(fn)
  };
})();
