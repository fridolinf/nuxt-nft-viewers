import { defineConfig } from "cypress";
module.exports = defineConfig({
  /* This is a configuration object for Cypress that specifies the location of the support files and
  the base URL for end-to-end (e2e) tests. */
  e2e: {
    supportFile: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx,vue}",
    baseUrl: "http://localhost:3000",
  },
  chromeWebSecurity: false, //add this for cross domain testing with cypress

});
