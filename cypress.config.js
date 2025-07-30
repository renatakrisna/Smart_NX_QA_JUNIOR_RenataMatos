const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:'https://opensource-demo.orangehrmlive.com/', // Define a URL base para todos os testes
    pageLoadTimeout: 80000, // Aumentando o tempo para 80 segundos
    defaultCommandTimeout: 60000, //Aumentando o tempo para comandos tipo cy.get()
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
