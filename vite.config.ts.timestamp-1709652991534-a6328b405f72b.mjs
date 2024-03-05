// vite.config.ts
import { configDefaults, defineConfig } from "file:///Users/zrizer/Fearless/dex/data-exchange-portal/node_modules/vitest/dist/config.js";
import { viteStaticCopy } from "file:///Users/zrizer/Fearless/dex/data-exchange-portal/node_modules/vite-plugin-static-copy/dist/index.js";
import { resolve } from "path";
import react from "file:///Users/zrizer/Fearless/dex/data-exchange-portal/node_modules/@vitejs/plugin-react/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/zrizer/Fearless/dex/data-exchange-portal";
var vite_config_default = defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@us-gov-cdc/cdc-react/dist/fonts",
          dest: "../public"
        }
      ]
    }),
    react()
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__vite_injected_original_dirname, "index.html"),
        "upload-tool": resolve(__vite_injected_original_dirname, "upload-tool/index.html")
      }
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    exclude: [...configDefaults.exclude, "./tests/e2e/**", "./api/**"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvenJpemVyL0ZlYXJsZXNzL2RleC9kYXRhLWV4Y2hhbmdlLXBvcnRhbFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3pyaXplci9GZWFybGVzcy9kZXgvZGF0YS1leGNoYW5nZS1wb3J0YWwvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3pyaXplci9GZWFybGVzcy9kZXgvZGF0YS1leGNoYW5nZS1wb3J0YWwvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBVc2VyQ29uZmlnLCBjb25maWdEZWZhdWx0cywgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVzdC9jb25maWdcIjtcbmltcG9ydCB7IHZpdGVTdGF0aWNDb3B5IH0gZnJvbSBcInZpdGUtcGx1Z2luLXN0YXRpYy1jb3B5XCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcblxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdml0ZVN0YXRpY0NvcHkoe1xuICAgICAgdGFyZ2V0czogW1xuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBcIm5vZGVfbW9kdWxlcy9AdXMtZ292LWNkYy9jZGMtcmVhY3QvZGlzdC9mb250c1wiLFxuICAgICAgICAgIGRlc3Q6IFwiLi4vcHVibGljXCIsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICAgIHJlYWN0KCksXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgbWFpbjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgICAgXCJ1cGxvYWQtdG9vbFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCJ1cGxvYWQtdG9vbC9pbmRleC5odG1sXCIpLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB0ZXN0OiB7XG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiLFxuICAgIHNldHVwRmlsZXM6IFwiLi90ZXN0cy9zZXR1cC50c1wiLFxuICAgIGV4Y2x1ZGU6IFsuLi5jb25maWdEZWZhdWx0cy5leGNsdWRlLCBcIi4vdGVzdHMvZTJlLyoqXCIsIFwiLi9hcGkvKipcIl0sXG4gIH0sXG59IGFzIFVzZXJDb25maWcpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErVCxTQUFxQixnQkFBZ0Isb0JBQW9CO0FBQ3hYLFNBQVMsc0JBQXNCO0FBQy9CLFNBQVMsZUFBZTtBQUV4QixPQUFPLFdBQVc7QUFKbEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsZUFBZTtBQUFBLE1BQ2IsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLE1BQU0sUUFBUSxrQ0FBVyxZQUFZO0FBQUEsUUFDckMsZUFBZSxRQUFRLGtDQUFXLHdCQUF3QjtBQUFBLE1BQzVEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFlBQVk7QUFBQSxJQUNaLFNBQVMsQ0FBQyxHQUFHLGVBQWUsU0FBUyxrQkFBa0IsVUFBVTtBQUFBLEVBQ25FO0FBQ0YsQ0FBZTsiLAogICJuYW1lcyI6IFtdCn0K
