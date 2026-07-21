// Harness de verificação do scroll-film (contrato ?jump + __ready do engine).
// Uso: node scripts/verify-film.mjs <baseUrl> <outDir>
// Cobre: desktop (5 stops) + mobile 390x844 (3 stops) + reduced-motion + jank.
// --disable-gpu: canvas acelerado não aparece no screenshot headless.
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const out = process.argv[3] ?? ".";
const CHAPTERS = 5; // manter em sincronia com CHAPTERS do FilmScroll
const VH = 1.7; // VH_PER_CHAPTER / 100

const browser = await chromium.launch({ args: ["--disable-gpu"] });

async function shots(viewport, tag, stops) {
  const page = await browser.newPage({ viewport });
  const scrollable = (CHAPTERS * VH + 1 - 1) * viewport.height;
  for (const p of stops) {
    const y = Math.round(p * scrollable);
    await page.goto(`${base}/?jump=${y}`, { waitUntil: "domcontentloaded" });
    // pronto = frames decodados E cortina de intro já saiu (1x por sessão)
    await page.waitForFunction(
      () => window.__ready === true && !document.querySelector("[data-preloader]"),
      null,
      { timeout: 30000 },
    );
    // re-assenta o jump (intro-lock pode ter engolido o scroll do engine)
    await page.evaluate((yy) => scrollTo(0, yy), y);
    await page.waitForTimeout(1200);
    await page.screenshot({
      path: `${out}/${tag}-${String(y).padStart(5, "0")}.png`,
    });
    console.log(`${tag} shot y=${y} ok`);
  }
  return page;
}

// desktop
const desktop = await shots({ width: 1440, height: 900 }, "desk", [
  0, 0.25, 0.5, 0.75, 0.98,
]);

// jank no desktop: deltas de rAF durante autoscroll de 4s (p95/max, nunca média)
await desktop.goto(`${base}/?jump=0`, { waitUntil: "domcontentloaded" });
await desktop.waitForFunction(() => window.__ready === true, null, {
  timeout: 30000,
});
const dist = (CHAPTERS * VH + 1 - 1) * 900;
const jank = await desktop.evaluate(
  (d) =>
    new Promise((res) => {
      const deltas = [];
      let last = performance.now();
      const t0 = last;
      function loop(t) {
        deltas.push(t - last);
        last = t;
        const k = Math.min(1, (t - t0) / 4000);
        scrollTo(0, k * d);
        if (k < 1) requestAnimationFrame(loop);
        else {
          deltas.sort((a, b) => a - b);
          res({
            frames: deltas.length,
            p95: +deltas[Math.floor(deltas.length * 0.95)].toFixed(1),
            max: +deltas[deltas.length - 1].toFixed(1),
          });
        }
      }
      requestAnimationFrame(loop);
    }),
  dist,
);
console.log("JANK", JSON.stringify(jank), "alvo: max < 50ms");
let failed = false;
if (jank.max >= 50) {
  console.error(`FALHA: jank max ${jank.max}ms >= 50ms`);
  failed = true;
}
await desktop.close();

// mobile
const mob = await shots({ width: 390, height: 844 }, "mob", [0, 0.5, 0.98]);
await mob.close();

// reduced-motion: pôster estático + __ready sem scrub
const rm = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
await rm.goto(base, { waitUntil: "domcontentloaded" });
await rm.waitForFunction(() => window.__ready === true, null, {
  timeout: 30000,
});
const rmState = await rm.evaluate(() => ({
  ready: window.__ready,
  film: window.__film ?? null, // deve ficar null (tick nunca roda)
  poster: Boolean(document.querySelector("img[data-film-poster]")),
}));
await rm.screenshot({ path: `${out}/rm-top.png` });
console.log("REDUCED-MOTION", JSON.stringify(rmState), "esperado: film=null, poster=true");
if (!rmState.ready || rmState.film !== null || !rmState.poster) {
  console.error("FALHA: estado de reduced-motion fora do esperado");
  failed = true;
}

await browser.close();
if (failed) process.exit(1);
