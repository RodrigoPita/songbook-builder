import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/songbook-builder/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true,

    // Increase chunk size warning limit to 1000 kB
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // Manual chunking strategy
        manualChunks: {
          // Vendor chunk: React and related libraries
          'react-vendor': ['react', 'react-dom'],

          // Firebase chunk: All Firebase services
          'firebase-vendor': [
            'firebase/app',
            'firebase/firestore',
            'firebase/storage'
          ],

          // Icons chunk: Lucide React icons
          'icons-vendor': ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/storage': {
        target: 'https://storage.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/storage/, '')
      },
      '/api/gotenberg': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gotenberg/, '')
      }
    }
  }
})
