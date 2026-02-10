import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This allows the Cloudflare tunnel URL to access the dev server
    allowedHosts: true
  }
})