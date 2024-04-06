/* eslint-disable no-undef */
const testData = [
{
    email: "ashertettenabotsi@gmail.com",
    date: "2024-04-05",
    task: "1. Created a reusable skipTable component to work independent for any ..fetchApi(skip,limit) api call",
    startstart: "19",
    startend: "15",
    endstart: "00",
    endend: "23",
    period: "5"
},


];

describe("Tracker", () => {
    testData.forEach((data, index) => {
        it(`User fill form - Test ${index + 1}`, () => {
            cy.visit("https://docs.google.com/forms/u/1/d/e/1FAIpQLScu1QXy_Iu3iksy-sxxr-rnL0W_pQmnhTa-mj21qtFh3mmn6w/viewform");
            cy.get('[jscontroller="v4y9Mc"] > .rFrNMe > .aCsJod > .aXBtI > .Xb9hP > .whsOnd').type(data.email);
            cy.get('.o7cIKf > .rFrNMe > .aCsJod > .aXBtI > .Xb9hP > .whsOnd').type(data.date);
            cy.get(':nth-child(9) > .docssharedWizToggleLabeledContainer > .bzfPab').click();
            cy.get('.KKjvXb > .vRMGwf').click();
            cy.get('.OA0qNb').contains("Front-end").click();
            cy.get(':nth-child(5) > [jsmodel="CP1oW"] > .geS5n > .oyXaNc > [jscontroller="eFy6Rc"] > .lLfZXe > .H2Gmcc > .SG0AAe > :nth-child(2) > .docssharedWizToggleLabeledContainer > .bzfPab').click();
            cy.get('.KHxj8b').type(data.task);
            cy.get(':nth-child(7) > [jsmodel="CP1oW"] > .geS5n > .PfQ8Lb > .ocBCTb > :nth-child(1) > .rFrNMe > .aCsJod > .aXBtI > .Xb9hP > .whsOnd').type(data.startstart);
            cy.get(':nth-child(7) > [jsmodel="CP1oW"] > .geS5n > .PfQ8Lb > .ocBCTb > :nth-child(3) > .rFrNMe > .aCsJod > .aXBtI > .Xb9hP > .whsOnd').type(data.startend);
            cy.get(':nth-child(8) > [jsmodel="CP1oW"] > .geS5n > .PfQ8Lb > .ocBCTb > :nth-child(1) > .rFrNMe > .aCsJod > .aXBtI > .Xb9hP > .whsOnd').type(data.endstart);
            cy.get(':nth-child(8) > [jsmodel="CP1oW"] > .geS5n > .PfQ8Lb > .ocBCTb > :nth-child(3) > .rFrNMe > .aCsJod > .aXBtI > .Xb9hP > .whsOnd').type(data.endend);
            cy.get('.AgroKb > .rFrNMe > .aCsJod > .aXBtI > .Xb9hP > .whsOnd').type(data.period);
            cy.get('.lRwqcd > .uArJ5e > .l4V7wb').click()
        });
    });
});
