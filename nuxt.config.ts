// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  typescript: {
    strict: true,
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  router: {},
});
