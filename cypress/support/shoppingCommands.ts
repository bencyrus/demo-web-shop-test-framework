declare namespace Cypress {
    interface Chainable {
        /**
         * @param {string} productName - takes product name as string
         * */
        searchProduct(productName: string): Chainable<Element>
        /**
         * @param {string} fName - user's first name
         * @param {string} lName - user's last name
         * @param {string} email - user's email address
         * @param {string} company - the company at which the user works
         * @param {string} city - the city in which the user lives
         * @param {string} Address1 - user's address
         * @param {string} zip - user's postal code
         *
         * */
        fillBillingInfo(
            fName,
            lName,
            email,
            company,
            city,
            Address1,
            zip,
        ): Chainable<Element>
        /**
         * @param {string} name - cardholder's name
         * @param {string} number - credit card number
         * @param {string} code - credit card security code
         */
        fillCreditCard(name, number, code): Chainable<Element>
    }
}

Cypress.Commands.add('searchProduct', (productName: string) => {
    cy.get('input[id="small-searchterms"]').clear()
    cy.get('input[id="small-searchterms"]').type(productName)
    cy.get('input[value="Search"]').click()
})

Cypress.Commands.add(
    'fillBillingInfo',
    (fName, lName, email, company, city, Address1, zip) => {
        cy.get('input[id="BillingNewAddress_FirstName"]').clear()
        cy.get('input[id="BillingNewAddress_FirstName"]').type(fName)
        cy.get('input[id="BillingNewAddress_LastName"]').clear()
        cy.get('input[id="BillingNewAddress_LastName"]').type(lName)
        cy.get('input[id="BillingNewAddress_Email"]').clear()
        cy.get('input[id="BillingNewAddress_Email"]').type(email)
        cy.get('input[id="BillingNewAddress_Company"]').clear()
        cy.get('input[id="BillingNewAddress_Company"]').type(company)
        cy.get('select[name="BillingNewAddress_CountryId"]').select('1')
        cy.get('select[name="BillingNewAddress_StateProvinceId"]').select('28')
        cy.get('input[id="BillingNewAddress_City"]').clear()
        cy.get('input[id="BillingNewAddress_City"]').type(city)
        cy.get('input[id="BillingNewAddress_Address1"]').clear()
        cy.get('input[id="BillingNewAddress_Address1"]').type(Address1)
        cy.get('input[id="BillingNewAddress_ZipPostalCode"]').clear()
        cy.get('input[id="BillingNewAddress_ZipPostalCode"]').type(zip)
        cy.get('input[id="BillingNewAddress_PhoneNumber"]').clear()
        cy.get('input[id="BillingNewAddress_PhoneNumber"]').type('647-621-2168')
        cy.get('input[value="Continue"]').click()
    },
)

Cypress.Commands.add('fillCreditCard', (name, number, code) => {
    cy.get('input[id="CardholderName"]').clear()
    cy.get('input[id="CardholderName"]').type(name)
    cy.get('input[id="CardNumber"]').clear()
    cy.get('input[id="CardNumber"]').type(number)
    cy.get('input[id="CardCode"]').clear()
    cy.get('input[id="CardCode"]').type(code)
    cy.get('input[value="Continue"]').click()
})
