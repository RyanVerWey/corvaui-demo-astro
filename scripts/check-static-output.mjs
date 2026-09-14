import { readFileSync } from "node:fs";

const expected = [
  ["dist/index.html", "Room to hear what comes next."],
  ["dist/about/index.html", "A room, a house, or the whole horizon."],
  ["dist/data-table/index.html", "Bookings, with the human details intact."],
  ["dist/dashboard/index.html", "A report for protecting the experience."],
  ["dist/host/index.html", "A host desk built around the guest, not the checklist."],
];

for (const [file, text] of expected) {
  const html = readFileSync(file, "utf8");
  if (!html.includes(text)) {
    throw new Error(`${file} is missing static content: ${text}`);
  }
}

console.log(`Verified static content in ${expected.length} routes.`);
