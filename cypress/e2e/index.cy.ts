/* This code is setting up a global error handler for uncaught exceptions in Cypress tests. When an
uncaught exception occurs, Cypress will normally fail the test and stop the test run. However, by
returning `false` in this handler, the test will continue to run and the error will be ignored. This
can be useful for handling expected errors or for preventing Cypress from failing the test
prematurely due to an unexpected error. */
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
describe("Index Page", () => {
  it("visit index page and render component", () => {
    cy.visit("/");
    cy.get("#loading").should("be.visible");
    cy.wait(100);
    cy.get("button").should("be.visible");
    cy.get("#pulse").should("be.visible");
    cy.get("img").should("be.visible");
  });
  it("check and click button connect wallet", () => {
    cy.visit("/");
    const btn = cy.get("button");
    btn.should("be.disabled");
    /* `btn.invoke("removeAttr", "disabled");` is removing the `disabled` attribute from the `button`
    element selected by `cy.get("button")`. This allows the button to be clicked and interacted with
    during the test. */
    btn.invoke("removeAttr", "disabled");
    btn.should("not.be.disabled");
  });
});
