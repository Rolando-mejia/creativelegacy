import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1600,
    minify: 'terser'
  },
  server: {
    headers: {
      'Cache-Control': 'max-age=3600'
    }
  }
})
