import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { serviceForPath } from "./src/content/serviceDetails.ts";
import { siteSchema } from "./src/shared/siteMetadata.ts";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "burkut-structured-data",
      transformIndexHtml(html, context) {
        return {
          html,
          tags: [
            {
              tag: "script",
              attrs: { type: "application/ld+json" },
              children: siteSchema(serviceForPath(context.path)),
              injectTo: "head",
            },
          ],
        };
      },
    },
  ],
  build: {
    rolldownOptions: {
      input: {
        home: "index.html",
        web: "hizmetler/web/index.html",
        app: "hizmetler/uygulama/index.html",
        game: "hizmetler/oyun/index.html",
      },
    },
  },
  server: { proxy: { "/api": "http://127.0.0.1:8787" } },
});
