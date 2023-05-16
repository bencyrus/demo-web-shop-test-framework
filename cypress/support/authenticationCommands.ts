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

        /**
         * Custom command to register an account for the application.
         * @param {string} firstName - The user's first name
         * @param {string} lastName - The user's last name
         * @param {string} email - The user's email address
         * @param {string} password - The user's password
         * @example cy.register('John', 'Smith', 'email@example.com', 'password')
         */
        register(firstName: string, lastName: string, email: string, password: string): Chainable<Element>
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

Cypress.Commands.add('register', (firstName, lastName, email, password) => {
    // Enter email and password and click "Log In" button within the "returning-wrapper" div
    cy.get('.page-body').within(() => {
        cy.get('#FirstName').clear()
        cy.get('#LastName').clear()
        cy.get('#Email').clear()
        cy.get('#Password').clear()
        cy.get('#ConfirmPassword').clear()
        cy.get('#FirstName').type(firstName)
        cy.get('#LastName').type(lastName)
        cy.get('#Email').type(email)
        cy.get('#Password').type(password)
        cy.get('#ConfirmPassword').type(password)
        cy.get('input[type="submit"]').click()
    })
})
