describe('App Sidebar test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/app')
  })

  it('Creates two categories and selects the first', () => {
    cy.get('.category-button').click()
    cy.get('.category-form > input').type('first{enter}')
    cy.get('.category-button').click()
    cy.get('.category-form > input').type('second{enter}')
    cy.get('.category-list-each').contains('first').click()
  })

  it('Creates a new note and previews it', () => {
    cy.contains('New note').click()
    cy.get('.CodeMirror textarea')
      .type('# Hello there!{enter}')
      .type('This test case is written by Ashik')
    cy.get('.note-menu-bar-button > span')
      .contains('Preview note')
      .then((button) => {
        button.click()
      })
    cy.get('.previewer').should('contain.html', 'h1').should('contain.text', 'Hello there!')
  })

  it('First line of the note should be the note title', () => {
    cy.visit('http://localhost:3000/app')
    cy.contains('New note').click()
    cy.get('.CodeMirror')
      .type('# hello there{enter}')
      .type("That's right{enter}")
      .type('White tiger')
    cy.get('.note-list-each.selected .truncate-text').should('have.text', ' hello there')
  })
})
