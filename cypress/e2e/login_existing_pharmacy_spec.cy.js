/* eslint-disable no-undef */

describe('Login to Pharmacy', () => {
    it('should be redirected to dashboard sucessfully', () => {
      cy.Login('EM23552', 'p@ssw0rD');
      cy.url().should('eq', 'http://localhost:3000/signup');
      cy.get('[data-testid ="pharmacyCard"]').should('exist')
      cy.get('[data-testid ="pharmacyCard-class"]').should('have.class', 'text-success')
      cy.get('[data-testid ="pharmacyCard"]').click()
      cy.url().should('eq', 'http://localhost:3000/dashboard');
    });


  });
    