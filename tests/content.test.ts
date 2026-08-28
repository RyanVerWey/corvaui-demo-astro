import { describe, expect, it } from "vitest";
import { routes, bookingRows, stayRows, revenueData, occupancyData } from "../src/content";

describe("Fieldnote House demo contract", () => {
  it("ships exactly the four required showcase routes", () => {
    expect(routes.map((route) => route.href)).toEqual(["/", "/about/", "/data-table/", "/dashboard/"]);
  });
  it("uses unique booking identifiers and enough rows for paging", () => {
    const ids = bookingRows.map((row) => row.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(bookingRows.length).toBeGreaterThanOrEqual(8);
    expect(stayRows.length).toBeGreaterThanOrEqual(5);
  });
  it("keeps chart values in valid percentage ranges", () => {
    for (const point of [...revenueData, ...occupancyData]) {
      expect(point.value).toBeGreaterThanOrEqual(0);
      expect(point.value).toBeLessThanOrEqual(100);
    }
  });
});
