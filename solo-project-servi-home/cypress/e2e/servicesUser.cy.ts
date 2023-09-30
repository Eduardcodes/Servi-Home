describe('User should be able to add new revitalize rug service', () => {
  before(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').click().type('test@gmail.com');
    cy.get('input[name="password"]').click().type('123');
    cy.get('button[type=submit]').click();
  });
  it('Rug service', () => {
    cy.log('Table services selected should not be visible when user started');
    cy.get('h1[data-cy="services-selected"]').should('not.exist');

    cy.get('form[data-cy="rug-revitalize"]');
    cy.get('h3[data-cy="h3-rug"]').should('be.visible');
    cy.get('img[data-cy="img-rug"]').should('be.visible');

    cy.log('User select the size 80*150 cm');
    cy.get('select[data-cy="select-rug"]')
      .select('80*150 cm')
      .should('have.value', '80*150 cm');

    cy.log('User writes "very dirty" on the input');
    cy.get('input[data-cy="condition-rug"]')
      .click()
      .type('very dirty')
      .should('have.value', 'very dirty');

    cy.log('User writes "Cotton" on the input');
    cy.get('input[data-cy="material-rug"]')
      .click()
      .type('Cotton')
      .should('have.value', 'Cotton');

    cy.log(
      'User should be able to press the submit button and see the services tables'
    );
    cy.get('button[data-cy="button-rug"]').click();
    cy.get('h1[data-cy="services-selected"]').should('be.visible');

    cy.log('User should be able to se details of his booker');
    cy.get('h3[data-cy="selected-title-service"]').should('be.visible');
    cy.get('p[data-cy="selected-measure-service"]').should('be.visible');
    cy.get('p[data-cy="selected-condition-rug-service"]').should('be.visible');
    cy.get('p[data-cy="selected-material-service"]').should('be.visible');

    cy.log('User should be to remove a service from the list');
    cy.get('button[data-cy="selected-delete"]').click();
    cy.get('h1[data-cy="services-selected"]').should('not.exist');
  });
});

describe('User should be able to add new Renew Your Furniture service', () => {
  before(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').click().type('test@gmail.com');
    cy.get('input[name="password"]').click().type('123');
    cy.get('button[type=submit]').click();
  });
  it('Renew Furniture  service', () => {
    cy.get('form[data-cy="renew-furniture"]');
    cy.get('h3[data-cy="h3-renew"]').should('be.visible');
    cy.get('img[data-cy="img-renew"]').should('be.visible');

    cy.log('User select the two seats');
    cy.get('select[data-cy="measure-renew"]')
      .select('2 seats')
      .should('have.value', 'Two');

    cy.log('User select the condition "Dirt');
    cy.get('select[data-cy="condition-renew"]')
      .select('Dirt')
      .should('have.value', 'Dirt');

    cy.log(
      'User should be able to press the submit button and see the services tables'
    );
    cy.get('button[data-cy="submit-renew"]').click();

    cy.log('User should be able to se details of his booker');
    cy.get('h3[data-cy="selected-title-service"]').should('be.visible');
    cy.get('p[data-cy="selected-seat-service"]').should('be.visible');
    cy.get('p[data-cy="selected-condition-service"]').should('be.visible');

    cy.log('User should be to remove a service from the list');
    cy.get('button[data-cy="selected-delete"]').click();
    cy.get('h1[data-cy="services-selected"]').should('not.exist');
  });
});

describe('User should be able to add new Elevate Your Tabletops service', () => {
  before(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('input[name="email"]').click().type('test@gmail.com');
    cy.get('input[name="password"]').click().type('123');
    cy.get('button[type=submit]').click();
  });
  it('Elevate Your Tabletops service', () => {
    cy.get('form[data-cy="elevate-tabletops"]');
    cy.get('h3[data-cy="h3-tabletops"]').should('be.visible');
    cy.get('img[data-cy="img-tabletops"]').should('be.visible');

    cy.log('User select the restoration "paint"');
    cy.get('select[data-cy="select-tabletops"]')
      .select('Paint')
      .should('have.value', 'Paint');

    cy.log(
      'User should be able to press the submit button and see the services tables'
    );
    cy.get('button[data-cy="submit-tabletops"]').click();

    cy.log('User should be able to se details of his booker');
    cy.get('h3[data-cy="selected-title-service"]').should('be.visible');
    cy.get('p[data-cy="selected-services-service"]').should('be.visible');

    cy.log('User should be to remove a service from the list');
    cy.get('button[data-cy="selected-delete"]').click();
    cy.get('h1[data-cy="services-selected"]').should('not.exist');
  });
});
