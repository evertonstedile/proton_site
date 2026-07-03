import { test, expect } from "@playwright/test";

// Todas as rotas públicas do site (estático — lista fechada).
const ROUTES = [
  "/",
  "/obras",
  "/obras/winehouse",
  "/obras/condominio-encosta",
  "/obras/empreendimento-multiuso",
  "/obras/conjunto-residencial",
  "/obras/residencia-poente",
  "/obras/residencia-encosta",
  "/servicos",
  "/processo",
  "/sobre",
  "/contato",
  "/privacidade",
  "/termos",
];

for (const route of ROUTES) {
  test(`console limpo em ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(`[console.error] ${msg.text()}`);
    });
    page.on("pageerror", (err) => errors.push(`[pageerror] ${err.message}`));

    const resp = await page.goto(route, { waitUntil: "load" });
    expect(resp?.status(), `HTTP de ${route}`).toBeLessThan(400);

    // intro/preloader + GSAP entram; depois rola a página inteira para
    // disparar ScrollTrigger/lazy-load e capturar erros tardios.
    await page.waitForTimeout(2500);
    await page.evaluate(async () => {
      const step = window.innerHeight / 2;
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
    });
    await page.waitForTimeout(800);

    expect(errors, `Erros em ${route}:\n${errors.join("\n")}`).toEqual([]);
  });
}

// 404 custom (app/not-found.tsx) — rota inexistente responde 404, renderiza a
// página memorável e mantém o console limpo.
test("404 custom em rota inexistente", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    // o próprio status 404 do documento vira um log de rede do Chromium
    // ("Failed to load resource ... 404") — esperado numa rota 404, não é defeito.
    if (
      msg.type() === "error" &&
      !msg.text().includes("Failed to load resource")
    )
      errors.push(`[console.error] ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`[pageerror] ${err.message}`));

  const resp = await page.goto("/rota-que-nao-existe-9271", {
    waitUntil: "load",
  });
  expect(resp?.status(), "HTTP do 404").toBe(404);
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
  await page.waitForTimeout(500);
  expect(errors, `Erros no 404:\n${errors.join("\n")}`).toEqual([]);
});
