import { test, expect } from "@playwright/test";

// Gates de performance mobile — Slow 4G + 4x CPU via CDP (condição Lighthouse
// mobile). Rodam só no projeto "mobile" (Pixel 7).
//
// Nota (19/07/2026, FILM): na 1ª visita a cortina do intro cobre a página por
// ~3.5s POR DESIGN, e o Chrome só contabiliza o texto revelado no LCP quando a
// cortina sai (o pôster <img> full-viewport é excluído pela heurística de
// background do LCP). Medir LCP da 1ª visita = medir a duração da cortina.
// Por isso: LCP é gated na visita RECORRENTE (intro pulado — maioria das
// sessões) e a 1ª visita tem gate de FCP (a cortina pinta rápido).

async function throttle(page: import("@playwright/test").Page) {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
}

test("LCP mobile (visita recorrente, sem cortina) < 2.5s", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "gate é mobile-only");
  test.setTimeout(90_000);
  await throttle(page);

  await page.addInitScript(() => {
    try {
      sessionStorage.setItem("proton-intro-seen", "1"); // pula a cortina
    } catch {}
    (window as unknown as { __lcp: number }).__lcp = 0;
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) {
        const w = window as unknown as { __lcp: number };
        w.__lcp = Math.max(w.__lcp, e.startTime);
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(6000);
  await page.keyboard.press("Tab"); // input finaliza o LCP

  const lcp = await page.evaluate(
    () => (window as unknown as { __lcp: number }).__lcp,
  );
  expect(lcp, "nenhuma entry de LCP registrada").toBeGreaterThan(0);
  expect(lcp, `LCP observado: ${Math.round(lcp)}ms`).toBeLessThan(2500);
});

test("FCP mobile da 1ª visita (cortina do intro) < 1.5s", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "gate é mobile-only");
  test.setTimeout(90_000);
  await throttle(page);

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(4000);
  const fcp = await page.evaluate(
    () =>
      performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0,
  );
  expect(fcp, "nenhuma entry de FCP").toBeGreaterThan(0);
  expect(fcp, `FCP observado: ${Math.round(fcp)}ms`).toBeLessThan(1500);
});
