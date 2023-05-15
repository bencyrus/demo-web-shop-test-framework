// Extend Cypress 'cy' object with a new function called 'login'
declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to log into the application.
         * @param {string} email - The user's email address
         * @param {string} password - The user's password
         * @example cy.login('email@example.com', 'password')
         */
        login(email: string, password: string): Chainable<Element>
    }
}

Cypress.Commands.add('login', (email, password) => {
    // Enter email and password and click "Log In" button within the "returning-wrapper" div
    cy.get('.returning-wrapper').within(() => {
        cy.get('#Email').clear()
        cy.get('#Password').clear()
        cy.get('#Email').type(email)
        cy.get('#Password').type(password)
        cy.get('input[type="submit"]').click()
    })
})
