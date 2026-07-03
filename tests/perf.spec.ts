import { test, expect } from "@playwright/test";

// Gate LCP mobile (<2500ms) — Slow 4G + 4x CPU via CDP (condição Lighthouse
// mobile). Roda só no projeto "mobile" (Pixel 7).
test("LCP mobile do hero < 2.5s", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "gate é mobile-only");
  test.setTimeout(90_000);

  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

  await page.addInitScript(() => {
    (window as unknown as { __lcp: number }).__lcp = 0;
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) {
        const w = window as unknown as { __lcp: number };
        w.__lcp = Math.max(w.__lcp, e.startTime);
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });

  // primeira visita (com intro) — pior caso
  await page.goto("/", { waitUntil: "load" });
  await page.waitForTimeout(6000);
  await page.keyboard.press("Tab"); // input finaliza o LCP

  const lcp = await page.evaluate(
    () => (window as unknown as { __lcp: number }).__lcp,
  );
  expect(lcp, "nenhuma entry de LCP registrada").toBeGreaterThan(0);
  expect(lcp, `LCP observado: ${Math.round(lcp)}ms`).toBeLessThan(2500);
});
