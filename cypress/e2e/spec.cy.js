/// <reference types="cypress" />

it('finds the last element', () => {
  cy.visit('index.html', {
    onBeforeLoad(win) {
      // simulate a browser that does not have
      // some ES6 Array methods
      // If there is no polyfill, the app
      // will throw an error trying to use it
      delete win.Array.prototype.findLast
    },
  })
  cy.contains('button', 'Find').click()
  cy.contains('output', '130')
})
