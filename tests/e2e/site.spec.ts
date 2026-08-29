import { createRequire } from "node:module";
import { expect, test } from "@playwright/test";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");
const routes = [
  ["home", "/", "31 of 34 arrivals prepared", 3],
  ["stays", "/about/", "Hosted daily", 3],
  ["bookings", "/data-table/", "FH-2418", 0],
  ["reports", "/dashboard/", "This week", 1],
  ["host", "/host/", "Arrival flow", 1],
] as const;

for (const [name, path, expectedContent, expectedImageCount] of routes) {
  test(`${name} route is responsive and WCAG AA clean`, async ({ page }, testInfo) => {
    const runtimeErrors: string[] = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error" || /hydration/i.test(message.text())) runtimeErrors.push(message.text());
    });
    await page.goto(path, { waitUntil: "networkidle" });
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(viewportWidth).toBe(testInfo.project.name === "mobile" ? 412 : 1440);
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.getByText(expectedContent, { exact: false }).first()).toBeVisible();
    const images = page.locator("main img");
    await expect(images).toHaveCount(expectedImageCount);
    for (let index = 0; index < expectedImageCount; index += 1) {
      await images.nth(index).scrollIntoViewIfNeeded();
      await expect.poll(() => images.nth(index).evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    }
    const invalidImages = await images.evaluateAll((nodes) => nodes.filter((node) => {
      const image = node as HTMLImageElement;
      return !image.src.includes("/images/") || !image.alt.trim() || image.naturalWidth === 0;
    }).map((node) => (node as HTMLImageElement).src));
    expect(invalidImages).toEqual([]);
    const overflow = await page.evaluate(() => ({
      amount: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      elements: [...document.querySelectorAll("*")].filter((element) => element.getBoundingClientRect().right > document.documentElement.clientWidth + 1).slice(0, 8).map((element) => `${element.tagName.toLowerCase()}.${element.className}`),
    }));
    expect(overflow.amount, overflow.elements.join("\n")).toBeLessThanOrEqual(1);
    expect(runtimeErrors).toEqual([]);
    await page.addScriptTag({ path: axePath });
    const violations = await page.evaluate(async () => (await (window as typeof window & { axe: { run: (root: Document, options: unknown) => Promise<{ violations: unknown[] }> } }).axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } })).violations);
    expect(violations).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath(`${name}.png`), fullPage: true });
  });
}

test("theme control applies an accessible Graphite dark mode", async ({ page }, testInfo) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator("corva-switch").click();
  await expect(page.locator("html")).toHaveAttribute("data-corva-theme", "graphite-dark");
  await page.addScriptTag({ path: axePath });
  const violations = await page.evaluate(async () => (await (window as typeof window & { axe: { run: (root: Document, options: unknown) => Promise<{ violations: unknown[] }> } }).axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } })).violations);
  expect(violations).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath("graphite-dark.png"), fullPage: true });
});
