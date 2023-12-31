import { fileURLToPath, URL } from 'node:url'

import { defineConfig, IndexHtmlTransformResult } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const fs = require("fs");
import {
  addFavicons,
  faviconsOutputDirPath,
  faviconsOutputDirFullPath,
  htmlBaseName,
} from './VCPlaginHtml';
import { VitePWA } from 'vite-plugin-pwa';

//* Если переменная среды ровна 'development', то мы находимся в режиме разработки, а иначе - в режиме продакшн:
const isProd: boolean = process.env.NODE_ENV === 'production';
console.log(`\n========== РЕЖИМ: ${process.env.NODE_ENV && typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toUpperCase() : process.env.NODE_ENV} ==========\n`);

interface HtmlPlugin {
  name: string,
  transformIndexHtml(html: string): 
  | IndexHtmlTransformResult
  | void
  | Promise<IndexHtmlTransformResult | void>,
};

const htmlPlugin = (): HtmlPlugin => { //* - https://vitejs.dev/guide/api-plugin.html#transformindexhtml.
  return {
    name: 'html-transform',
    async transformIndexHtml(html) {
      await addFavicons();

      //* Прочитать данные файла "dist/assets/favicons/index.html", который содержит ислючительно только ссылки на файлы, созданные плагином "favicon", и исправить эти ссылки:
      let linkTags: any = fs.readFileSync(`${faviconsOutputDirFullPath}/${htmlBaseName}`, "utf8")
        .replace(/href="\//g, `href="${faviconsOutputDirPath}/`)
        .replace(/href=".*manifest.webmanifest"/, 'href="/manifest.webmanifest"')
        .replace(/content="\//g, `content="${faviconsOutputDirPath}/`);

      //* Добавить в файл "dist/index.html" исправленные ссылки на файлы, созданные плагином "favicon":
      return html.replace(
        /<head>/,
        `<head>\n    ${linkTags}`,
      )
    },
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8018,
  },
  plugins: [
    vue(),
    vueJsx(),
    isProd ? htmlPlugin() : null,
    VitePWA({ //* - Все параметры и описание на сайте "https://github.com/vite-pwa/vite-plugin-pwa/blob/main/src/types.ts".
      mode: isProd ? 'production' : 'development',
      outDir: 'dist',
      filename: 'service-worker.js',
      manifestFilename: 'manifest.webmanifest',
      strategies: 'generateSW',
      injectRegister: null, //* - 'inline' | 'script' | 'auto' | null | false.
      registerType: 'prompt', //* - 'prompt' | 'autoUpdate'.
      minify: isProd ? true : false,
      manifest: false,
      selfDestroying: false, //* - Отменить регистрацию сервис-воркера?
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
