/* eslint-disable no-undef */
export class SignUpPage{

    goToSignUpPage() {
		return cy.visit("/signup");
	}
	// Elements
	getPharmacyCard() {
		return cy.get("[data-cy ='pharmacyCard']");
	}
	getPharmacyCardStatus() {
		return cy.get("[ data-cy ='pharmacyCard-status']");
	}
	

	// Actions
	
	clickPharmacyCard() {
		this.getPharmacyCard().click();
	}


	// Assertions
	assertSignUpPageUrL() {
		cy.url().should("eq", "http://localhost:3000/signup");
	}

	assertSignUpPageDisplayed() {
		this.getPharmacyCard().should("be.visible");
		
	}

    // {----Asserts for pharmacy----}
	assertPharmacyExist() {
		this.getPharmacyCardStatus().should('have.class', 'text-success')
	}
	assertPharmacyNotExist() {
		this.getPharmacyCardStatus().should('have.class', 'text-dark')
	}
	
}