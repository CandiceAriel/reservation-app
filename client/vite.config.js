import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'; 
import { fileURLToPath } from 'url'; // 1. Import this

// 2. Define __dirname manually
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      // 2. Map '@' to the absolute path of your 'src' directory
      '@': path.resolve(__dirname, './src'),
    },
  },
})
