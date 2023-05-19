declare namespace Cypress {
    interface Chainable {
        /**
         * @param {string} productName - takes product name as string
         * */
        searchProduct(productName: string): Chainable<Element>
        /**
         * @param {string[]} billingInfo - array containing user's billing information [fName, lName, email, company, city, Address1, zip, phoneNumber]
         */
        fillBillingInfo(billingInfo: string[]): Chainable<Element>
        /**
         * @param {string} name - cardholder's name
         * @param {string} number - credit card number
         * @param {string} code - credit card security code
         */
        fillCreditCard(name, number, code): Chainable<Element>
        /**
         * @param {string} name - gift card recipient's name
         * @param {string} email - recipient email
         * @param {string} sender - sender's name
         * @param {string} senderEmail - sender's email address
         */
        fillGiftCard(name, email, sender, senderEmail): Chainable<Element>
        /**
         * @param {ProductData} product - An object extracted from a json such as compareProductData containing type and name info of a product
         */
        visitProductPage(product): Chainable<Element>

        /**
         * Custom command to navigate to the books section.
         * @example cy.navigateToBooks()
         */
        navigateToBooks(): Chainable<Element>

        /**
         * Custom command to select a book.
         * @param {string} bookName - Name of the book
         * @example cy.selectBook('Computing and Internet')
         */
        selectBook(bookName: string): Chainable<Element>

        /**
         * Custom command to add a book to the cart.
         * @example cy.addToCart()
         */
        addToCart(): Chainable<Element>

        /**
         * Custom command to navigate to the cart.
         * @example cy.navigateToCart()
         */
        navigateToCart(): Chainable<Element>

        /**
         * Custom command to check the terms of service.
         * @example cy.checkTermsOfService()
         */
        checkTermsOfService(): Chainable<Element>

        /**
         * Custom command to checkout.
         * @example cy.checkout()
         */
        checkout(): Chainable<Element>

        /**
         * Custom command to select an address.
         * @example cy.selecBillingtAddress()
         */
        selectBillingAddress(): Chainable<Element>

        /**
         * Custom command to select an address.
         * @example cy.selectShippingAddress()
         */
        selectShippingAddress(): Chainable<Element>

        /**
         * Custom command to select the shipping method.
         * @param {string} method - Shipping method to select
         * @example cy.selectShippingMethod('Ground___Shipping.FixedRate')
         */
        selectShippingMethod(method: string): Chainable<Element>

        /**
         * Custom command to select the payment method.
         * @param {string} method - Payment method to select
         * @example cy.selectPaymentMethod('Payments.CashOnDelivery')
         */
        selectPaymentMethod(method: string): Chainable<Element>

        /**
         * Custom command to select the payment information.
         * @example cy.selectPaymentInformation()
         */
        selectPaymentInformation(): Chainable<Element>

        /**
         * Custom command to confirm the order.
         * @example cy.confirmOrder()
         */
        confirmOrder(): Chainable<Element>
    }
}

Cypress.Commands.add('searchProduct', (productName: string) => {
    cy.get('input[id="small-searchterms"]').clear()
    cy.get('input[id="small-searchterms"]').type(productName)
    cy.get('input[value="Search"]').click()
})

Cypress.Commands.add('fillBillingInfo', (billingInfo) => {
    const [fName, lName, email, company, city, Address1, zip, phoneNumber] =
        billingInfo

    cy.get('input[id="BillingNewAddress_FirstName"]').clear().type(fName)
    cy.get('input[id="BillingNewAddress_LastName"]').clear().type(lName)
    cy.get('input[id="BillingNewAddress_Email"]').clear().type(email)
    cy.get('input[id="BillingNewAddress_Company"]').clear().type(company)
    cy.get('select[id="BillingNewAddress_CountryId"]').select('1')
    cy.get('select[id="BillingNewAddress_StateProvinceId"]').select('28')
    cy.get('input[id="BillingNewAddress_City"]').clear().type(city)
    cy.get('input[id="BillingNewAddress_Address1"]').clear().type(Address1)
    cy.get('input[id="BillingNewAddress_ZipPostalCode"]').clear().type(zip)
    cy.get('input[id="BillingNewAddress_PhoneNumber"]')
        .clear()
        .type(phoneNumber)
    cy.get(
        'div[id="billing-buttons-container"] input[value="Continue"]',
    ).click()
})

Cypress.Commands.add('fillCreditCard', (name, number, code) => {
    cy.get('input[id="CardholderName"]').clear()
    cy.get('input[id="CardholderName"]').type(name)
    cy.get('input[id="CardNumber"]').clear()
    cy.get('input[id="CardNumber"]').type(number)
    cy.get('input[id="CardCode"]').clear()
    cy.get('input[id="CardCode"]').type(code)
    cy.get(
        'div[id="payment-info-buttons-container"] input[value="Continue"]',
    ).click()
})

Cypress.Commands.add('fillGiftCard', (name, email, sender, senderEmail) => {
    cy.get('input[id="giftcard_2_RecipientName"]').clear()
    cy.get('input[id="giftcard_2_RecipientName"]').type(name)
    cy.get('input[id="giftcard_2_RecipientEmail"]').clear()
    cy.get('input[id="giftcard_2_RecipientEmail"]').type(email)
    cy.get('input[id="giftcard_2_SenderName"]').clear()
    cy.get('input[id="giftcard_2_SenderName"]').type(sender)
    cy.get('input[id="giftcard_2_SenderEmail"]').clear()
    cy.get('input[id="giftcard_2_SenderEmail"]').type(senderEmail)
})

Cypress.Commands.add('visitProductPage', (product) => {
    cy.get('ul.top-menu').contains(product.productType).click()
    if (product.productSubtype != null) {
        cy.get('.sub-category-grid').contains(product.productSubtype).click()
    }
    cy.contains(product.productName).click()
})

Cypress.Commands.add('navigateToBooks', () => {
    cy.get('.header-menu').contains('Books').click()
})

Cypress.Commands.add('selectBook', (bookName: string) => {
    cy.get('.product-item').contains(bookName).click()
})

Cypress.Commands.add('addToCart', () => {
    cy.get('.add-to-cart').within(() => {
        cy.get('input[type=button]').click()
    })
})

Cypress.Commands.add('navigateToCart', () => {
    cy.get('.header-links').within(() => {
        cy.get('.ico-cart').contains('Shopping cart').click()
    })
})

Cypress.Commands.add('checkTermsOfService', () => {
    cy.get('#termsofservice').check()
})

Cypress.Commands.add('checkout', () => {
    cy.get('#checkout').click()
})

Cypress.Commands.add('selectBillingAddress', () => {
    cy.get('#billing-buttons-container').within(() => {
        cy.get('input[type=button]').click()
    })
})

Cypress.Commands.add('selectShippingAddress', () => {
    cy.get('#shipping-buttons-container').within(() => {
        cy.get('input[type=button]').click()
    })
})

Cypress.Commands.add('selectShippingMethod', (method: string) => {
    cy.get('.shipping-method').within(() => {
        cy.get('input[type=radio]').check(method)
    })

    cy.get('#shipping-method-buttons-container').within(() => {
        cy.get('input[type=button]').click()
    })
})

Cypress.Commands.add('selectPaymentMethod', (method: string) => {
    cy.get('.payment-method').within(() => {
        cy.get('input[type=radio]').check(method)
    })

    cy.get('#payment-method-buttons-container').within(() => {
        cy.get('input[type=button]').click()
    })
})

Cypress.Commands.add('selectPaymentInformation', () => {
    cy.get('#payment-info-buttons-container').within(() => {
        cy.get('input[type=button]').click()
    })
})

Cypress.Commands.add('confirmOrder', () => {
    cy.get('#confirm-order-buttons-container').within(() => {
        cy.get('input[type=button]').click()
    })
})
