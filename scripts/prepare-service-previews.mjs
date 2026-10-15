import { mkdirSync, writeFileSync } from "node:fs";

// Editable vector interface examples, not screenshots of delivered client work.
const directory = "public/images/services";
mkdirSync(directory, { recursive: true });
const text = (x, y, value, size = 22, fill = "#183c2d", weight = 400) =>
  `<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" fill="${fill}" font-weight="${weight}">${value}</text>`;
const box = (x, y, w, h, fill, r = 16) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;
const line = (x, y, w, fill = "#d3ddd1") => box(x, y, w, 6, fill, 3);
const wrap = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="720" viewBox="0 0 960 720">${box(0, 0, 960, 720, "#e6eee5", 0)}<defs><filter id="shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="18" stdDeviation="20" flood-color="#15392c" flood-opacity=".14"/></filter></defs>${body}</svg>`;
function web(detail) {
  const header = `${box(68, 60, 824, 600, "#fafaf1", 18)}${box(68, 60, 824, 34, "#dce3d5", 18)}${[88, 102, 116].map((x) => `<circle cx="${x}" cy="77" r="4" fill="#a8b7a0"/>`).join("")}${text(380, 82, "kök / koleksiyon", 12)}${text(108, 148, "kök®", 34, "#243a2c", 700)}${text(650, 142, "Nesneler    Hikâyemiz", 14)}`;
  const products = [0, 1, 2]
    .map((i) => {
      const x = 108 + i * 254;
      return `${box(x, 338, 236, 228, ["#d9e3ce", "#e9e2ce", "#dce0d4"][i], 2)}${i === 0 ? `<ellipse cx="${x + 118}" cy="510" rx="52" ry="12" fill="#bbc6ad"/>${box(x + 78, 400, 80, 110, "#8a9f7c", 24)}${box(x + 94, 375, 48, 45, "#93a885", 6)}` : i === 1 ? `${box(x + 108, 432, 18, 88, "#b1aa8c", 4)}<path d="M${x + 51} 445 Q${x + 118} 316 ${x + 185} 445Z" fill="#d0c4a0"/>${box(x + 78, 516, 78, 8, "#b1aa8c", 4)}` : `<path d="M${x + 65} 516V430a53 53 0 0 1 106 0v86h-24v-86a29 29 0 0 0-58 0v86Z" fill="#78816e"/>`}${text(x, 598, ["01 / TOPRAK", "02 / IŞIK", "03 / DENGE"][i], 12)}`;
    })
    .join("");
  return wrap(
    `<g filter="url(#shadow)">${header}${detail ? `${box(108, 192, 370, 380, "#d9e3ce", 2)}${box(228, 300, 120, 190, "#8a9f7c", 32)}${box(252, 270, 72, 70, "#93a885", 8)}${text(530, 242, "TOPRAK / 01", 13)}${text(530, 299, "Bir köşe,", 39)}${text(530, 346, "bir karakter.", 39)}${line(530, 384, 260)}${line(530, 406, 230)}${box(530, 454, 240, 52, "#2e6b4f", 26)}${text(562, 487, "Detayları keşfet ↗", 18, "#fff")}` : `${text(108, 206, "YAŞAMIN İÇİNDEN NESNELER", 12)}${text(108, 260, "Doğadan gelir. Sizinle yaşar.", 40)}${text(108, 303, "Az şey. İyi düşünülmüş şeyler.", 17)}${products}`}${line(108, 625, 744)}</g>`,
  );
}
function app(focus) {
  const device = (x, y, alternate) =>
    `${box(x, y, 276, 548, "#20372c", 38)}${box(x + 7, y + 7, 262, 534, "#f7f9ef", 32)}${box(x + 92, y + 15, 92, 16, "#20372c", 8)}${text(x + 23, y + 59, "9:41", 13)}${text(x + 24, y + 100, "rota ✳", 30, "#24432d", 700)}${text(x + 24, y + 148, alternate ? "Küçük adımlar," : "Merhaba, Deniz.", 14)}${text(x + 24, y + 190, alternate ? "Büyük bir fark." : "Bugün, sana", 29, "#183c2d", 700)}${!alternate ? text(x + 24, y + 224, "ait bir gün.", 29, "#183c2d", 700) : ""}${box(x + 22, y + 250, 232, 78, "#dce8cc", 16)}${text(x + 39, y + 282, alternate ? "TAMAMLANAN" : "PAZARTESİ", 11)}${text(x + 39, y + 312, alternate ? "Bir adım daha." : "12 / Ekim", 23)}${[0, 1, 2].map((i) => `${box(x + 22, y + 350 + i * 49, 232, 40, i === 0 ? "#e6eee0" : "#f0f3e9", 9)}<circle cx="${x + 42}" cy="${y + 370 + i * 49}" r="8" fill="${i === 0 ? "#2e6b4f" : "#cbd7c2"}"/>${text(x + 60, y + 375 + i * 49, ["Yeni bir başlangıç", "Fikrine zaman ayır", "Küçük bir mola"][i], 12)}`).join("")}${box(x + 99, y + 522, 78, 4, "#20372c", 2)}`;
  return wrap(
    `${text(70, 90, focus ? "Kendi ritminde." : "Bir gün. Bir adım.", 35, "#24432d", 700)}${text(72, 126, "Günlük planlama / arayüz konsepti", 17)}<g filter="url(#shadow)">${device(136, 155, focus)}${device(527, 105, !focus)}</g>`,
  );
}
function game(menu) {
  return wrap(
    `<g filter="url(#shadow)">${box(50, 72, 860, 576, "#244a45", 18)}<circle cx="742" cy="218" r="74" fill="#c5d4ac"/><path d="M50 455L259 228 460 448 626 264 910 500V648H50Z" fill="#91a68c"/><path d="M50 500L320 355 520 523 714 350 910 524V648H50Z" fill="#456e5b"/><path d="M50 565L253 457 435 560 655 456 910 568V648H50Z" fill="#163c32"/><path d="M530 648l60-90 63-18 27-48" fill="none" stroke="#b8c7a1" stroke-width="3"/>${text(90, 130, "BÜRKÜT / OYUN KONSEPTİ", 12, "#d7e6c9")}${text(90, 260, menu ? "Keşfe hazır mısın?" : "eşik", menu ? 42 : 112, "#f1f5da", 700)}${text(96, menu ? 306 : 315, menu ? "Kaldığın yerden devam et." : "Her yol, bir başlangıç.", 20, "#e0eacf")}${box(94, 365, menu ? 300 : 236, 58, "#edf1d7", 29)}${text(120, 402, menu ? "▶  Yolculuğa devam et" : "▶  Yolculuğa başla", 19)}${menu ? `${box(94, 440, 300, 48, "#315849", 24)}${text(120, 471, "Ayarlar ve kontroller", 17, "#edf1d7")}` : ""}${text(94, 602, "01 / KEŞİF DENEYİMİ", 12, "#ccddbd")}</g>`,
  );
}
for (const [name, svg] of [
  ["web-overview", web(false)],
  ["web-detail", web(true)],
  ["app-overview", app(false)],
  ["app-detail", app(true)],
  ["game-overview", game(false)],
  ["game-detail", game(true)],
])
  writeFileSync(`${directory}/${name}.svg`, svg);
