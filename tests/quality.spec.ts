import { test, expect } from "@playwright/test";

// F8 — gates de performance de rede e acessibilidade da home.

test("nenhum vídeo baixa antes da viewport se aproximar", async ({ page }) => {
  const mp4: string[] = [];
  page.on("request", (r) => {
    if (r.url().includes(".mp4")) mp4.push(r.url());
  });
  await page.goto("/", { waitUntil: "networkidle" });
  expect(mp4, `vídeos baixados na abertura: ${mp4.join(", ")}`).toHaveLength(0);
});

test("CLS da home ≈ 0 no carregamento", async ({ page }) => {
  await page.addInitScript(() => {
    (window as unknown as { __cls: number }).__cls = 0;
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) {
        const shift = e as unknown as { value: number; hadRecentInput: boolean };
        if (!shift.hadRecentInput) {
          (window as unknown as { __cls: number }).__cls += shift.value;
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("/", { waitUntil: "load" });
  await page.waitForTimeout(3000);
  const cls = await page.evaluate(
    () => (window as unknown as { __cls: number }).__cls,
  );
  expect(cls, `CLS observado: ${cls.toFixed(4)}`).toBeLessThan(0.05);
});

test("a11y: um h1, headings sem salto, toda imagem com alt", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const audit = await page.evaluate(() => {
    const h1s = document.querySelectorAll("h1").length;
    const levels = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(
      (h) => Number(h.tagName[1]),
    );
    let jump: string | null = null;
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] - levels[i - 1] > 1)
        jump = `h${levels[i - 1]} → h${levels[i]} (posição ${i})`;
    }
    const semAlt = [...document.querySelectorAll("img")]
      .filter((img) => !img.hasAttribute("alt"))
      .map((img) => img.getAttribute("src"));
    return { h1s, jump, semAlt };
  });

  expect(audit.h1s, "exatamente um h1").toBe(1);
  expect(audit.jump, "salto de nível de heading").toBeNull();
  expect(audit.semAlt, "imagens sem atributo alt").toHaveLength(0);
});

test("teclado: skip-link e foco visível no primeiro tab", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const focused = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    const cs = getComputedStyle(el);
    return {
      text: el?.textContent?.trim().slice(0, 40),
      outline: cs.outlineStyle !== "none" || el.className.includes("skip"),
    };
  });
  expect(focused.text).toContain("Pular para o conteúdo");
  expect(focused.outline).toBe(true);
});
