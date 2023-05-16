//This test case ensures that inputting a query into search bar and clicking the search button navigates
///to a search results page that displays items that match an input search query (in this case, "laptop").
//This test case fails if searching for a keyword does not navigate the page to a search results page, and also fails if the
//search results page does not correspond to the term searched for .

/*
Step Number	Description	                Object	            Data            Expected Result
1	        Navigate to Demo Web Shop                                       Main page of Demo Web Shop is displayed
2	        Enter search query	        Search input field	Laptop	        Laptop is displayed in the search field
3	        Click on the search button	Search button		                Search results page for "Laptop" is displayed
*/

describe('search bar testing', () => {
    beforeEach(function () {
        cy.fixture('searchData').as('searchData')
    })

    it('should navigate to the homepage, enter a query in the search bar, click the search button, and verify that the browser navigates to the search results page for that exact query', function () {
        cy.loadWebsite()
        cy.searchProduct(this.searchData.BC002query)
        cy.url().should(
            'eq',
            this.searchData.expectedURL +
                this.searchData.query.replace(/ /g, '+'),
        )
    })
})
