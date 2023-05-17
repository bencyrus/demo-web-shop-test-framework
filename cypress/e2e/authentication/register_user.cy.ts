// This test case ensures that users can register a new account and log in to the Demo Web Shop site
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

import { makeFreshEmail } from '../../support/utils'
import { RegisterData } from '../../support/interfaces'

describe('Register Test', () => {
    let registerData: RegisterData

    beforeEach(() => {
        cy.fixture('registerData').then((data) => {
            registerData = data
        })
        cy.visit(Cypress.config('baseUrl') + '/register')
        cy.get('.page-title h1').should('contain', 'Register')
    })

    it('should fail registration with reused email', function () {
        cy.register(registerData)

        cy.get(
            '.page-body .message-error .validation-summary-errors li',
        ).should('contain', 'The specified email already exists')
    })

    it('should register successfully with fresh email', function () {
        var freshEmail = makeFreshEmail(registerData.email)
        registerData.email = freshEmail
        cy.register(registerData)

        cy.get('.header-links-wrapper .account').should('have.text', freshEmail)
    })
})
