// describe('user cannot post review if not typed', () => {
//   it('click sumbit and nothing happen', () => {
//     cy.visit('http://localhost:3000/reviews')
//     cy.contains('Submit Review').click()
//     cy.url().should("eq", "http://localhost:3000/reviews");
//     //TODO it will check there is a warning sign in the text box
//   })
// })

describe('Test without log in can write review', () => {
    it('input into the form and check the right information will display on page', () => {
      cy.visit('http://localhost:3002/reviews')
      cy.get('input[name="title"]').type('testTitle')
      cy.get('input[name="title"]').should('have.value', 'testTitle')
      cy.get('input[name="name"]').type('testName')
      cy.get('input[name="name"]').should('have.value', 'testName')
      cy.get('textarea[name="content"]').type('testReviewContent')
      cy.get('textarea[name="content"]').should('have.value', 'testReviewContent')
      cy.contains('Submit Review').click()
  
      cy.get('.text-xl.text-black.font-semibold.mb-2').contains('testTitle')
      cy.get('.text-gray-800.font-medium').contains('testName')
      cy.get('.text-gray-700.mt-2').contains('testReviewContent')
  
    })
  })