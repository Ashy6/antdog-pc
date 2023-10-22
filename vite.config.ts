import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/gcard/web': {
        target: 'https://www.bee456.com/gcard/web/',
        changeOrigin: true,
        ws: true,
        rewrite: path => {
          return path.replace(/^\/api/, '')
        }
      }
    }
  }
})
