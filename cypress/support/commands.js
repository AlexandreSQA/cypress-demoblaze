Cypress.Commands.add("signupDemoblaze", (opts = {}) => {
  const { password = "123456", maxAttempts = 5 } = opts;

  const genUsername = () =>
    `user_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

  const attempt = (n = 1) => {
    const username = genUsername();

    cy.visit("/");
    cy.get("#signin2").click();
    cy.get("#signInModal", { timeout: 10000 }).should("be.visible");

    cy.window().then((win) => cy.stub(win, "alert").as("signupAlert"));

    cy.get("#sign-username").should("be.visible").clear().type(username);
    cy.get("#sign-password").should("be.visible").clear().type(password);

    cy.get("#signInModal")
      .contains("button", "Sign up")
      .filter(":visible")
      .first()
      .click();

    cy.get("@signupAlert").should("have.been.called");
    cy.get("@signupAlert").then((stub) => {
      const msg = stub.getCall(0)?.args?.[0] || "";

      cy.get("#signInModal .close").click({ force: true });
      cy.get("#signInModal").should("not.be.visible");
      cy.get("body").click(0, 0);

      if (/Sign up successful/i.test(msg)) {
        return cy.writeFile("cypress/fixtures/user.json", { username, password });
      }

      if (/already exist/i.test(msg) && n < maxAttempts) {
        return cy.wait(200).then(() => attempt(n + 1));
      }

      throw new Error(`Falha no signup: ${msg}`);
    });
  };

  attempt(1);
});







Cypress.Commands.add("loginDemoblaze", () => {
  cy.readFile("cypress/fixtures/user.json").then((u) => {
    if (!u?.username || !u?.password) {
      throw new Error(
        "user.json inválido. Esperado { username, password } em cypress/fixtures/user.json"
      );
    }

    cy.intercept("POST", "**/login").as("apiLogin");

    cy.visit("/");

    cy.get("#login2").click();
    cy.get("#logInModal", { timeout: 10000 }).should("be.visible");

    cy.get("#loginusername").should("be.visible").clear().type(u.username);
    cy.get("#loginpassword").should("be.visible").clear().type(u.password);

    cy.get("#logInModal")
      .contains("button", "Log in")
      .filter(":visible")
      .first()
      .click();

    cy.wait("@apiLogin", { timeout: 30000 }).then((interception) => {
      const body = interception?.response?.body;
      const errorMessage = body?.errorMessage || body?.error || body?.message;
      if (errorMessage) throw new Error(`Falha no login: ${errorMessage}`);
    });

    cy.get("#nameofuser", { timeout: 30000 })
      .should("not.have.css", "display", "none")
      .and("contain", u.username);
  });
});



Cypress.Commands.add("addProductToCart", (productName) => {
  cy.visit("/")

  cy.contains(".card-title", productName)
    .should("be.visible")
    .parents(".card")
    .find("a.hrefch")
    .filter(":visible")
    .first()
    .click()

  cy.contains("a", "Add to cart")
    .filter(":visible")
    .first()
    .click()
  cy.wait(800)

  cy.contains("a", "Home")
    .filter(":visible")
    .first()
    .click()
})

Cypress.Commands.add("placeOrder", () => {
  cy.get("#orderModal", { timeout: 20000})
    .should("have.class", "show")
    .and("be.visible")
    .within(() => {
      cy.get("#name").clear().type("Alex");
      cy.get("#country").clear().type("Brasil");
      cy.get("#city").clear().type("SP");
      cy.get("#card").clear().type("1234123412341234");
      cy.get("#month").clear().type("12");
      cy.get("#year").clear().type("2028");

      cy.contains("button", /^Purchase$/)
        .filter(":visible")
        .first()
        .should("be.enabled")
        .click();
    });

  cy.get(".sweet-alert", { timeout: 20000 }).should("be.visible");
  cy.contains(".sweet-alert h2", "Thank you for your purchase", { timeout: 20000})
    .should("be.visible");

  if (cy.screenshotStable) cy.screenshotStable("SUCESSO_compra_concluida");
});




Cypress.Commands.add("screenshotStable", (name) => {
  cy.document().its("readyState").should("eq", "complete");
  cy.get("body", { timeout: 10000 }).should("be.visible");
  cy.wait(500);
  cy.screenshot(name, { capture: "viewport", overwrite: true });
});

Cypress.Commands.add("logoutDemoblaze", () => {
  cy.visit("/");
  cy.get("body").then(($body) => {
    if ($body.find("#logout2").length) {
      cy.get("#logout2").click({ force: true });
    }
  });
  cy.get("#nameofuser").should("have.css", "display", "none");
});

