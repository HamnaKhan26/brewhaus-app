import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // forward /api requests to backend
      '/api': {
        target: 'http://localhost:3000', // Node/Express backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
