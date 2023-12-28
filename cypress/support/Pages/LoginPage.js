/* eslint-disable no-undef */
export class LoginPage {
	goToLoginPage() {
		return cy.visit("/login");
	}
	// Elements
	getBusinessIdInput() {
		return cy.get("[data-cy='businessId']");
	}
	getPasswordInput() {
		return cy.get("[data-cy='password']");
	}
	getLoginButton() {
		return cy.get("[data-cy='login-btn']");
	}
    getUsernameErrMsg() {
		return cy.get("[data-cy='username-error']");
	}
    getPasswordErrMsg() {
		return cy.get("[data-cy='password-error']");
	}
 
	// Actions
	fillLoginForm(username, password) {
		if (username.trim() !== "") this.getBusinessIdInput().type(username);
		if (password.trim() !== "") this.getPasswordInput().type(password);
	}
	submitLoginForm() {
		this.getLoginButton().click();
	}
	// Assertions
assertLoginUrL(){
    cy.url().should("eq", "http://localhost:3000/login");

}
	assertLoginPageDisplayed() {
		this.getBusinessIdInput().should("be.visible");
		this.getPasswordInput().should("be.visible");
		this.getLoginButton().should("be.visible");
	}

	assertLoginFailure() {
		cy.url().should("eq", "http://localhost:3000/login");
	}
    assertUsernameError(){
        this.getUsernameErrMsg().should('be.visible')
    }
    assertPasswordError(){
        this.getPasswordErrMsg().should('be.visible')

    }
}
