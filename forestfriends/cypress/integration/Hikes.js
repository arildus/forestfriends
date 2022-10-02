describe("register new hike", () => {
  it("renders correctly", () => {
    cy.visit("/hikes");
    /* ==== Generated with Cypress Studio ==== */
  });

  it("allows the user to register new hike", () => {
    cy.visit("/hikes");
    cy.get('[name="hikeName"]').clear();
    cy.get('[name="hikeName"]').type('Kutoppen');
    cy.get('[name="tripDifficulty"]').clear();
    cy.get('[name="tripDifficulty"]').type('Lett');
    cy.get('[type="date"]').click();
    cy.get('[type="date"]').click();
    cy.get('.chakra-form-control > .chakra-button').click();
    /* ==== End Cypress Studio ==== */

  })

  it("allows the user to sign up on hike", () => {
    cy.visit("/hikes");

    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(1) > .css-zsyym9 > :nth-child(5)').click();
    /* ==== End Cypress Studio ==== */
  })

});
