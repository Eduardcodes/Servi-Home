describe('User should be able to login in the APP', () => {
  it('Check if the user can go on the login page', () => {
    cy.visit('http://localhost:3000/login');
    cy.url().should('include', '/login');

    cy.log('Check if the input email exist and can insert email');
    cy.get('input[name="email"]')
      .click()
      .type('test@gmail.com')
      .should('have.value', 'test@gmail.com');

    cy.log('Check if the input password is there and you can write');
    cy.get('input[name="password"]')
      .click()
      .type('123')
      .should('have.value', '123');

    cy.log(
      'Check if has a submit button is working and if user is in the logedin page'
    );
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/logedin');

    cy.get('h2[data-cy="message"]').should('be.visible');

    // TODO: Ask Gerry if has a good way to do it!

    cy.log(`User should be able to log out`);
    cy.visit('http://localhost:3000/logedin');
    cy.url().should('include', '/logedin');

    cy.log('Check if the input email exist and can insert email');
    cy.get('[data-cy="log-out"]').click();
    cy.url().should('include', '/');
  });
});

describe('User should be able to add new revitalize rug service', () => {
  before(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').click().type('test@gmail.com');
    cy.get('input[name="password"]').click().type('123');
    cy.get('button[type=submit]').click();
  });
  it('Rug service', () => {
    cy.get('form[data-cy="rug-revitalize"]');
    cy.get('h3[data-cy="h3-rug"]').should('be.visible');
    cy.get('img[data-cy="img-rug"]').should('be.visible');
  });
});
