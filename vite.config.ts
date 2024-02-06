import { configDefaults, defineConfig } from "vitest/config";
import { viteStaticCopy } from "vite-plugin-static-copy";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@us-gov-cdc/cdc-react/dist/fonts",
          dest: "fonts",
        },
        {
          src: "node_modules/@us-gov-cdc/cdc-react/dist/fonts",
          dest: "../public",
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
  build: {
    outDir: "./api/src/main/resources/static",
  },
});
