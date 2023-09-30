describe('using the app as a cleaner', () => {
  it('can sign up new cleaner user', () => {
    cy.visit('http://localhost:3002');

    cy.get('[data-cy="cleaner-signup"]').click();

    cy.get('input[name="username"]')
      .type('eduard')
      .should('have.value', 'eduard');

    cy.get('input[name="email"]')
      .type('eduard@cypresstest.com')
      .should('have.value', 'eduard@cypresstest.com');

    cy.get('input[name="password"]')
      .type('eduard')
      .should('have.value', 'eduard');

    cy.get('[data-cy="cleaner-signup-submit"]').click();
  });
  it('can login existing cleaner users', () => {
    cy.visit('http://localhost:3002');

    cy.get('[data-cy="cleaner-signup"]').click();

    cy.get('[data-cy="cleaner-existing-user"]').click();

    cy.get('input[name="email"]').type('eduard@cypresstest.com');

    cy.get('input[name="password"]').type('eduard');

    cy.get('[data-cy="cleaner-login-submit"]').click();

    //TODO: FIX IT
    // cy.get('[data-cy="accept-booking-button"]').click();
  });
});
