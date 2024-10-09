import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  target: 'esnext',
  outDir: 'dist',
  minify: false,
  dts: true,
  format: ['esm'],
  platform: 'node',
  skipNodeModulesBundle: true,
  treeshake: true,
  sourcemap: false,
  clean: true,
})