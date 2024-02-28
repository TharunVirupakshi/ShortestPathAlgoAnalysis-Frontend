import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    '/api': 'http://http://127.0.0.1:5000' // Replace with your backend server URL
  },
  build: {
    outDir: 'build',
  },
})
