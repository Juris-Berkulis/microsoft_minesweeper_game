import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

//* Если переменная среды ровна 'development', то мы находимся в режиме разработки, а иначе - в режиме продакшн:
// const isDev = process.env.NODE_ENV === 'development';
// const isProd = !isDev;
console.log(`\n========== РЕЖИМ: ${process.env.NODE_ENV && typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toUpperCase() : process.env.NODE_ENV} ==========\n`);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
