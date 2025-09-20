import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import Pages from "vite-plugin-pages";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Pages({
      dirs: ["src/pages"],
      extensions: ["tsx", "jsx"],
      importMode: "async",
    }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Layanan Dana Masyarakat",
        short_name: "Ladama",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#17a449",
        icons: [
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
});
