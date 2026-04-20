import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// - Vercel / preview: default production base is "/" (do not set VITE_BASE_PATH).
// - GitHub Pages project site: set VITE_BASE_PATH=/repo-name/ in CI (see workflow).
export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  const fromEnv = process.env.VITE_BASE_PATH?.trim()
  const base = isBuild ? (fromEnv && fromEnv !== '.' ? fromEnv : '/') : '/'

  return {
    base: base.endsWith('/') ? base : `${base}/`,
    plugins: [react(), tailwindcss()],
  }
})
