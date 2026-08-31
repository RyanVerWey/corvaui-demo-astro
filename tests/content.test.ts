import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { routes, bookingRows, stayRows, revenueData, occupancyData } from "../src/content";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

describe("Fieldnote House demo contract", () => {
  it("uses the current first-class Astro integration", () => {
    expect(pkg.dependencies["@corvaui/astro"]).toBe("^0.2.1");
    expect(pkg.dependencies["@corvaui/web-components"]).toBeUndefined();
    expect(pkg.dependencies["@corvaui/tokens"]).toBe("^0.2.1");
  });
  it("ships the complete showcase route set", () => {
    expect(routes.map((route) => route.href)).toEqual(["/", "/about/", "/data-table/", "/dashboard/", "/host/"]);
  });
  it("uses unique booking identifiers and enough rows for paging", () => {
    const ids = bookingRows.map((row) => row.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(bookingRows.length).toBeGreaterThanOrEqual(8);
    expect(stayRows.length).toBeGreaterThanOrEqual(5);
  });
  it("keeps chart values in valid percentage ranges", () => {
    for (const point of [...revenueData, ...occupancyData]) {
      for (const value of Object.values(point).filter((entry): entry is number => typeof entry === "number")) {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(100);
      }
    }
    expect(Object.keys(occupancyData[0]).filter((key) => key !== "label")).toHaveLength(3);
  });
});
