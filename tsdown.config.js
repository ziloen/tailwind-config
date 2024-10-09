import { defineConfig } from "tsdown"

export default defineConfig({
  entry: [
    "src/index.ts",
  ],
  treeshake: true,
  format: ["esm"],
  platform: "node",
  dts: true,
  clean: true,
  sourcemap: false,
  minify: false,
})