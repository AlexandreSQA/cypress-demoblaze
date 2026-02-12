import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const clearCart = () => {
  cy.visit("/cart.html");
  cy.get("#tbodyid", { timeout: 20000 }).should("exist");

  const removeAll = () => {
    cy.get("body").then(($body) => {
      const deletes = $body.find("#tbodyid a:contains('Delete')");
      if (!deletes.length) return;

      cy.wrap(deletes[0]).click();
      cy.wait(800);
      removeAll();
    });
  };

  removeAll();
  cy.get("#tbodyid").find("tr").should("have.length", 0);
};



Given("que estou na home", () => {
  cy.visit("/");
});

When("eu crio uma conta com dados gerados", () => {});

Then("a conta deve ser criada com sucesso", () => {
  cy.loginDemoblaze();
  cy.screenshotStable("SUCESSO_home_logada");
  cy.logoutDemoblaze();
});

Given("que estou logado", () => {
  cy.loginDemoblaze();
});

Given("adiciono o produto {string} ao carrinho", (productName) => {
  clearCart();

  cy.visit("/");
  cy.contains("a", "Monitors", { timeout: 20000 }).click();

  cy.contains(".card-title", productName, { timeout: 20000 })
    .parents(".card")
    .find("a.hrefch")
    .first()
    .click();

  cy.intercept("POST", "**/addtocart").as("addToCart");

  cy.contains("a", "Add to cart").click();
  cy.wait("@addToCart");

  cy.visit("/cart.html");
  cy.contains("#tbodyid tr", productName, { timeout: 20000 }).should("exist");
});



When("removo o produto {string} do carrinho", (productName) => {
  cy.url().should("include", "cart.html");

  const safeProduct = productName.replace(/\s+/g, "_");
  cy.screenshot(`CARRINHO_01_com_${safeProduct}`);

  const removeAll = () => {
    cy.get("body").then(($body) => {
      const rows = $body.find("#tbodyid tr");
      const exists = rows.toArray().some(tr =>
        tr.innerText.includes(productName)
      );

      if (!exists) return;

      cy.contains("#tbodyid tr", productName)
        .first()
        .contains("Delete")
        .click();

      cy.wait(800);
      removeAll();
    });
  };

  removeAll();

  cy.get("#tbodyid").find("tr").should("have.length", 0);
  cy.screenshot(`CARRINHO_02_sem_${safeProduct}`);
});

Then("o carrinho deve estar vazio", () => {
  cy.url().should("include", "cart.html");
  cy.get("#tbodyid", { timeout: 20000 }).should("exist");
  cy.get("#tbodyid").find("tr").should("have.length", 0);
});



Given("que estou com produtos no carrinho", () => {
  cy.loginDemoblaze();

  cy.addProductToCart("Samsung galaxy s6");
  cy.addProductToCart("Nokia lumia 1520");
  cy.addProductToCart("ASUS Full HD");

  cy.get("#cartur").should("be.visible").click();
  cy.contains("#tbodyid tr", "ASUS Full HD", { timeout: 20000 }).should("exist");

  cy.screenshotStable("CART_com_monitor");
});

When("removo o monitor", () => {
  cy.contains("#tbodyid tr", "ASUS Full HD", { timeout: 20000 })
    .contains("Delete")
    .click();

  cy.contains("#tbodyid tr", "ASUS Full HD", { timeout: 20000 }).should("not.exist");

  cy.screenshotStable("CART_sem_monitor");
});

Then("o item não está mais no carrinho", () => {
  cy.get("#tbodyid tr").should("have.length", 0);
});

When("adiciono 3 produtos ao carrinho", () => {
  cy.addProductToCart("Samsung galaxy s6");
  cy.addProductToCart("Nokia lumia 1520");
  cy.addProductToCart("Sony vaio i5");
});

When("finalizo a compra", () => {
  cy.get("#cartur").should("be.visible").click();
  cy.get("#page-wrapper", { timeout: 20000 }).should("be.visible");

  cy.contains("button", /^Place Order$/)
    .filter(":visible")
    .first()
    .should("be.enabled")
    .click();

  cy.get("#orderModal", { timeout: 20000 })
    .should("have.class", "show")
    .and("be.visible");

  cy.placeOrder();
});

Then("a compra deve ser concluída com sucesso", () => {
  cy.screenshotStable("SUCESSO_compra_concluida");
});
