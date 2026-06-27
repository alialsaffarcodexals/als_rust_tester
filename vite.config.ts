import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3200,
    proxy: {
      '/playground': {
        target: 'https://play.rust-lang.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/playground/, ''),
        secure: true,
      },
    },
  },
})
