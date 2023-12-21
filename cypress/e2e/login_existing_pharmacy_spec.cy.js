/* eslint-disable no-undef */


describe('Login to Pharmacy' ,{
  retries: {
    runMode: 2,
    openMode: 1,
  },
}, () => {

  beforeEach( () =>{
    cy.Login('EM23552', 'p@ssw0rD');
    cy.url().should('eq', 'http://localhost:3000/signup');
    cy.get('[data-testid ="pharmacyCard"]').should('exist')
    cy.get('[data-testid ="pharmacyCard-class"]').should('have.class', 'text-success')
    cy.get('[data-testid ="pharmacyCard"]').click()
  })
    it('should be redirected to dashboard sucessfully', () => {
      cy.url().should('eq', 'http://localhost:3000/dashboard');

    });

    it.only('Pharmacy Dashboard Test', () => {
      cy.get('[data-testid="orders-count"]',).should('contain.text','128')
      cy.get('[data-testid="products-count"]',).should('contain.text','128')
      cy.get('[data-testid="sales-count"]',).should('contain.text','128')
    });


  });
    