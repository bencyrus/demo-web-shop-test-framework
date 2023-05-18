import { Address } from './interfaces'

// Extend Cypress 'cy' object with a new function called 'login'
declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            /**
             * Custom command to navigate to the account details page.
             * @example cy.navigateToAccountDetails()
             */
            navigateToAccountDetails(): Chainable<Element>

            /**
             * Custom command to navigate to the addresses page under the user's account.
             * @example cy.navigateToAddresses()
             */
            navigateToAddresses(): Chainable<Element>

            /**
             * Custom command to fill and save a new address.
             * @param {Object} address - The address to be added.
             * @example cy.fillAndSaveAddress({ firstName: 'John', lastName: 'Doe', email: 'john.doe@test.com', company: 'Test Ltd.', country: 'United States', state: 'California', city: 'Los Angeles', address1: '123 Test St.', zip: '90001', phone: '1234567890' })
             */
            addAddress(address: Address): Chainable<Element>

            /**
             * Custom command to delete the first address.
             * @example cy.deleteFirstAddress()
             */
            deleteFirstAddress(): Chainable<Element>
        }
    }
}

Cypress.Commands.add('navigateToAccountDetails', () => {
    // Click on the account email link in the header to navigate to the account details page
    cy.get('.header').within(() => {
        cy.get('a[href="/customer/info"]').click()
    })
})

Cypress.Commands.add('navigateToAddresses', () => {
    // Click on the "Addresses" link in the "My Account" bar to navigate to the addresses page
    cy.get('.side-2').within(() => {
        cy.get('a[href="/customer/addresses"]').click()
    })
})

Cypress.Commands.add('addAddress', (address: Address) => {
    // Fill and save a new address within the 'form' tag
    cy.get('.center-2').within(() => {
        // Click on the "Add new" button to add a new address
        cy.get('input[value="Add new"]').click()

        // Fill the address form
        cy.get('#Address_FirstName').type(address.firstName)
        cy.get('#Address_LastName').type(address.lastName)
        cy.get('#Address_Email').type(address.email)
        cy.get('#Address_Company').type(address.company)
        cy.get('#Address_CountryId').select(address.countryId.toString())
        cy.get('#Address_StateProvinceId').select(
            address.stateProvinceId.toString(),
        )
        cy.get('#Address_City').type(address.city)
        cy.get('#Address_Address1').type(address.address1)
        cy.get('#Address_Address2').type(address.address2) // New field
        cy.get('#Address_ZipPostalCode').type(address.zip)
        cy.get('#Address_PhoneNumber').type(address.phoneNumber)
        cy.get('#Address_FaxNumber').type(address.faxNumber) // New field
        cy.get('input[type="submit"]').click()
    })
})

Cypress.Commands.add('deleteFirstAddress', () => {
    // Click on the "Delete" button of the first address
    cy.get('.address-list').within(() => {
        cy.get('input[value="Delete"]').first().click()
    })
})
