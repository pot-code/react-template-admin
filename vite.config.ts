import react from "@vitejs/plugin-react-swc"
import { fileURLToPath, URL } from "node:url"
import { visualizer } from "rollup-plugin-visualizer"
import UnoCSS from "unocss/vite"
import AutoImport from "unplugin-auto-import/vite"
import { defineConfig, splitVendorChunkPlugin } from "vite"

export default defineConfig({
  build: {
    outDir: "dist",
  },
  plugins: [
    splitVendorChunkPlugin(),
    visualizer(),
    react({
      jsxImportSource: "@emotion/react",
    }),
    UnoCSS(),
    AutoImport({
      imports: ["react", "react-router-dom"],
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
