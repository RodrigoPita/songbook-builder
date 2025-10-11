import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/songbook-builder/', // IMPORTANTE: Nome do seu repositório GitHub
  publicDir: 'public', // Pasta onde estão os arquivos .cho e index.json
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Copia todos os arquivos de public/ para dist/
    copyPublicDir: true
  },
  server: {
    // Para desenvolvimento local
    port: 5173
  }
})