import { test, expect } from "@playwright/test";

// FILM — smoke do scroll-film "Da Noite Nasce a Casa": a home pinta o h1 do
// beat de abertura e monta o canvas sem depender de WebGL; o pôster (LCP) é
// background do stage, visível antes de qualquer frame decodar.
test("filme pinta h1 do beat e canvas sem depender de WebGL", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("nasce a casa");
  const stage = page.locator("section[aria-label^='Filme'] > div").first();
  await expect(stage).toBeVisible();
  await expect(stage.locator("canvas")).toBeAttached();
  // pôster = <img> real (LCP); alt="" decorativo, canvas assume por cima
  await expect(stage.locator("img[data-film-poster]")).toBeVisible();
});

test("filme reduced-motion: pôster estático em 1 tela, sem scrub", async ({
  browser,
}) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  await page.waitForFunction(() => (window as { __ready?: boolean }).__ready);

  // driver colapsa p/ 1 tela (motion-reduce:!h-screen) — sem 510vh de pôster
  const section = page.locator("section[aria-label^='Filme']");
  const h = await section.evaluate((el) => el.getBoundingClientRect().height);
  const vh = await page.evaluate(() => window.innerHeight);
  expect(h, "driver colapsado em reduced-motion").toBeLessThan(vh * 1.2);

  // scrub nunca roda (tick não inicia) e o loader não cobre o pôster
  const state = await page.evaluate(() => ({
    film: (window as { __film?: object }).__film ?? null,
    loaderHidden: (() => {
      const stage = document.querySelector("section[aria-label^='Filme'] > div");
      const loader = stage?.querySelector<HTMLElement>("div.z-10");
      return !loader || getComputedStyle(loader).display === "none";
    })(),
  }));
  expect(state.film, "tick do scrub não deve rodar").toBeNull();
  expect(state.loaderHidden, "loader escondido sobre o pôster").toBe(true);
  await ctx.close();
});
