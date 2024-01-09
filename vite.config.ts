import { configDefaults, defineConfig } from "vitest/config";
import copy from "rollup-plugin-copy";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    copy({
      targets: [
        {
          src: "node_modules/@us-gov-cdc/cdc-react/dist/fonts",
          dest: ["dist", "public"],
        },
      ],
    }),
    react(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    exclude: [...configDefaults.exclude, "./tests/e2e/**", "./api/**"],
  },
});
