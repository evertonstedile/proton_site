import { test, expect } from "@playwright/test";

// F4 — smoke do hero dia→noite: a home pinta headline e foto sem depender
// de WebGL/JS pesado (LCP = imagem dia, lição D13).
test("hero pinta headline e foto sem depender de WebGL", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("complexidade em forma");
  await expect(page.locator("#hero img").first()).toBeVisible();
});

test("hero reduced-motion: sem pin longo, noite acessível", async ({
  browser,
}) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  // altura do hero volta a 1 tela (motion-reduce:h-auto)
  const h = await page
    .locator("#hero")
    .evaluate((el) => el.getBoundingClientRect().height);
  const vh = await page.evaluate(() => window.innerHeight);
  expect(h).toBeLessThan(vh * 1.6);
  // foto noturna disponível via <details>
  await expect(
    page.getByText("Ver a residência à noite"),
  ).toBeVisible();
  await ctx.close();
});
