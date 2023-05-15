//This test case ensures that all navigation bar (otherwise known as the top menu, or the header menu) items can be clicked and navigate to the pages
//they are expected to navigate to. 
//The test case will fail if any of the navigation bar items do not lead to their expected pages
/*
Step Number	Description	                        Object	                    Data	        Expected Result
1	        Navigate to Demo Web Shop			                                            Main page of Demo Web Shop is displayed
2	        Click on "Books" button	            Books button		                        Books category page is displayed
3	        Click on "Computers" button	        Computers button		                    Computers category page is displayed
4	        Click on "Electronics" button	    Electronics button		                    Electronics category page is displayed
5	        Click on "Apparel & Shoes" button	Apparel & Shoes button		                Apparel & Shoes category page is displayed
6	        Click on "Digital Downloads" button	Digital Downloads button                    Digital Downloads category page is displayed
7	        Click on "Jewelry" button	        Jewelry button		                        Jewelry category page is displayed
8	        Click on "Gift Cards" button	    Gift Cards button		                    Gift Cards category page is displayed
*/

describe('Navigation bar testing', () => {

    it('should navigate to the website homepage', () => {
        cy.loadWebsite()
    })

    it('should click "BOOKS" on the navigation bar and verify that clicking the link navigates to the books category page', () => {
        cy.get('ul.top-menu a[href="/books"]').click();
        cy.url().should('eq', 'https://demowebshop.tricentis.com/books');
    })

    it('should click "COMPUTERS" on the navigation bar and verify that clicking the link navigates to the computers category page', () => {
        cy.get('ul.top-menu a[href="/computers"]').click();
        cy.url().should('eq', 'https://demowebshop.tricentis.com/computers');
    })

    
    it('should click "ELECTRONICS" on the navigation bar and verify that clicking the link navigates to the electronics category page', () => {
        cy.get('ul.top-menu a[href="/electronics"]').click();
        cy.url().should('eq', 'https://demowebshop.tricentis.com/electronics');
    })

    
    it('should click "APPAREL & SHOES" on the navigation bar and verify that clicking the link navigates to the apparel and shoes category page', () => {
        cy.get('ul.top-menu a[href="/apparel-shoes"]').click();
        cy.url().should('eq', 'https://demowebshop.tricentis.com/apparel-shoes');
    })

    
    it('should click "DIGITAL DOWNLOADS" on the navigation bar and verify that clicking the link navigates to the digital downloads category page', () => {
        cy.get('ul.top-menu a[href="/digital-downloads"]').click();
        cy.url().should('eq', 'https://demowebshop.tricentis.com/digital-downloads');
    })

    
    it('should click "JEWELRY" on the navigation bar and verify that clicking the link navigates to the jewelry category page', () => {
        cy.get('ul.top-menu a[href="/jewelry"]').click();
        cy.url().should('eq', 'https://demowebshop.tricentis.com/jewelry');
    })

    
    it('should click "GIFT CARDS" on the navigation bar and verify that clicking the link navigates to the gift cards category page', () => {
        cy.get('ul.top-menu a[href="/gift-cards"]').click();
        cy.url().should('eq', 'https://demowebshop.tricentis.com/gift-cards');
    })


})