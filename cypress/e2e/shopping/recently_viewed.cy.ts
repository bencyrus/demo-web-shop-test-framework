// This test case ensures that recently viewed products appear in the Recently Viewed Products list, and that the oldest product is the first to be removed from the Recently Viewed Products list
/**
Step Number	Description	                                                                                                                                        Object	                                                                Data	                                        Expected Result
1	        Navigate to page		                                                                                                                                                                                                    https://demowebshop.tricentis.com	            Tricentis Demo Web Shop home page is displayed
2	        Click one of the list items belonging to the "top-menu" unordered list	                                                                            One of the list items in the "top-menu" unordered list		                                                            The webpage is redirected to the product category page for the selected product
3.1	        Click on one of the category titles on the sub-category page (e.g. desktops, notebooks, and accessories) if redirected there	                    One of the "sub-category-item" divs 		                                                                            The webpage is redirected to the product subcategory page for the selected product
4.1	        Click on one of the product names on the page	                                                                                                    One of the product names		                                                                                        The webpage is redirected to the product page for the selected product
5	        Record the name of the product and store it in a queue	                                                                                            The title of the product page	                                        The string containing the name of the product	The name of the product is stored in a queue of size 4
6	        Repeat steps 2-5 3 more times, with the exception that every element selected does not share a name with any of the elements in the queue			                                                                                                                        The queue should be populated
7.1	        Click on the "header-logo" div that contains the picture of the logo of the Demo Web Shop	                                                        The "header-logo" div that contains the logo of the Demo Web Shop		                                                The home page is displayed
8	        Confirm that the name of the item at the bottom of the Recently Viewed Products list matches the item at the front of the queue	                    The "last" list element in the "list" unordered list on the homepage	The string at the front of the queue	        The name of the list item should match the name of the element stored at the front of the queue
9	        Repeat steps 2, 3, 4, 5, and 7 one more time			                                                                                                                                                                                                                    The browser should be redirected to the Demo Web Shop homepage
10	        Verify that the last element of the Recently Viewed Products list is different by checking to see if it matches with the new front-of-queue element	The "last" list element in the "list" unordered list on the homepage	The string at the front of the queue	        The name of the list item should match the name of the element stored at the front of the queue
11	        Verify that the first element of the Recently Viewed Products list matches the most-recently-added element in the queue	                            The first element in the "list" unordered list on the homepage	        The string at the back of the queue	            The name of the first list item should match the name of the element stored at the back of the queue
*/

describe('Recently Viewed List Test', () => {
    beforeEach(() => {
        // Load product data from the fixture before each test
        cy.fixture('viewProductData').as('productList')

        // Navigate to the home page before each test
        cy.visit(Cypress.config('baseUrl'))
    })

    it('should add and remove items from the compare list successfully', function () {
        for (let i = 0; i < 4; i++) {
            cy.visitProductPage(this.productList[i])
        }

        cy.get('.header-logo').click()
        cy.get('.block-recently-viewed-products').find('.list').children().then((recentProducts) => {
            cy.wrap(recentProducts).eq(3).find('.product-name').should('have.text', this.productList[0].productName)
        })

        cy.visitProductPage(this.productList[4])
        cy.get('.header-logo').click()
        cy.get('.block-recently-viewed-products').find('.list').children().then((recentProducts) => {
            cy.wrap(recentProducts).eq(3).find('.product-name').should('have.text', this.productList[1].productName)
            cy.wrap(recentProducts).eq(0).find('.product-name').should('have.text', this.productList[4].productName)
        })
    })
})
