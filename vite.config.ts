import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port:5180
  },
  base: "/Vite-React-TS-Template/",   // 👈 REQUIRED for GitHub Pages
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@apis": path.resolve(__dirname, "./src/apis"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@state": path.resolve(__dirname, "./src/state"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@i18n": path.resolve(__dirname, "./src/i18n"),
      "@playground": path.resolve(__dirname, "./src/playground"),
    },
  },
});
