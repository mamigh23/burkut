import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
