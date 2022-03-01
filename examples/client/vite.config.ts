import { vitePWAConfig } from '@pwa-toolkit/vite-config'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProd = process.env.NODE_ENV === 'production'
  return {
    build: {
      sourcemap: true,
      rollupOptions: {
        input: {
          main: './index.html',
          nested: './nested/index.html',
        },
      },
    },
    define: {
      __BUILD_DATE: JSON.stringify(new Date().toISOString()),
      __ENABLE_LOGGING: !isProd,
      // set process.env.NODE_ENV to development to enable workbox logging OR
      // run NODE_ENV=development vite build --mode development
      // 'process.env.NODE_ENV': JSON.stringify('development'),
    },
    plugins: [VitePWA(vitePWAConfig()), react()],
  }
})
