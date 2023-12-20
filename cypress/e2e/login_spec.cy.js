/* eslint-disable no-undef */

describe('Login Page', () => {
  it('loads successfully', () => {
    cy.visit('/')
    .get('.text-primary').click()
    .url().should('eq', 'http://localhost:3000/login');
  });

  it('should fail without Business ID', () => {
    cy.Login(' ', 'Testapp1!');
    cy.url().should('eq', 'http://localhost:3000/login');
  });

  it('should fail without password', () => {
    cy.Login('YR86081', ' ');
    cy.url().should('eq', 'http://localhost:3000/login');
  });

  it('should fail without both Business ID and password', () => {
    cy.Login(' ', ' ');
    cy.url().should('eq', 'http://localhost:3000/login');
  });
  it('should fail with incorrect credentials', () => {
    cy.Login('YR86001', 'Incorrect');
    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/login');
  });

  it('should be redirected to dashboard after genuine login credentials', () => {
    cy.Login('EM23552', 'p@ssw0rD');
    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/signup');
  });
});
  