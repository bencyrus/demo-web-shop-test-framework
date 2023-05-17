import { UserData, RegisterData } from './interfaces'

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            /**
             * Custom command to log into the application.
             * @param {UserData} userData - User's email and password
             * @example cy.login({ email: 'email@example.com', password: 'password' })
             */
            login(userData: UserData): Chainable<Element>

            /**
             * Custom command to register an account for the application.
             * @param {RegisterData} registerData - User's first name, last name, email, and password
             * @example cy.register({ firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password' })
             */
            register(registerData: RegisterData): Chainable<Element>
        }
    }
}

Cypress.Commands.add('login', (userData: UserData) => {
    cy.get('.returning-wrapper').within(() => {
        cy.get('#Email').clear().type(userData.email)
        cy.get('#Password').clear().type(userData.password)
        cy.get('input[type="submit"]').click()
    })
})

Cypress.Commands.add('register', (registerData: RegisterData) => {
    cy.get('.page-body').within(() => {
        cy.get('#FirstName').clear().type(registerData.firstName)
        cy.get('#LastName').clear().type(registerData.lastName)
        cy.get('#Email').clear().type(registerData.email)
        cy.get('#Password').clear().type(registerData.password)
        cy.get('#ConfirmPassword').clear().type(registerData.password)
        cy.get('input[type="submit"]').click()
    })
})
