/// <reference types="cypress" />

it('finds the last element', () => {
  cy.visit('index.html')
  cy.contains('button', 'Find').click()
  cy.contains('output', '130')
})

it('finds the last element (older browser)', () => {
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

it('finds the last element (older browser, observe polyfill loads)', () => {
  cy.intercept({
    method: 'GET',
    hostname: 'cdn.jsdelivr.net',
    pathname: '/npm/core-js-bundle*/*',
  }).as('core-js')
  cy.visit('index.html', {
    onBeforeLoad(win) {
      // simulate a browser that does not have
      // some ES6 Array methods
      // If there is no polyfill, the app
      // will throw an error trying to use it
      delete win.Array.prototype.findLast
    },
  })
  // confirm the polyfill loads
  cy.wait('@core-js').its('response.statusCode').should('be.below', 400)
  cy.contains('button', 'Find').click()
  cy.contains('output', '130')
})
