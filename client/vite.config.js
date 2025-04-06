import { defineConfig } from 'vite' // vite config
import react from '@vitejs/plugin-react-swc' // react-swc plugin
import { VitePWA } from 'vite-plugin-pwa' // pwa plugin

/* The code is exporting a default configuration object for the Vite build tool. This configuration
object specifies various settings and options for the build process. */
export default defineConfig({
  plugins: [
    react(), // react-swc plugin
    VitePWA({
      // pwa plugin
      registerType: 'autoUpdate', // auto update
      manifest: {
        // manifest
        name: 'Code-Compiler', // name
        short_name: 'Code-Compiler', // short name
        theme_color: '#ffffff', // theme color
        description:
          'Code-Compiler is a web-based code editor that allows you to write and run your code in a web browser.', // description
        start_url: '/', // start url
        display: 'standalone', // standalone
        id: 'com.Code-Compiler', // id
        background_color: '#ffffff', // background color
        lang: 'en-US', // en-US
        dir: 'ltr', // ltr
        orientation: 'any', // any orientation
        prefer_related_applications: true, // prefer related applications
        icons: [
          // icons
          {
            src: '/icons/PWA Icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/PWA Icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/PWA Icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
            purpose: 'any maskable',
            destination: '/assets/icons'
          },
          {
            src: '/icons/PWA Icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any maskable',
            destination: '/assets/icons'
          },
          {
            src: '/icons/PWA Icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'any maskable',
            destination: '/assets/icons'
          },
          {
            src: '/icons/PWA Icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any maskable',
            destination: '/assets/icons'
          },
          {
            src: '/icons/PWA Icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'any maskable',
            destination: '/assets/icons'
          }
        ]
      }
    })
  ],
  cacheDir: '.cache', // cache directory
  assetsInclude: [
    '**/*.jpeg',
    '**/*.txt',
    '**/*.png',
    '**/*.svg',
    '**/*.gif',
    '**/*.jpg, **/*.webp, **/*.ico, **/*.json, **/*.webmanifest, **/*.xml, **/*.pdf, **/*.txt, **/*.md, **/*.woff, **/*.woff2, **/*.ttf, **/*.otf, **/*.eot, **/*.wav, **/*.mp3, **/*.mp4, **/*.webm, **/*.ogg, **/*.m4a, **/*.aac, **/*.flac, **/*.oga, **/*.opus, **/*.svg, **/*.svgz, **/*.zip, **/*.gz, **/*.tgz, **/*.brotli, **/*.7z, **/*.rar, **/*.bz2, **/*.xz, **/*.pdf, **/*.epub, **/*.woff, **/*.woff2, **/*.ttf, **/*.otf, **/*.eot, **/*.wav, **/*.mp3, **/*.mp4, **/*.webm, **/*.ogg, **/*.m4a, **/*.aac, **/*.flac, **/*.oga, **/*.opus, **/*.svg, **/*.svgz, **/*.zip, **/*.gz, **/*.tgz, **/*.brotli, **/*.7z, **/*.rar, **/*.bz2, **/*.xz, **/*.pdf, **/*.epub, **/*.woff, **/*.woff2, **/*.ttf, **/*.otf, **/*.eot, **/*.wav, **/*.mp3, **/*.mp4, **/*.webm, **/*.ogg, **/*.m4a, **/*.aac, **/*.flac, **/*.oga, **/*.opus, **/*.svg, **/*.svgz, **/*.zip, **/*.gz, **/*.tgz, **/*.brotli, **/*.7z, **/*.rar, **/*.bz2, **/*.xz, **/*.pdf, **/*.epub'
  ], // assets include
  base: '/', // base path
  mode: 'production', // mode
  ssr: true, // ssr mode
  worker: true, // worker mode
  experimental: {
    // experimental mode
    cssVarsInjection: false, // css vars injection
    cssStaticVarInjection: true, // css static var injection
    optimizeDeps: true, // optimize deps
    hmrPartialAccept: true // hmr partial accept
  },
  publicDir: 'public', // public directory
  preview: {
    // preview
    cors: true, // cors
    port: 3000, // port
    strictPort: true, // strict port
    open: true, // open
    hmr: true, // hmr
    https: false, // https
    host: 'localhost', // host
    force: false // force
  },
  build: {
    // build
    outDir: 'Code-Compiler', // out directory
    emptyOutDir: true, // empty out directory
    sourcemap: false, // sourcemap
    minify: true, // minify
    ssrManifest: true, // ssr manifest
    modulePreload: true, // module preload
    copyPublicDir: true, // copy public directory
    cssCodeSplit: true, // css code split
    manifest: true, // manifest
    cssTarget: 'es2015', // css target
    target: 'es2015', // target
    assetsDir: 'assets', // assets directory
    chunkSizeWarningLimit: 100000, // chunk size warning limit
    cssMinify: true, // css minify
    ssrEmitAssets: true, // ssr emit assets
    write: true, // write
    assetsInlineLimit: 5128 // assets inline limit
  },
  server: {
    // server
    port: 5173, // port
    strictPort: true, // strict port
    open: true, // open
    cors: true, // cors
    hmr: true, // hmr
    https: false, // https
    host: 'localhost', // host
    force: false // force
  },
  resolve: {
    // resolve
    alias: {
      // alias
      '@src': '/src', // src alias
      '@public': '/public', // public alias
      '@app': '/src/App', // app alias
      '@component': '/src/Components', // component alias
      '@page': '/src/Pages', // page alias
      '@helper': '/src/Helper', // helper alias
      '@setting': '/src/Settings', // setting alias
      '@validator': '/src/Validator', // validator alias
      '@css': '/src/css', // css alias
      '@router': '/src/Settings/Router', // router alias
      '@redux': '/src/App/Redux', // redux alias
      '@assets': '/src/assets' // assets alias
    }
  },
  optimizeDeps: {
    // optimize deps
    include: ['react', 'react-dom', 'react-router-dom'] // include deps
  }
})
