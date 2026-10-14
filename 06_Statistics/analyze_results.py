# Pre-test va post-test natijalarini tahlil qiladi (Roadmap — 16–17-bosqichlar).
#
# 1) Har bir ishtirokchi saytdagi "Natijalar" sahifasidan CSV yuklab oladi.
# 2) Barcha CSV fayllarni 06_Statistics/data/ papkasiga qo'ying.
# 3) Ishga tushiring:  python 06_Statistics/analyze_results.py
#
# Natija: 06_Statistics/results_summary.md (+ matplotlib bo'lsa, charts/*.png).
# Hamma foizlar faqat yig'ilgan real ma'lumotlardan hisoblanadi — qo'lda raqam kiritilmaydi.
import csv, math, re, statistics
from pathlib import Path

HERE = Path(__file__).resolve().parent
DATA = HERE / "data"
SITE_DATA = HERE.parent / "03_Website" / "js" / "data.js"

# Eski versiyadagi kategoriya nomlari → yangi nomlar (saytdagi store.js bilan bir xil)
OLD_CATS = {"Parol va 2FA": "Account Security", "AI & Deepfake": "AI Threats", "Maxfiylik": "Digital Identity"}


def category_totals():
    """Har bir kategoriyada nechta savol borligini saytning data.js faylidan o'qiydi."""
    text = SITE_DATA.read_text(encoding="utf-8")
    test = text[text.index("  test: ["):]
    totals = {}
    for cat in re.findall(r'\{ cat: "([^"]+)"', test):
        totals[cat] = totals.get(cat, 0) + 1
    return totals


def load_rows():
    rows = []
    for f in sorted(DATA.glob("*.csv")):
        with f.open(encoding="utf-8-sig", newline="") as fh:
            for r in csv.DictReader(fh):
                r = {re.sub(r"^(pre|post)_(.+)$", lambda m: f"{m[1]}_{OLD_CATS.get(m[2], m[2])}", k): v for k, v in r.items()}
                r["_file"] = f.name
                rows.append(r)
    return rows


def paired_t(diffs):
    n = len(diffs)
    if n < 2:
        return None
    sd = statistics.stdev(diffs)
    if sd == 0:
        return None
    t = statistics.mean(diffs) / (sd / math.sqrt(n))
    p = None
    try:
        from scipy import stats  # ixtiyoriy
        p = float(stats.t.sf(abs(t), n - 1) * 2)
    except ImportError:
        pass
    return t, n - 1, p


def pct(a, b):
    return 100 * a / b if b else 0


def main():
    totals = category_totals()
    rows = load_rows()
    if not rows:
        print(f"Ma'lumot yo'q. CSV fayllarni shu papkaga qo'ying: {DATA}")
        return

    # Takroriy ishtirokchi kodlari — oxirgi fayl hisobga olinadi
    by_code = {}
    for r in rows:
        by_code[(r.get("participant") or r["_file"]).strip()] = r
    rows = list(by_code.values())
    paired = [r for r in rows if r.get("post_score", "").strip()]

    lines = ["# Eksperiment natijalari", "",
             f"- Yuklangan ishtirokchilar: **{len(rows)}**",
             f"- Pre-test va post-test ikkalasini topshirganlar: **{len(paired)}**", ""]

    if not paired:
        lines.append("Hali post-test natijalari yo'q.")
    else:
        total = int(paired[0]["total"])
        pre = [int(r["pre_score"]) for r in paired]
        post = [int(r["post_score"]) for r in paired]
        diffs = [b - a for a, b in zip(pre, post)]
        improved = sum(d > 0 for d in diffs)
        same = sum(d == 0 for d in diffs)
        lines += ["## Umumiy natija", "",
                  "| Ko'rsatkich | Pre-test | Post-test |", "|---|---|---|",
                  f"| O'rtacha ball (/{total}) | {statistics.mean(pre):.2f} | {statistics.mean(post):.2f} |",
                  f"| O'rtacha foiz | {pct(statistics.mean(pre), total):.1f}% | {pct(statistics.mean(post), total):.1f}% |",
                  f"| Mediana | {statistics.median(pre)} | {statistics.median(post)} |", "",
                  f"- O'rtacha o'zgarish: **{statistics.mean(diffs):+.2f} ball** ({pct(statistics.mean(diffs), total):+.1f} foiz punkti)",
                  f"- Natijasi oshganlar: {improved} / {len(paired)} ({pct(improved, len(paired)):.0f}%), o'zgarmaganlar: {same}, pasayganlar: {len(paired) - improved - same}"]
        t = paired_t(diffs)
        if t:
            lines.append(f"- Juftlangan t-test: t = {t[0]:.2f}, df = {t[1]}" + (f", p = {t[2]:.4f}" if t[2] is not None else " (p-qiymat uchun `pip install scipy`)"))
        lines += ["", "## Yo'nalishlar bo'yicha", "",
                  "| Yo'nalish | Savollar | Pre-test | Post-test | O'zgarish |", "|---|---|---|---|---|"]
        chart = []
        for cat, n in totals.items():
            a = [int(r[f"pre_{cat}"]) for r in paired if r.get(f"pre_{cat}", "").strip()]
            b = [int(r[f"post_{cat}"]) for r in paired if r.get(f"post_{cat}", "").strip()]
            if not a or not b:
                continue
            pa, pb = pct(statistics.mean(a), n), pct(statistics.mean(b), n)
            chart.append((cat, pa, pb))
            lines.append(f"| {cat} | {n} | {pa:.1f}% | {pb:.1f}% | {pb - pa:+.1f} p.p. |")
        draw_charts(chart, pct(statistics.mean(pre), total), pct(statistics.mean(post), total), lines)

    lines += ["", "## Xulosa (o'zingiz yozing)", "",
              "Tadqiqot savoli: *CyberShield platformasi foydalanuvchilarning kiberxavflarni tanib olish qobiliyatini oshirdimi?*",
              "Yuqoridagi real raqamlarga tayanib javob bering. Kutilgan raqamlarni yozmang.", ""]
    out = HERE / "results_summary.md"
    out.write_text("\n".join(lines), encoding="utf-8")
    print("\n".join(lines))
    print(f"\nSaqlandi: {out}")


def draw_charts(cats, pre_all, post_all, lines):
    try:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
    except ImportError:
        lines += ["", "_Diagrammalar uchun: `pip install matplotlib`_"]
        return
    out = HERE / "charts"
    out.mkdir(exist_ok=True)
    labels = ["Umumiy"] + [c for c, _, _ in cats]
    pre = [pre_all] + [a for _, a, _ in cats]
    post = [post_all] + [b for _, _, b in cats]
    x = range(len(labels))
    fig, ax = plt.subplots(figsize=(9, 4.5))
    ax.bar([i - 0.2 for i in x], pre, 0.4, label="Pre-test", color="#94a3b8")
    ax.bar([i + 0.2 for i in x], post, 0.4, label="Post-test", color="#3b82f6")
    ax.set_xticks(list(x), labels, rotation=15)
    ax.set_ylabel("To'g'ri javoblar, %")
    ax.set_ylim(0, 100)
    ax.legend()
    ax.spines[["top", "right"]].set_visible(False)
    fig.tight_layout()
    fig.savefig(out / "pre_vs_post.png", dpi=160)
    lines += ["", "![Pre vs Post](charts/pre_vs_post.png)"]


if __name__ == "__main__":
    main()
