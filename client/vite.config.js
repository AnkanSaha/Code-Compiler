import { defineConfig } from "vite"; // vite config
import react from "@vitejs/plugin-react-swc"; // react-swc plugin
import { VitePWA } from "vite-plugin-pwa"; // pwa plugin

/* The code is exporting a default configuration object for the Vite build tool. This configuration
object specifies various settings and options for the build process. */
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Code-Editor",
        short_name: "Code-Editor",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/icons/PWA Icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icons/PWA Icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icons/PWA Icons/icon-152x152.png",
            sizes: "256x256",
            type: "image/png",
            purpose: "any maskable",
            destination: "/assets/icons",
          },
          {
            src: "/icons/PWA Icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "any maskable",
            destination: "/assets/icons",
          },
          {
            src: "/icons/PWA Icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any maskable",
            destination: "/assets/icons",
          },
          {
            src: "/icons/PWA Icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "any maskable",
            destination: "/assets/icons",
          },
          {
            src: "/icons/PWA Icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any maskable",
            destination: "/assets/icons",
          },
          {
            src: "/icons/PWA Icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "any maskable",
            destination: "/assets/icons",
          }
        ],
      },
    }),
  ],
  cacheDir: ".vite",
  assetsInclude: ["**/*.jpeg", "**/*.png", "**/*.svg", "**/*.gif", "**/*.jpg, **/*.webp, **/*.ico, **/*.json, **/*.webmanifest, **/*.xml, **/*.pdf, **/*.txt, **/*.md, **/*.woff, **/*.woff2, **/*.ttf, **/*.otf, **/*.eot, **/*.wav, **/*.mp3, **/*.mp4, **/*.webm, **/*.ogg, **/*.m4a, **/*.aac, **/*.flac, **/*.oga, **/*.opus, **/*.svg, **/*.svgz, **/*.zip, **/*.gz, **/*.tgz, **/*.brotli, **/*.7z, **/*.rar, **/*.bz2, **/*.xz, **/*.pdf, **/*.epub, **/*.woff, **/*.woff2, **/*.ttf, **/*.otf, **/*.eot, **/*.wav, **/*.mp3, **/*.mp4, **/*.webm, **/*.ogg, **/*.m4a, **/*.aac, **/*.flac, **/*.oga, **/*.opus, **/*.svg, **/*.svgz, **/*.zip, **/*.gz, **/*.tgz, **/*.brotli, **/*.7z, **/*.rar, **/*.bz2, **/*.xz, **/*.pdf, **/*.epub, **/*.woff, **/*.woff2, **/*.ttf, **/*.otf, **/*.eot, **/*.wav, **/*.mp3, **/*.mp4, **/*.webm, **/*.ogg, **/*.m4a, **/*.aac, **/*.flac, **/*.oga, **/*.opus, **/*.svg, **/*.svgz, **/*.zip, **/*.gz, **/*.tgz, **/*.brotli, **/*.7z, **/*.rar, **/*.bz2, **/*.xz, **/*.pdf, **/*.epub"],
  base: "/",
  mode: "production",
  ssr: true,
  worker: true,
  experimental: {
    cssVarsInjection: false,
    cssStaticVarInjection: true,
    optimizeDeps: true,
    hmrPartialAccept: true
  },
  publicDir: "public",
  preview: {
    cors: true,
    port: 3000,
    strictPort: true,
    open: true,
    hmr: true,
    https: false,
    host: "localhost",
    force: false
  },
  build: {
    outDir: "Code-Editor",
    emptyOutDir: true,
    sourcemap: true,
    minify: true,
    ssrManifest: true,
    modulePreload: true,
    copyPublicDir: true,
    cssCodeSplit: true,
    manifest: true,
    cssTarget: "es2015",
    target: "es2015",
    assetsDir: "assets",
    chunkSizeWarningLimit: 100000,
    cssMinify: true,
    ssrEmitAssets: true,
    write: true,
    assetsInlineLimit: 5128
  },
  server: {
    port: 5173,
    strictPort: true,
    open: true,
    cors: true,
    hmr: true,
    https: false,
    host: "localhost",
    force: false
  },
  resolve: {
    alias: {
      "@src": "/src",
      "@public": "/public",
      "@app": "/src/App",
      "@component": "/src/Component",
      "@page": "/src/Pages",
      "@helper": "/src/Helper",
      "@setting": "/src/Settings",
      "@validator": "/src/Validator",
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  }
});
