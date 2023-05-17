// Extend Cypress 'cy' object with a new function called 'login'
declare namespace Cypress {
    interface Chainable {
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
         * Custom command to click on the "Add new" button for adding a new address.
         * @example cy.clickAddNewAddress()
         */
        clickAddNewAddress(): Chainable<Element>
    }
}

Cypress.Commands.add('navigateToAccountDetails', () => {
    // Click on the account email link in the header to navigate to the account details page
    cy.get('.header-links').within(() => {
        cy.get('a[href="/customer/info"]').click()
    })
})

Cypress.Commands.add('navigateToAddresses', () => {
    // Click on the "Addresses" link in the "My Account" bar to navigate to the addresses page
    cy.get('.side-2').within(() => {
        cy.get('a[href="/customer/addresses"]').click()
    })
})

Cypress.Commands.add('clickAddNewAddress', () => {
    // Click on the "Add new" button within '.center-2' div to navigate to the address addition form
    cy.get('.center-2').within(() => {
        cy.get('input[value="Add new"]').click()
    })
})
