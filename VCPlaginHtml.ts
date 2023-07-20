import favicons, { FaviconFile, FaviconImage, FaviconOptions, FaviconResponse } from "favicons"; //* - Подробнее на сайте "https://github.com/itgalaxy/favicons".
import path from "path";
import fsPromises from "fs/promises";
const fs = require("fs");

const outputDir: string = './dist';
export const faviconsOutputDirPath: string = 'assets/favicons';
export const faviconsOutputDirFullPath: string = `${outputDir}/${faviconsOutputDirPath}`; // Output directory path.
const logoImg: string = './src/assets/favicon/logo.png'; // Source image(s). `string`, `buffer` or array of `string`
export const htmlBaseName: string = 'index.html'; // HTML file basename.

const configuration: FaviconOptions = {
    //? path: "/", // Path for overriding default icons path. `string`
    appName: 'Minesweeper', // Your application's name. `string`
    appShortName: 'Minesweeper', // Your application's short_name. `string`. Optional. If not set, appName will be used
    appDescription: 'Minesweeper - это версия классической игры Сапёр, существующей уже более 30 лет', // Your application's description. `string`
    developerName: 'Беркуль Юрий Эдуардович', // Your (or your developer's) name. `string`
    developerURL: undefined, // Your (or your developer's) URL. `string`
    dir: "auto", // Primary text direction for name, short_name, and description
    lang: "ru-RU", // Primary language for name and short_name
    background: "#eeeeee", // Background colour for flattened icons. `string`
    theme_color: "#cceecc", // Theme color user for example in Android's task switcher. `string`
    appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
    display: "standalone", // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
    orientation: "any", // Default orientation: "any", "natural", "portrait" or "landscape". `string`
    //? scope: "/", // set of URLs that the browser considers within your app
    //? start_url: "/?homescreen=1", // Start URL when launching the application from a device. `string`
    preferRelatedApplications: true, // Should the browser prompt the user to install the native companion app. `boolean`
    //? relatedApplications: undefined, // Information about the native companion apps. This will only be used if `preferRelatedApplications` is `true`. `Array<{ id: string, url: string, platform: string }>`
    version: "1.0", // Your application's version string. `string`
    //? pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
    loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
    manifestMaskable: true, // Maskable source image(s) for manifest.json. "true" to use default source. More information at https://web.dev/maskable-icon/. `boolean`, `string`, `buffer` or array of `string`
    icons: {
        // Platform Options:
        // - offset - offset in percentage
        // - background:
        //   * false - use default
        //   * true - force use default, e.g. set background for Android icons
        //   * color - set background for the specified icons
        //
        android: true, // Create Android homescreen icon. `boolean` or `{ offset, background }` or an array of sources
        appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background }` or an array of sources
        appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }` or an array of sources
        favicons: true, // Create regular favicons. `boolean` or `{ offset, background }` or an array of sources
        windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background }` or an array of sources
        yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background }` or an array of sources
    },
    //? shortcuts: [
        // Your applications's Shortcuts (see: https://developer.mozilla.org/docs/Web/Manifest/shortcuts)
        // Array of shortcut objects:
        // {
            //? name: "View your Inbox", // The name of the shortcut. `string`
            //? short_name: "inbox", // optionally, falls back to name. `string`
            //? description: "View your inbox messages", // optionally, not used in any implemention yet. `string`
            //? url: "/inbox", // The URL this shortcut should lead to. `string`
            //? icon: "test/inbox_shortcut.png", // source image(s) for that shortcut. `string`, `buffer` or array of `string`
        // },
        // more shortcuts objects
    // ],
};

export const addFavicons = async (): Promise<void> => {
    const response: FaviconResponse = await favicons(logoImg, configuration);
    await fsPromises.mkdir(faviconsOutputDirFullPath, { recursive: true });
    await Promise.all(
        response.images.map(
            async (image: FaviconImage) => {
                await fsPromises.writeFile(path.join(faviconsOutputDirFullPath, image.name), image.contents); //* - Создать в папке "dist/assets/favicons" картинки фавиконов, созданные с помощью плагина "favicons".
            }
        )
    );
    await Promise.all(
        response.files.map(
            async (file: FaviconFile) => {
                if (file.name === 'manifest.webmanifest') {
                    await fsPromises.writeFile(path.join(outputDir, file.name), file.contents); //* - Создать в папке "dist" файл 'manifest.webmanifest', созданный с помощью плагина "favicons".
                } else {
                    await fsPromises.writeFile(path.join(faviconsOutputDirFullPath, file.name), file.contents); //* - Создать в папке "dist/assets/favicons" файлы, созданные с помощью плагина "favicons".
                }
            }
        )
    );
    await fsPromises.writeFile(path.join(faviconsOutputDirFullPath, htmlBaseName), response.html.join("\n    ")); //* - Создать в папке "dist/assets/favicons" файл "index.html", созданный с помощью плагина "favicons", который содержит исключительно только пока ещё неверные ссылки на файлы, созданные с помощью плагина "favicons".

    //* Прочитать файл "dist/manifest.webmanifest", исправить в нём ссылки на картинки и перезаписать сам файл:
    let manifestContent: any = fs.readFileSync(`${outputDir}/manifest.webmanifest`, "utf8")
        .replace(/"src": "\//g, `"src": "${faviconsOutputDirPath}/`);
    await fsPromises.writeFile(path.join(outputDir, 'manifest.webmanifest'), manifestContent);
};
