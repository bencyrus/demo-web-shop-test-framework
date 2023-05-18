// This test case ensures that a logged-in user can add an address to their account for use in purchases, starting from the home page
// The test case will fail if the user is not able to add an address to their account
/**
 * Step Number      Description                                 Object	                            Data                Expected Result
 * 1                Click account email in header               Account email link                  "jskuce@test.com"   Account details page is displayed
 * 2                Click "Addresses" in the "My Account" bar   Addresses link                                          Addresses page is displayed
 * 3                Click "Add new" button                      Add new button                                          Address addition form is displayed
 * 4                Enter first name                            First name field                    "j"                 First name field displays "j"
 * 5                Enter last name                             Last name field                     "skuce"             Last name field displays "skuce"
 * 6                Enter email                                 Email field                         "jskuce@test.com"   Email field displays "jskuce@test.com"
 * 7                Enter company                               Company field                       "qac"               Company field displays "qac"
 * 8                Select country                              Country drop down menu              "Canada"            Country menu displays "Canada"
 * 9                Select province                             State / province drop down menu     "Ontario"           State / province menu displays "Ontario"
 * 10               Enter city                                  City field                          "Toronto"           City field displays "Toronto"
 * 11               Enter address                               Address 1 field                     "123 fake st"       Address 1 field displays "123 fake st"
 * 12               Enter postal code                           Zip / postal code field             "A1A 1A1"           Zip / postal code field displays "A1A 1A1"
 * 13               Enter phone number                          Phone number field                  "4161234567"        Phone number field displays "4161234567"
 * 14               Click save                                  Save button                                             Address page is displayed with new address record
 */

describe('Add address', () => {
    before(() => {
        cy.clearCookies()
        cy.clearLocalStorage()

        cy.loadWebsite()

        // Load user data from the fixture before each test
        cy.fixture('userData').as('userData')
    })

    beforeEach(() => {
        cy.fixture('addressData').as('address')
    })

    it('should log in to the application', function () {
        // Navigate to the login page before each test
        cy.visit(Cypress.config('baseUrl') + '/login')

        // Check if the "Welcome, Please Sign In!" message is displayed
        cy.get('.page-title h1').should('contain', 'Welcome, Please Sign In!')

        // Use the custom 'login' command to log in with incorrect credentials
        cy.login(this.userData)
    })

    it('should add a new address', function () {
        cy.navigateToAccountDetails()

        cy.navigateToAddresses()

        cy.addAddress(this.address)

        cy.get('.address-list')
            .children('.address-item')
            .should('have.length', 1)
    })

    it('should delete the new address', function () {
        cy.deleteFirstAddress()

        cy.get('.address-list')
            .children('.address-item')
            .should('have.length', 0)
    })
})
