// This test case ensures that an unregistered user can register with an unused email and the necessary information.
// The test case will fail if there is an account registered using the given email.
/**
Step Number	Description	                    Object	                                                                        Data	                            Expected Result
1	        Navigate to page		                                                                                        https://demowebshop.tricentis.com	Tricentis Demo Web Shop home page is displayed
2	        Click the "Register" link	    The "Register" link		                                                                                            browser navigates to "https://demowebshop.tricentis.com/register"
3	        Input a valid first name	    "First name" field	                                                            "Tom"	                            "Tom" appears in the "First name" field
4	        Input a valid last name 	    "Last name" field	                                                            "Wambsgans"	                        "Wambsgans" appears in the "Last name" field
5	        Input a valid email address	    "Email" field	                                                                "twambsgans@atn.com"	            "twambsgans@atn.com" appears in the email field
6	        Input and confirm a password	"Password" and "Confirm password" fields	                                    "neroandsporus"	                    13 anonymized characters appear in the "Password" and "Confirm password" fields
7	        Check the "Account" link	    The "Account" link that contains the customer email at the top of the webpage	"twambsgans@atn.com"	            The email displayed as the account link matches the email input during registration 
*/

import { makeFreshEmail } from "../../support/utils"

describe('Register Test', () => {
    beforeEach(() => {
        // Load user data from the fixture before each test
        cy.fixture('registerData').as('registerData')

        // Navigate to the login page before each test
        cy.visit(Cypress.config('baseUrl') + '/register')

        // Check if the "Welcome, Please Sign In!" message is displayed
        cy.get('.page-title h1').should('contain', 'Register')
    })

    // todo - test password mismatch? error message displays before submit and after submit

    it('should fail registration with reused email', function () {
        // Use the custom 'login' command to log in with incorrect credentials
        cy.register(this.registerData.firstName, this.registerData.lastName, this.registerData.email, this.registerData.password)

        // Verify that the error message is displayed
        cy.get(
            '.page-body .message-error .validation-summary-errors li',
        ).should(
            'contain',
            'The specified email already exists',
        )
    })

    it('should register successfully with fresh email', function () {
        // Use the custom 'register' command to register
        var freshEmail = makeFreshEmail(this.registerData.email)
        cy.register(this.registerData.firstName, this.registerData.lastName, freshEmail, this.registerData.password)

        // Verify that the correct user's email is displayed in the header
        cy.get('.header-links-wrapper .account').should(
            'have.text',
            freshEmail,
        )
    })
})
