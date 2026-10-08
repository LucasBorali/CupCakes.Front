
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/CupCakes.Front/',
  build: {
    outDir: 'docs',
  },
})