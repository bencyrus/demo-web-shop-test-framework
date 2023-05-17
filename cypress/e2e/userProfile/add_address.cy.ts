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

// userProfileCommands.ts
// import { Address } from './interfaces'

// // Extend Cypress 'cy' object with a new function called 'login'
// declare global {
//     namespace Cypress {
//         interface Chainable<Subject> {
//             /**
//              * Custom command to navigate to the account details page.
//              * @example cy.navigateToAccountDetails()
//              */
//             navigateToAccountDetails(): Chainable<Element>

//             /**
//              * Custom command to navigate to the addresses page under the user's account.
//              * @example cy.navigateToAddresses()
//              */
//             navigateToAddresses(): Chainable<Element>

//             /**
//              * Custom command to click on the "Add new" button for adding a new address.
//              * @example cy.clickAddNewAddress()
//              */
//             clickAddNewAddress(): Chainable<Element>

//             /**
//              * Custom command to fill and save a new address.
//              * @param {Object} address - The address to be added.
//              * @example cy.fillAndSaveAddress({ firstName: 'John', lastName: 'Doe', email: 'john.doe@test.com', company: 'Test Ltd.', country: 'United States', state: 'California', city: 'Los Angeles', address1: '123 Test St.', zip: '90001', phone: '1234567890' })
//              */
//             fillAndSaveAddress(address: Address): Chainable<Element>
//         }
//     }
// }

// Cypress.Commands.add('navigateToAccountDetails', () => {
//     // Click on the account email link in the header to navigate to the account details page
//     cy.get('.header-links').within(() => {
//         cy.get('a[href="/customer/info"]').click()
//     })
// })

// Cypress.Commands.add('navigateToAddresses', () => {
//     // Click on the "Addresses" link in the "My Account" bar to navigate to the addresses page
//     cy.get('.side-2').within(() => {
//         cy.get('a[href="/customer/addresses"]').click()
//     })
// })

// Cypress.Commands.add('clickAddNewAddress', () => {
//     // Click on the "Add new" button within '.center-2' div to navigate to the address addition form
//     cy.get('.center-2').within(() => {
//         cy.get('input[value="Add new"]').click()
//     })
// })

// Cypress.Commands.add('fillAndSaveAddress', (address: Address) => {
//     // Fill and save a new address within the 'form' tag
//     cy.get('form').within(() => {
//         cy.get('#Address_Id').type(address.id.toString())
//         cy.get('#Address_FirstName').type(address.firstName)
//         cy.get('#Address_LastName').type(address.lastName)
//         cy.get('#Address_Email').type(address.email)
//         cy.get('#Address_Company').type(address.company)
//         cy.get('#Address_CountryId').select(address.countryId.toString())
//         cy.get('#Address_StateProvinceId').select(
//             address.stateProvinceId.toString(),
//         )
//         cy.get('#Address_City').type(address.city)
//         cy.get('#Address_Address1').type(address.address1)
//         cy.get('#Address_Address2').type(address.address2) // New field
//         cy.get('#Address_ZipPostalCode').type(address.zip)
//         cy.get('#Address_PhoneNumber').type(address.phoneNumber)
//         cy.get('#Address_FaxNumber').type(address.faxNumber) // New field
//         cy.get('input[type="submit"]').click()
//     })
// })

// Based on the above commands, we can now write the test case in TypeScript

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

        cy.clickAddNewAddress()

        cy.fillAndSaveAddress(this.address)
    })
})
