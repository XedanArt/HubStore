import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  css: {
    postcss: path.resolve(__dirname, "./postcss.config.cjs"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "react": path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "../../dist/renderer"),
    emptyOutDir: false,
  },
});
