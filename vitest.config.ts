import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8", // atau "istanbul"
      reporter: ["text", "lcov", "html"],
    },
  },
});
