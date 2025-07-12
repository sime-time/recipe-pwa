import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
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
  css: ["~/assets/styles/main.css"],
  fonts: {
    defaults: {
      weights: [400, 700],
    }
  },
})
