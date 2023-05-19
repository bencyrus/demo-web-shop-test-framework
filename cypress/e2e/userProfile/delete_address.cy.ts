// This test case ensures a logged-in user can delete an address to their account for use in purchases.
// The test case will fail if the user is not able to delete an address to their account.

// Step Number      Description                                 Object	                            Data                Expected Result
// 1                Click account email in header               Account email link                  "  "                Account details page is displayed
// 2                Click "Addresses" in the "My Account" bar   Addresses link                                          Addresses page is displayed
// 3                Click "Delete" button                       Delete button                                           Address deletion confirmation modal is displayed
// 4                Click "OK" button                           OK button                                               Address page is displayed without deleted address record

describe('Delete address', () => {
    before(() => {
        cy.loadWebsite()
    })

    it('should delete the new address', function () {
        cy.navigateToAccountDetails()

        cy.navigateToAddresses()

        cy.deleteFirstAddress()

        cy.get('.address-list')
            .children('.address-item')
            .should('have.length', 0)
    })
})
