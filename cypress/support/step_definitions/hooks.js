

// ✅ cria o usuário UMA ÚNICA VEZ na execução inteira
import { After, Before } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.readFile("cypress/fixtures/user.json", { failOnNonExist: false }).then((u) => {
    if (u?.username && u?.password) return;
    cy.signupDemoblaze();
  });
});

After(function (world) {
  const failed =
    world?.result?.status === "FAILED" ||
    Cypress.currentTest?.state === "failed";

  if (!failed) return;

  const scenarioName =
    (world && world.pickle && world.pickle.name) ||
    (Cypress.currentTest && Cypress.currentTest.title) ||
    "scenario";

  const safeName = scenarioName
    .replace(/[^\w\d\- ]+/g, "")
    .replace(/\s+/g, "_")
    .slice(0, 120);

  cy.screenshot(`FAIL_${safeName}`, { capture: "runner" });
});
