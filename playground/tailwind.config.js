import { defineConfig, preset } from '../dist/index.js'


export default defineConfig({
  // content: ["./**/*.{html,js,ts,jsx,tsx}"],
  content: ["./**/*.html"],
  presets: [preset]
})