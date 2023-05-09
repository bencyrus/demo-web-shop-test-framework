declare namespace Cypress {
    interface Chainable {
        /**
         * Load the website
         * */
        loadWebsite(): Chainable<Element>
    }
}

Cypress.Commands.add('loadWebsite', () => {
    cy.visit(Cypress.config('baseUrl'))
})

