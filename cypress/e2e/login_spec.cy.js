/* eslint-disable no-undef */
import  {LoginPage}  from "../support/Pages/LoginPage";
const loginPage = new LoginPage()
describe('Login Page', () => {
 
  it('loads successfully', () => {
    loginPage.goToLoginPage()
   loginPage.assertLoginPageDisplayed()
  });
it('handles username errors',()=>{
  loginPage.goToLoginPage()
  loginPage.fillLoginForm('' ,'test')
  loginPage.submitLoginForm()
  loginPage.assertUsernameError()
})
it('handles password errors',()=>{
  loginPage.goToLoginPage()
  loginPage.fillLoginForm('test' ,'')
  loginPage.submitLoginForm()
  loginPage.assertPasswordError()

})
});
  