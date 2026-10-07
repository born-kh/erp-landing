// Fails a production build while example (placeholder) content is still on the site.
// A "production" build is one with a real SITE_URL; set ALLOW_PLACEHOLDERS=1 to build anyway.
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/lib/content.ts", import.meta.url), "utf8");
const count = (source.match(/^\s*placeholder:\s*true,/gm) ?? []).length;
const site = process.env.SITE_URL || "";
const production = site && !/example\.(com|org)/.test(site);

if (count > 0) {
  const message = `\n  ${count} content block(s) in src/lib/content.ts are still EXAMPLE content (placeholder: true):\n  client logos, numbers, the testimonial, prices and FAQ answers. Replace them with real data and set placeholder: false.\n`;
  if (production && process.env.ALLOW_PLACEHOLDERS !== "1") {
    console.error(`\n✖ Refusing to build for production.${message}  (Set ALLOW_PLACEHOLDERS=1 to build anyway.)\n`);
    process.exit(1);
  }
  console.warn(`\n⚠${message}`);
}
