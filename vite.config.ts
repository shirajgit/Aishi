/// <reference types="vite-react-ssg" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    entry: 'src/main.tsx',
    // /services/custom-web-apps -> /services/custom-web-apps/index.html,
    // so clean URLs work on any static host without rewrites.
    dirStyle: 'nested',
    formatting: 'none',
  },
})
