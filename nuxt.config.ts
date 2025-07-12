import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // turn off to make protected auth route middleware work correctly
  // otherwise nuxt server will try to check cookie authentication before server rendering each page
  // and of course the server doesn't have the client-side cookies
  ssr: false,
  nitro: {
    preset: "cloudflare_module",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        name: "recipe-pwa",
      },
    },
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  plugins: [
    "~/plugins/auth-checker.client.ts",
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  modules: ["@nuxt/fonts", "@nuxt/icon", "nuxt-toast", "@pinia/nuxt", '@vite-pwa/nuxt'],
  css: ["~/assets/styles/main.css"],
  fonts: {
    defaults: {
      weights: [400, 700],
    },
  },
  pwa: {
    injectRegister: "auto",
    registerType: "autoUpdate",
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}']
    },
    includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg", "favicon.svg"],
    manifest: {
      name: 'Recipe App',
      short_name: 'Recipes',
      description: 'My Favorite Recipes Saved',
      theme_color: '#F3E5F5',
      background_color: '#F3E5F5',
      icons: [
        {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },
  },
});
