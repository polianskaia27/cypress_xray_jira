const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    idToken: null,
    username: "polalextest",
    password: "123test",
  },
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-xray-junit-reporter/plugin")(on, config, {});
    },
    baseUrl: "https://sqlverifier-live-6e21ca0ed768.herokuapp.com",
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
  },
  projectId: "suoap9",
  deleteVideoOnPassed: true,
  betterRetries: true,
  reporter: "cypress-xray-junit-reporter",
  reporterOptions: {
    mochaFile: "./report/[suiteName].xml",
    useFullSuiteTitle: false,
    jenkinsMode: true,
    xrayMode: false,
    attachScreenshot: true,
  },
});
