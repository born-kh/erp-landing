import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// The public origin of the site; set SITE_URL in the build environment (see README).
const site = process.env.SITE_URL || "https://example.com";

export default defineConfig({
  site,
  trailingSlash: "always",
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: "ru", locales: { ru: "ru-RU", tg: "tg-TJ", en: "en-US" } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
