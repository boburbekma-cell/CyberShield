// Jonli fon: "raqamli tarmoq" — tugunlar, ulanishlar va chiziq bo'ylab yuguruvchi ma'lumot paketlari.
// Sichqoncha yaqinidagi tugunlar unga ulanadi. Sahifa yashirilganda to'xtaydi.

(function () {
  const canvas = document.createElement("canvas");
  canvas.className = "net";
  canvas.setAttribute("aria-hidden", "true");
  document.querySelector(".backdrop").append(canvas);

  const ctx = canvas.getContext("2d");
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LINK = 140, MOUSE = 180;
  let w, h, dpr, nodes = [], packets = [], mouse = null, raf;

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(90, (w * h) / 16000)); // ekran kattaligiga qarab
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
      r: Math.random() * 1.6 + .6
    }));
    packets = [];
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);

    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }

    // Ulanishlar
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d > LINK) continue;
        ctx.strokeStyle = `rgba(96, 165, 250, ${(1 - d / LINK) * .22})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        // Vaqti-vaqti bilan ulanish bo'ylab paket yuboriladi
        if (!calm && packets.length < 14 && Math.random() < .0009) packets.push({ a, b, t: 0 });
      }
      if (mouse) {
        const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (d < MOUSE) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - d / MOUSE) * .5})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          a.x += (mouse.x - a.x) * .002; a.y += (mouse.y - a.y) * .002;
        }
      }
    }

    // Tugunlar
    ctx.fillStyle = "rgba(147, 197, 253, .7)";
    for (const n of nodes) { ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 7); ctx.fill(); }

    // Ma'lumot paketlari
    packets = packets.filter(p => (p.t += .012) < 1 && Math.hypot(p.a.x - p.b.x, p.a.y - p.b.y) < LINK);
    for (const p of packets) {
      const x = p.a.x + (p.b.x - p.a.x) * p.t, y = p.a.y + (p.b.y - p.a.y) * p.t;
      ctx.fillStyle = "rgba(34, 211, 238, .95)";
      ctx.shadowColor = "#22d3ee"; ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.arc(x, y, 2, 0, 7); ctx.fill();
      ctx.shadowBlur = 0;
    }

    if (!calm) raf = requestAnimationFrame(frame);
  }

  addEventListener("resize", () => { resize(); if (calm) frame(); });
  addEventListener("pointermove", e => { if (e.pointerType === "mouse") mouse = { x: e.clientX, y: e.clientY }; });
  document.addEventListener("pointerleave", () => (mouse = null));
  document.addEventListener("visibilitychange", () => {
    cancelAnimationFrame(raf);
    if (!document.hidden && !calm) raf = requestAnimationFrame(frame);
  });

  resize();
  frame();
})();
