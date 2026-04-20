import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// GitHub Pages project URL: https://<user>.github.io/<repo>/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/caribbean-connection/' : '/',
  plugins: [react(), tailwindcss()],
}))
