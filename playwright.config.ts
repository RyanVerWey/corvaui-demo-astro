import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./test-results",
  reporter: "line",
  use: { baseURL: "http://127.0.0.1:4176", reducedMotion: "reduce", trace: "retain-on-failure" },
  webServer: { command: "npx vite preview --host 127.0.0.1 --port 4176", url: "http://127.0.0.1:4176", reuseExistingServer: true },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
