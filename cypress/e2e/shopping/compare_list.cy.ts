// This test case ensures that users can add and remove items from the compare list
/**
Step Number	Description	                                                                                                                        Object	                                                                                        Data	                                                                        Expected Result
1	        Navigate to page		                                                                                                                                                                                                            https://demowebshop.tricentis.com	                                            Tricentis Demo Web Shop home page is displayed
2	        Click the "Log in" link	                                                                                                            The "Log in" link		                                                                                                                                                        browser navigates to "https://demowebshop.tricentis.com/login"
3.1	        Input a registered email address	                                                                                                "Email" field	                                                                                "jskuce@test.com"	                                                            "jskuce@test.com" appears in the "Email" field
4.1	        Input the correct corresponding password	                                                                                        "Password" field	                                                                            jskuce123	                                                                    9 anonymized characters appear in the "Password" field
5	        Click the "Log in" button	                                                                                                        "Log in" button		                                                                                                                                                            The browser is redirected to the home page
6	        Click one of the list items belonging to the "top-menu" unordered list	                                                            One of the list items in the "top-menu" unordered list		                                                                                                                    The webpage is redirected to the product category page for the selected product
7.1	        Click on one of the category titles on the sub-category page (e.g. desktops, notebooks, and accessories) if redirected there	    One of the "sub-category-item" divs 		                                                                                                                                    The webpage is redirected to the product subcategory page for the selected product
8.1	        Click on one of the product names on the page	                                                                                    One of the product name links		                                                                                                                                            The webpage is redirected to the product page for the selected product
9	        Record the name of the product	                                                                                                    The title of the product page	                                                                The string containing the name of the product	                                The name of the product is stored as a variable for later use
10	        Click on the "Add to compare list" button	                                                                                        The "Add to compare list" button		                                                                                                                                        The item is added to the compare list, and the browser is redirected to the compare list page
11	        Click one of the list items belonging to the "top-menu" unordered list	                                                            One of the list items in the "top-menu" unordered list		                                                                                                                    The webpage is redirected to the product category page for the selected product
12.1        Click on one of the category titles on the sub-category page (e.g. desktops, notebooks, and accessories) if redirected there	    One of the "sub-category-item" divs 		                                                                                                                                    The webpage is redirected to the product subcategory page for the selected product
13.1	    Click on one of the product names on the page	                                                                                    One of the product name links		                                                                                                                                            The webpage is redirected to the product page for the selected product
14	        Record the name of the product	                                                                                                    The title of the product page	                                                                The string containing the name of the product	                                The name of the product is stored as a variable for later use
15	        Click on the "Add to compare list" button	                                                                                        The "Add to compare list" button		                                                                                                                                        The item is added to the compare list, and the browser is redirected to the compare list page
16	        Confirm that the names of the two items in the compare list match the recorded names of products added to the list	                The anchor objects that are descendants of the table row with the the "product-name" class	    Both strings containing the names of the products added to the compare list 	Both anchor objects contain strings that match the recorded names of products selected
17	        Click the "Remove" button for one of the items in the compare list	                                                                One of the "Remove" buttons 		                                                                                                                                            One of the items no longer exists in the compare list
18	        Confirm that only one item now exists in the compare list	                                                                        The "compare-products-table" table	                                                            The element in the "Compare-products-table" table	                            Only one item belongs to the compare list
*/

describe('Compare List Test', () => {
    beforeEach(() => {
        // Load user and product data from the fixture before each test
        cy.fixture('userData').as('userData')
        cy.fixture('compareProductData').as('productList')

        // Navigate to the login page before each test
        cy.visit(Cypress.config('baseUrl') + 'login')
    })

    it('should add and remove items from the compare list successfully', function () {
        // Use the custom 'login' command to log in
        cy.login(this.userData.email, this.userData.password)

        for (let product of this.productList) {
            cy.visitProductPage(product)
            cy.get('[value="Add to compare list"]').click()
        }

        cy.url().should('eq', Cypress.config('baseUrl') + 'compareproducts')
        cy.get('tbody').then((compareTable) => {
            cy.wrap(compareTable).find('.product-name').children('.a-center').should('have.length', 2).each((product, index, products) => {
                cy.wrap(product).children().should('have.text', this.productList[this.productList.length - 1 - index].productName)
            })

            cy.wrap(compareTable).find('[value="Remove"]').eq(0).click()
        })
        cy.get('.overview').children('.a-center').should('have.length', this.productList.length - 1)
    })
})
