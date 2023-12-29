/* eslint-disable no-undef */
import { LoginPage } from "../support/PageObjectModels/Auth/LoginPage";
import { SignUpPage } from "../support/PageObjectModels/Auth/SignUpPage";

const loginPage = new LoginPage();
const signUpPage = new SignUpPage();

const capturedRequestBodies = [];
describe(" Pharmacy", // 	retries: { // {
// 		runMode: 2,
// 		openMode: 1,
// 	},
// },
() => {
	beforeEach(() => {
		cy.session(["EM23552", "p@ssw0rD"], () => {
			loginPage.goToLoginPage();
			loginPage.fillLoginForm("EM23552", "p@ssw0rD");
			loginPage.submitLoginForm();
			signUpPage.assertSignUpPageUrL();
			signUpPage.assertPharmacyExist();
			signUpPage.clickPharmacyCard();
			cy.url().should("eq", "http://localhost:3000/pharmacy/dashboard");
		});
	});
	it("Dashboard Test", () => {
		cy.visit("/pharmacy/dashboard");
		cy.log("Request Body:", capturedRequestBodies);
		cy.intercept("POST", "**/pharmacy/sales/monthly-sales").as(
			"monthlySalesRequest"
		);
		cy.intercept("POST", "**/pharmacy/drugs/count-drugs-in-pharmacy").as(
			"countDrugsRequest"
		);
		cy.intercept("POST", "**/pharmacy/sales/weekly-sales").as(
			"weeklySalesRequest"
		);
		cy.wait([
			"@monthlySalesRequest",
			"@countDrugsRequest",
			"@weeklySalesRequest",
		]).then((interceptions) => {
			
			interceptions.forEach((interception) => {
				capturedRequestBodies.push(interception.request.body);
			});
		});
		
			cy.log("Res Body:", capturedRequestBodies);
	
	});
});
