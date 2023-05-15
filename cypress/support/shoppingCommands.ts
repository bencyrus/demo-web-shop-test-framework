declare namespace Cypress {
    interface Chainable {
        /**
         * @param {string} productName - takes product name as string
         * */
        searchProduct(productName: string): Chainable<Element>
    }
}

Cypress.Commands.add('searchProduct', (productName: string) => {
    cy.get('input[id="small-searchterms"]').clear()
    cy.get('input[id="small-searchterms"]').type(productName)
    cy.get('input[value="Search"]').click()
})
