// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image-edge"],
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      moralis: process.env.MORALIS_WEB3_API_KEY,
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  router: {},
});
