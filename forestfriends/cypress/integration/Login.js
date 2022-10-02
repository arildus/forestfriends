describe("user can log in", () => {
  it("renders correctly", () => {
    cy.visit("/login");
  });

  it("allows the input field to be used", () => {
    cy.visit("/login");
    cy.get("#field-1").clear();
    cy.get("#field-1").type("test@gmail.com");
    cy.get("#field-2").clear();
    cy.get("#field-2").type("testersen");
    cy.get("#button").click();
  });
});
