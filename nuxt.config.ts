import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  vite: {
    plugins: [tailwindcss()]
  },
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "nuxt-toast",
    "@pinia/nuxt",
  ],
  plugins: ["~/plugins/auth-checker.client.ts"],
  css: ["~/assets/styles/main.css"],
  fonts: {
    defaults: {
      weights: [400, 700],
    }
  },
})
