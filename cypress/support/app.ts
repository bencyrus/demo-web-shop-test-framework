declare namespace Cypress {
    interface Chainable {
        /**
         * Load the website
         * */
        loadWebsite(): Chainable<Element>
        /**
         * @param {String} linkSelector - the element found on the navigation bar
         * @param {String} expectedUrl - the expected URL to be navigated to after having clicked the linkSelector
         * */
        checkNavigation(linkSelector, expectedUrl): Chainable<Element>
    }
}

Cypress.Commands.add('loadWebsite', () => {
    cy.visit(Cypress.config('baseUrl'))
})

Cypress.Commands.add('checkNavigation', (linkSelector, expectedUrl) => {
    cy.get(linkSelector).click()
    cy.url().should('eq', expectedUrl)
})
