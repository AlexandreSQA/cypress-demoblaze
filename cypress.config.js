const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.demoblaze.com",

    // Features BDD
    specPattern: "cypress/e2e/features/**/*.feature",

    // Isolamento + sessões estáveis
    testIsolation: true,

    // Timeouts (Demoblaze é lento às vezes)
    defaultCommandTimeout: 10000,
    requestTimeout: 30000,
    responseTimeout: 30000,

    async setupNodeEvents(on, config) {
      // Cucumber
      await addCucumberPreprocessorPlugin(on, config);

      // Esbuild
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});
