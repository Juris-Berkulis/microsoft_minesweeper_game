import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const fs = require("fs");
import {
  addFavicons,
  faviconsOutputDirPath,
  faviconsOutputDirFullPath,
  htmlBaseName
} from './VCPlaginHtml';

//* Если переменная среды ровна 'development', то мы находимся в режиме разработки, а иначе - в режиме продакшн:
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log(`\n========== РЕЖИМ: ${process.env.NODE_ENV && typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toUpperCase() : process.env.NODE_ENV} ==========\n`);

const htmlPlugin = () => { //* - https://vitejs.dev/guide/api-plugin.html#transformindexhtml.
  return {
    name: 'html-transform',
    async transformIndexHtml(html: any) {
      await addFavicons();

      //* Прочитать данные файла "dist/assets/favicons/index.html", который содержит ислючительно только ссылки на файлы, созданные плагином "favicon", и исправить эти ссылки:
      let linkTags = fs.readFileSync(`${faviconsOutputDirFullPath}/${htmlBaseName}`, "utf8")
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
  plugins: [
    vue(),
    vueJsx(),
    isProd ? htmlPlugin() : null,
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
