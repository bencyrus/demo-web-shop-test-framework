// This test case ensures that a logged-in user with a pre-existing address record can make a purchase using that address record, starting from the home page.
// The test case will fail if the user is not able to make a purchase using a pre-existing address record.
//
// Step Number      Description                                 Object	                            Data                                Expected Result
// 1                Navigate to home page                                                           https://demowebshop.tricentis.com/  Home page is displayed
// 2                Click "Books" in the navigation bar         Books button                                                            Products page with books is displayed
// 3                Click "Computing and Internet"              Computing and Internet product name                                     Computing and Internet book product page is displayed
// 4                Click "Add to cart" button                  Add to cart button                                                      A message banner is displayed saying "The product has been added to your shopping cart", Shopping cart link in header displays 1
// 5                Click "Shopping cart" in header             Shopping cart link                                                      Shopping cart is displayed containing the Computing and Internet book
// 6                Click Terms of Service checkbox             Therms of Service checkbox                                              Checkmark is displayed in the checkbox
// 7                Click Checkout button                       Checkout button                                                         Checkout billing address page is displayed with saved address record appearing
// 8                Click Continue                              Continue button                                                         Checkout shipping address page is displayed with saved address record appearing
// 9                Click Continue                              Continue button                                                         Checkout shipping method page is displayed with Ground selected
// 10               Click Continue                              Continue button                                                         Checkout payment method page is displayed with Cash on Delivery selected
// 11               Click Continue                              Continue button                                                         Checkout payment information page is displayed saying "You will pay by COD"
// 12               Click Continue                              Continue button                                                         Checkout confirm order page is displayed showing order information
// 13               Click Confirm                               Confirm button                                                          Thank you page is displayed with an order success confirmation message

describe('Purchase with saved address', () => {
    before(() => {
        cy.loadWebsite()
    })

    it('should purchase with saved address', function () {
        // // Navigate to books
        // cy.get('.header-menu').contains('Books').click()

        // // Confirm that the books page is displayed
        // cy.get('.page-title').should('contain', 'Books')

        // // Select a book
        // cy.get('.product-item').contains('Computing and Internet').click()

        // // Confirm that the book product page is displayed
        // cy.get('.product-name').should('contain', 'Computing and Internet')

        // // Add the book to the cart
        // cy.get('.add-to-cart').within(() => {
        //     cy.get('input[type=button]').click()
        // })

        // // Confirm that the book was added to the cart
        // cy.get('#bar-notification').should(
        //     'contain',
        //     'The product has been added to your shopping cart',
        // )

        // // Navigate to the cart
        // cy.get('.header-links').within(() => {
        //     cy.get('.ico-cart').contains('Shopping cart').click()
        // })

        // // Confirm that the cart is displayed
        // cy.get('.page-title').should('contain', 'Shopping cart')

        // // Check the terms of service checkbox
        // cy.get('#termsofservice').check()

        // // Click the checkout button
        // cy.get('#checkout').click()

        // // Confirm that the checkout billing address page is displayed
        // cy.get('.page-title').should('contain', 'Checkout')

        // // Confirm that the saved address record appears
        // cy.get('.select-billing-address').within(() => {
        //     cy.get('select').should('have.length', 1)
        // })

        // // Click the continue button
        // cy.get('#billing-buttons-container').within(() => {
        //     cy.get('input[type=button]').click()
        // })

        // // Click the continue button
        // cy.get('#shipping-buttons-container').within(() => {
        //     cy.get('input[type=button]').click()
        // })

        // // Select the shipping method
        // cy.get('.shipping-method').within(() => {
        //     cy.get('input[type=radio]').check('Ground___Shipping.FixedRate')
        // })

        // // Click the continue button
        // cy.get('#shipping-method-buttons-container').within(() => {
        //     cy.get('input[type=button]').click()
        // })

        // // Select the payment method
        // cy.get('.payment-method').within(() => {
        //     cy.get('input[type=radio]').check('Payments.CashOnDelivery')
        // })

        // // Click the continue button
        // cy.get('#payment-method-buttons-container').within(() => {
        //     cy.get('input[type=button]').click()
        // })

        // // Click the continue button
        // cy.get('#payment-info-buttons-container').within(() => {
        //     cy.get('input[type=button]').click()
        // })

        // // Confirm that the card table has 1 row in its body
        // cy.get('.cart').within(() => {
        //     cy.get('tbody').find('tr').should('have.length', 1)
        // })

        // // Click the confirm button
        // cy.get('#confirm-order-buttons-container').within(() => {
        //     cy.get('input[type=button]').click()
        // })

        // // Confirm that the thank you page is displayed
        // cy.get('.page-title').should('contain', 'Thank you')

        // // Confirm that the order success message is displayed
        // cy.get('.order-completed').should(
        //     'contain',
        //     'Your order has been successfully processed!',
        // )

        // Navigate to books
        cy.navigateToBooks()

        // Confirm that the books page is displayed
        cy.get('.page-title').should('contain', 'Books')

        // Select a book
        cy.selectBook('Computing and Internet')

        // Confirm that the book product page is displayed
        cy.get('.product-name').should('contain', 'Computing and Internet')

        // Add the book to the cart
        cy.addToCart()

        // Confirm that the book was added to the cart
        cy.get('#bar-notification').should(
            'contain',
            'The product has been added to your shopping cart',
        )

        // Navigate to the cart
        cy.navigateToCart()

        // Confirm that the cart is displayed
        cy.get('.page-title').should('contain', 'Shopping cart')

        // Check the terms of service checkbox
        cy.checkTermsOfService()

        // Checkout
        cy.checkout()

        // Confirm that the checkout billing address page is displayed
        cy.get('.page-title').should('contain', 'Checkout')

        // Confirm that the saved address record appears
        cy.get('.select-billing-address').within(() => {
            cy.get('select').should('have.length', 1)
        })

        // Select the billing address
        cy.selectBillingAddress()

        // Select the shipping address
        cy.selectShippingAddress()

        // Select the shipping method
        cy.selectShippingMethod('Ground___Shipping.FixedRate')

        // Select the payment method
        cy.selectPaymentMethod('Payments.CashOnDelivery')

        // Select the payment information
        cy.selectPaymentInformation()

        // Confirm that the card table has 1 row in its body
        cy.get('.cart').within(() => {
            cy.get('tbody').find('tr').should('have.length', 1)
        })

        // Confirm the order
        cy.confirmOrder()

        // Confirm that the thank you page is displayed
        cy.get('.page-title').should('contain', 'Thank you')

        // Confirm that the order success message is displayed
        cy.get('.order-completed').should(
            'contain',
            'Your order has been successfully processed!',
        )
    })
})
