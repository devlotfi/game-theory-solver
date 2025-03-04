import { defineConfig, normalizePath } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

const PYODIDE_EXCLUDE = [
  "!**/*.{md,html}",
  "!**/*.d.ts",
  "!**/*.whl",
  "!**/node_modules",
];

export function viteStaticCopyPyodide() {
  const pyodideDir = dirname(fileURLToPath(import.meta.resolve("pyodide")));
  return viteStaticCopy({
    targets: [
      {
        src: [normalizePath(join(pyodideDir, "*"))].concat(PYODIDE_EXCLUDE),
        dest: "assets",
      },
    ],
  });
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    viteStaticCopyPyodide(),
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
  ],
  optimizeDeps: { exclude: ["pyodide"] },
  base: "/game-theory-solver/",
  build: {
    outDir: "./docs",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("@heroui")) {
            return "heroui";
          }
        },
      },
    },
  },
});
