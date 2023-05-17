// This test case ensures that a registered user can login with correct information on the Tricentis Demo Web Shop application.
// The test case will fail if the user is not able to login with correct information.
/**
 * Step Number      Description                                 Object	                Data                                        Expected Result
1	                Navigate to page		                                            https://demowebshop.tricentis.com/login 	Login page is displayed
3	                Enter email	                                Email field	            "jskuce@test.com"	                        Email field displays "jskuce@test.com"
4	                Enter password                              Password field	        "jskuce123"	                                Password field displays "jskuce123"
5	                Click "Log In" button below text fields	    Log In button		                                                Home page is displayed with account email in header
 */

describe('Login Test', () => {
    beforeEach(() => {
        // Load user data from the fixture before each test
        cy.fixture('userData').as('userData')
        cy.fixture('invalidUserData').as('invalidUserData')

        // Navigate to the login page before each test
        cy.visit(Cypress.config('baseUrl') + '/login')

        // Check if the "Welcome, Please Sign In!" message is displayed
        cy.get('.page-title h1').should('contain', 'Welcome, Please Sign In!')
    })

    it('should not log in with incorrect credentials', function () {
        // Use the custom 'login' command to log in with incorrect credentials
        cy.login(this.invalidUserData)

        // Verify that the error message is displayed
        cy.get(
            '.returning-wrapper .message-error .validation-summary-errors span',
        ).should(
            'contain',
            'Login was unsuccessful. Please correct the errors and try again.',
        )
    })

    it('should log in with correct credentials', function () {
        // Use the custom 'login' command to log in
        cy.login(this.userData)

        // Verify that the correct user's email is displayed in the header
        cy.get('.header-links-wrapper .account').should(
            'have.text',
            this.userData.email,
        )
    })
})
