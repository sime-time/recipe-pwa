import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // turn off to make protected auth route middleware work correctly
  // otherwise nuxt server will try to check cookie authentication before server rendering each page
  // and of course the server doesn't have the client-side cookies
  ssr: false,
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
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "nuxt-toast",
    "@pinia/nuxt",
  ],
  css: ["~/assets/styles/main.css"],
  fonts: {
    defaults: {
      weights: [400, 700],
    }
  },
})
