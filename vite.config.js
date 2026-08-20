import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Run `netlify functions:serve` alongside `npm run dev` to test the
      // Gemini integration locally without netlify.toml's CSP header
      // breaking Vite's dev-mode HMR (see project notes). That command
      // serves only netlify/functions/* on port 9999, by default.
      '/.netlify/functions': 'http://localhost:9999',
    },
  },
})
