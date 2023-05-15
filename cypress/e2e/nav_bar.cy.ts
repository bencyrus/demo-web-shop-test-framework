describe('Navigation bar testing', () => {

    it('should navigate to the website homepage', () => {
        cy.loadWebsite()
        cy.log('Website loaded')
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