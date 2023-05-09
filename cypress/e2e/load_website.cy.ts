describe('Load website', () => {

    before(() => {
        // Clear cookies and local storage, and visit the website
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.log('Cookies and local storage cleared')
    })

    it('should load the website', () => {
        cy.loadWebsite()
        cy.log('Website loaded')
    })
})