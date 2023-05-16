//This test case ensures that guests can add products to cart, provide necessary shipping and payment info, and checkout
//The test case fails if guests cannot add products to their cart, input shipping and payment info, or checkout

/*
Step Number	Description	Object	Data	Expected Result
1	Navigate to Demo Web Shop			Main page of Demo Web Shop is displayed
2	Click on a featured product	Featured product		Product details page is displayed
3	Click on "Add to cart" button	Add to cart button		Product is added to the shopping cart
4	Click on the shopping cart	Shopping cart button		Shopping cart page is displayed
5	Click on "Checkout"	Checkout button		Welcome, Please Sign In! page is displayed
6	Click on "Checkout as a guest"	Checkout as a guest		Billing Address form is displayed
7	Fill out the Billing Address form	Billing Address fields	Name, Address, etc.	Billing Address information is entered
8	Click "Continue"	Continue button		Shipping Address form is displayed
9	Fill out the Shipping Address form	Shipping Address fields	Name, Address, etc.	Shipping Address information is entered
10	Click "Continue"	Continue button		Shipping Method options are displayed
11	Select a shipping method	Shipping method	Ground	Ground shipping method is selected
12	Click "Continue"	Continue button		Payment Method options are displayed
13	Select a payment method	Payment method	Credit Card	Credit Card payment method is selected
14	Click "Continue"	Continue button		Payment Information form is displayed
15	Fill out the Payment Information form	Payment Information fields	Card	
*/
describe('Guest checkout testing', () => {
    beforeEach(function () {
        cy.fixture('billingInformation').as('b')
        cy.fixture('creditCard').as('c')
    })
    it('should navigate to the shopping website, click on a featured product, click on the Add to cart button, the checkout button, and the checkout as guest button', () => {
        cy.loadWebsite()
        //The name of the product to be later compared to the URL of the product webpage
        let productTitle = ''
        //Randomly selecting one of the featured products, recording it's name, and clicking on it's "add to cart" button
        cy.get('div.item-box').then(($itemBoxes) => {
            const randomIndex = Math.floor(Math.random() * $itemBoxes.length)
            const randomItemBox = $itemBoxes.eq(randomIndex)
            productTitle = randomItemBox.find('h2.product-title a').text()
            randomItemBox
                .find('input.button-2.product-box-add-to-cart-button')
                .trigger('click')
            //changing the string of the name of the product to match the one that'll show up in the URL of the product page
            let modifiedProductTitle = productTitle
                .toLowerCase()
                .replace(/\s/g, '-')
                .replace(/\$/g, '')
                .replace(/\./g, '')
            //Oops! They named one of their URLs clumsily
            if (modifiedProductTitle == 'build-your-own-cheap-computer') {
                modifiedProductTitle = 'build-your-cheap-own-computer'
            }
            //The expected URL of the product page
            const expectedURL =
                'https://demowebshop.tricentis.com/' + modifiedProductTitle
            //Clicking the add to cart button for the 14.1-inch laptop does not lead to a product page, but that's okay
            //The logic contained in this if statement handles the product pages
            if (modifiedProductTitle != '141-inch-laptop') {
                cy.url().should('include', modifiedProductTitle)
                //if the gift card is selected, we'll have to fill out a gosh-darned form on it's product page (not happy about such a tedious edge case :'()
                if (
                    expectedURL ===
                    'https://demowebshop.tricentis.com/25-virtual-gift-card'
                ) {
                    cy.fixture('giftCardInfo').then((giftCard) => {
                        cy.fillGiftCard(
                            giftCard.name,
                            giftCard.email,
                            giftCard.sender,
                            giftCard.senderEmail,
                        )
                    })
                }
                //a build-your-own computer needs to have a field selected on it's product page in order for checkout to be able to resume
                if (
                    expectedURL ===
                    'https://demowebshop.tricentis.com/build-your-own-computer'
                ) {
                    cy.get('input#product_attribute_16_3_6_19').click()
                }
                // same with a simple computer
                if (
                    expectedURL ===
                    'https://demowebshop.tricentis.com/simple-computer'
                ) {
                    cy.get('input#product_attribute_75_5_31_96').click()
                }
                //adding to cart
                cy.get('input[class="button-1 add-to-cart-button"').click()
            }
            //verifying that the item (even the 14.1-inch laptop) has been added to the cart
            cy.get('p.content').should(
                'contain',
                'The product has been added to your',
            )
            //clicking the shopping cart span at the top of the page, and ensuring that it navigates the browser to the shopping cart page
            cy.get('span.cart-label').contains('Shopping cart').click()
            cy.url().should('eq', 'https://demowebshop.tricentis.com/cart')
            //accepting the terms (we don't need to complete captcha checks on websites that aren't prejudiced against robots)
            cy.get('input#termsofservice').click()
            //checking out and verifying that the URL updates accordingly
            cy.get('button#checkout').click()
            cy.url().should(
                'eq',
                'https://demowebshop.tricentis.com/login/checkoutasguest?returnUrl=%2Fcart',
            )
            //clicking the "checkout as guest"  button
            cy.get('input.button-1.checkout-as-guest-button').click()
        })
    })
    it('should fill out billing information, click the continue button, and then the next two continue buttons that appear, select the credit card option, and then click continue again', function () {
        //So, funny thing we found out here, the maximum amount of function arguments allowed in Typescript (I think) is 7. In order to pass
        //8 arguments to the fillBillingInfo function (since there are 8 mandatory text boxes to fill), we had to pass an 8-element array
        //as the lone argument to our function
        const billing = [
            this.b.fName,
            this.b.lName,
            this.b.email,
            this.b.company,
            this.b.city,
            this.b.Address1,
            this.b.zip,
            this.b.phoneNumber,
        ]

        cy.fillBillingInfo(billing)
        //Clicking the first continue button
        cy.get(
            'div[id="shipping-buttons-container"] input[value="Continue"]',
        ).click()
        //The second
        cy.get(
            'div[id="shipping-method-buttons-container"] input[value="Continue"]',
        ).click()
        //Selecting "Credit card" as a payment method
        cy.get('input[id="paymentmethod_2"]').click()
        //Take a guess
        cy.get(
            'div[id="payment-method-buttons-container"] input[value="Continue"]',
        ).click()
    })
    it('should fill out credit card information, click continue, click the order confirmation button', function () {
        //filling out credit card information
        cy.fillCreditCard(this.c.name, this.c.number, this.c.code)
        //Clicking the confirm button to confirm the order
        cy.get(
            'div[id="confirm-order-buttons-container"] input[value="Confirm"]',
        ).click()
        //Making sure that the URL confirms order completion
        cy.url().should('include', '/checkout/completed/')
        //And that the message that verifies a successful order displays in the expected place
        cy.get('div.title')
            .contains('Your order has been successfully processed!')
            .should('be.visible')
    })
})
