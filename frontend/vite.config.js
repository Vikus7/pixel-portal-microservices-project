import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Necesario para Docker
    port: 5173,
    watch: {
      usePolling: true // Necesario para hot reload en Docker
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})