import { defineConfig, devices } from "@playwright/test";

// Gate do build-pipeline: zero erro de console em todas as rotas,
// desktop e mobile, contra o build de produção (next start).
const PORT = process.env.E2E_PORT || "3100";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  webServer: {
    // build+start em .next-e2e: hermético, não briga com o `next dev` do preview
    command: `NEXT_DIST_DIR=.next-e2e npm run build && NEXT_DIST_DIR=.next-e2e npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
