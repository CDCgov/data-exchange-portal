import { UserConfig, configDefaults, defineConfig } from "vitest/config";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path, { resolve } from "path";

import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@us-gov-cdc/cdc-react/dist/fonts",
          dest: "../public",
        },
      ],
    }),
    react(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "upload-tool": resolve(__dirname, "upload-tool/index.html"),
      },
    },
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      tests: path.resolve(__dirname, "./tests"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    exclude: [...configDefaults.exclude, "./tests/e2e/**", "./api/**"],
  },
} as UserConfig);
