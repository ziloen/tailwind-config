import { defineConfig } from "tsdown"

export default defineConfig({
  entry: [
    "src/containerQueries.ts",
    "src/plugin.ts"
  ],
  target: "esnext",
  outDir: "dist",
  minify: false,
  dts: true,
  format: ["esm"],
  platform: "node",
  skipNodeModulesBundle: true,
  treeshake: true,
  sourcemap: false,
  clean: true,
})