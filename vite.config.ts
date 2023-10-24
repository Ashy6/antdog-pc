import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: 'https://www.bee456.com',
        target: 'https://2167d872c4.zicp.fun',
        // target: '154.212.145.170:9001',
        changeOrigin: true,
        ws: true,
        rewrite: path => {
          return path.replace(/^\/api/, '')
        }
      }
    }
  }
})
