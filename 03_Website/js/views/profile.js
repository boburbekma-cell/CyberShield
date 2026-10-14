// Profil: ism, ishtirokchi kodi, yutuqlar, progressni tozalash.
window.Views = window.Views || {};

Views.profile = function (root) {
  const { h, icon, sectionHead, BADGES, journey, level, progressBar, earnedBadges } = UI;
  const s = Store.get();
  const j = journey(s);

  const name = h("input", { id: "profile-name", class: "input", value: s.name, placeholder: "Ismingiz", autocomplete: "given-name" });
  const code = h("input", { id: "profile-code", class: "input", value: s.participant, placeholder: "masalan: S-014", autocomplete: "off" });
  const saved = h("span", { class: "muted small", hidden: true }, "Saqlandi");

  const form = h("form", { class: "card form-card", onsubmit: e => {
    e.preventDefault();
    Store.update(st => { st.name = name.value.trim(); st.participant = code.value.trim(); });
    saved.hidden = false;
    setTimeout(() => (saved.hidden = true), 1800);
  } },
    h("label", { for: "profile-name" }, "Ism"), name,
    h("label", { for: "profile-code" }, "Ishtirokchi kodi ", h("span", { class: "muted" }, "(tadqiqot uchun)")), code,
    h("div", { class: "btn-row" }, h("button", { class: "btn btn-primary", type: "submit" }, "Saqlash"), saved));

  const badges = h("div", { class: "badge-grid" }, BADGES.map(b => {
    const got = b.test(s);
    return h("div", { class: "badge" + (got ? " is-earned" : "") },
      icon(got ? "star" : "lock", "icon-lg"),
      h("b", {}, b.title),
      h("p", { class: "muted small" }, b.desc));
  }));

  // Ikki bosqichli tasdiqlash (confirm() o'rniga)
  const danger = h("div", { class: "card danger-zone" });
  function dangerIdle() {
    danger.replaceChildren(
      h("div", {}, h("b", {}, "Progressni tozalash"), h("p", { class: "muted small" }, "Testlar, modullar va yutuqlar o'chiriladi. Bu qurilmada qayta boshlash uchun.")),
      h("button", { class: "btn btn-danger", onclick: dangerConfirm }, "Tozalash"));
  }
  function dangerConfirm() {
    danger.replaceChildren(
      h("div", {}, h("b", {}, "Rostdan ham o'chirilsinmi?"), h("p", { class: "muted small" }, "Buni qaytarib bo'lmaydi.")),
      h("div", { class: "btn-row" },
        h("button", { class: "btn", onclick: dangerIdle }, "Bekor qilish"),
        h("button", { class: "btn btn-danger", onclick: () => { Store.reset(); location.hash = "#/"; } }, "Ha, o'chirish")));
  }
  dangerIdle();

  root.append(
    sectionHead("Profil", s.name || "Mening profilim", `Daraja: ${level(j.pct)} · ${j.pct}% yo'l bosib o'tildi`),
    h("div", { class: "narrow" }, form),
    h("h2", { class: "section-title" }, "Yutuqlar"),
    h("div", { class: "read-progress" },
      h("p", { class: "muted small" }, `${earnedBadges(s).length} / ${BADGES.length} yutuq olindi`),
      progressBar(earnedBadges(s).length, BADGES.length)),
    badges,
    h("h2", { class: "section-title" }, "Sozlamalar"),
    h("div", { class: "narrow" }, danger,
      h("p", { class: "muted small about" }, "CyberShield Girls · Muallif: Nozima · Cybersecurity / IT · Ilmiy-amaliy loyiha. Ma'lumotlar faqat shu qurilmada saqlanadi."))
  );
};
