import { mergeConfig } from "vite";
import viteConfig from "./vite.config";

export default mergeConfig(viteConfig, {
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      enabled: true,
      reporter: ["text", "lcov"],
    },
    reporters: ["verbose"],
  },
});
