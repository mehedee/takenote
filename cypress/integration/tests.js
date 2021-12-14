describe('Catgory creation', () => {
  it('Creates a category', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.category-button').click()
    cy.get('.category-form > input').type('test category{enter}')
    cy.get('.category-list-name').should('contain.text', 'test category')
  })
})

describe('Should see the TakeNote App', () => {
  it('Renders the app', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.CodeMirror').should('exist')
  })
})

describe('Change app to dark mode', () => {
  it('Toggles the dark mode on', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.note-menu-bar-button').then((elements) => {
      elements.toArray().forEach((element) => {
        if (element.innerText === 'Themes') {
          element.click()
        }
      })
    })
    cy.get('.CodeMirror').should('have.class', 'cm-s-new-moon')
  })
})

describe('Create a new note by shortcut', () => {
  it('opens a new note when pressed CTRL+ALT+N', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.CodeMirror').type('{ctrl}{alt}N')
    cy.get('.note-list-each.selected .truncate-text').should('have.text', ' New note')
  })
})

describe('Should open the Settings Modal when clicked Settings Icon', () => {
  it('clicks settings button and open settings modal', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.note-menu-bar-button').then((elements) => {
      elements.toArray().forEach((element) => {
        if (element.innerText === 'Settings') {
          element.click()
        }
      })
    })
    cy.get('.settings-modal').should('exist')
  })
})

describe('Empty editor is rendered', () => {
  it('renders empty note when a note is created', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.app-sidebar-link').then((elements) => {
      elements.toArray().forEach((element) => {
        if (element.innerText === 'Favorites') {
          element.click()
        }
      })
    })
    cy.get('.empty-editor').should('exist')
  })
})

describe('Render `Category Add Form` component when the `Add Category` button is clicked', () => {
  it('renders the category form', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.category-button').click()
    cy.get('.app-sidebar-main').within(() => {
      cy.get('form').should('have.class', 'category-form')
    })
  })
})

describe('Clicking on Last Sync btn should show last sync time stamp', () => {
  const getTimeAndDate = () => {
    const timeStamp = new Date().toLocaleString('en-US')
    const date = timeStamp.split(',')[0]
    const timeArr = timeStamp.split(',')[1].split(':')
    const time = timeArr[0] + ':' + timeArr[1] + ' ' + timeArr[2].split(' ')[1]

    return {
      time,
      date,
    }
  }

  it('clicks on Sync button and shows last time stamp', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.note-menu-bar-button').then((elements) => {
      elements.toArray().forEach((element) => {
        if (element.innerText === 'Sync notes') {
          element.click()
        }
      })
    })
    const timeStamp = getTimeAndDate()
    const syncTime = timeStamp.time + ' on ' + timeStamp.date
    cy.get('.last-synced > span').should('contain.text', syncTime.trim())
  })
})

describe('Clicking on "Categories" menu should collapse Category list', () => {
  it('clicks on "Categories" and collapses category list', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.collapse-button').click()
    cy.get('.category-list').should('not.exist')
  })
})
