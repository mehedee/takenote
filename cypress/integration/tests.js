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
    const timeStamp = new Date().toLocaleString()
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

describe('Should renders Scratchpad component', () => {
  it('renders the Scratchpad component', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.app-sidebar-wrapper').then((elements) => {
      elements.toArray().forEach((element) => {
        if (element.innerText === 'Scratchpad') {
          element.click()
        }
      })
    })
    cy.get('.CodeMirror').should('exist')
  })
})

describe('Create a new note by clicking Notes', () => {
  it('should have Open new note page on New Note menu click', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.action-button').click()
    cy.get('.note-list-each.selected .truncate-text').should('have.text', ' New note')
  })
})

describe('Should have Search button on the page', () => {
  it('renders search button', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.note-sidebar-header > input').should('exist')
  })
})

describe('Should have Add Category component/button rendered when loaded TakeNote App', () => {
  it('renders add category button', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.category-button').should('exist')
  })
})

describe('Should See Preference menu on Settings Page', () => {
  it('renders Preference menu on Settings Page', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.note-menu-bar-button').then((elements) => {
      elements.toArray().forEach((element) => {
        if (element.innerText === 'Settings') {
          element.click()
        }
      })
    })
    cy.get('.settings-content .tab').should((elements) => {
      expect(elements[0]).to.have.text(' Preferences')
    })
  })
})

describe('Should See Data Management menu on Settings Page', () => {
  it('renders Data Management menu on Settings Page', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.note-menu-bar-button').then((elements) => {
      elements.toArray().forEach((element) => {
        if (element.innerText === 'Settings') {
          element.click()
        }
      })
    })
    cy.get('.settings-content .tab').should((elements) => {
      expect(elements[2]).to.have.text(' Data management')
    })
  })
})

describe('Should See Export Button from Data Management in Settings', () => {
  it('renders Export Button from Data Management in Settings', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.note-menu-bar-button').then((elements) => {
      elements.toArray().forEach((element) => {
        if (element.innerText === 'Settings') {
          element.click()
        }
      })
    })
    cy.get('.settings-content .tab').then((elements) => {
      elements.toArray().forEach((element) => {
        if (element.innerText === 'Data management') {
          element.click()
        }
      })
    })
    cy.get('.icon-button').should(elements => {
      expect(elements[1]).to.have.text('Export backup')
    })
  })
})

describe('Should See Import Button from Data Management in Settings', () => {
  it('renders Import Button from Data Management in Settings', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.note-menu-bar-button').then((elements) => {
      elements.toArray().forEach((element) => {
        if (element.innerText === 'Settings') {
          element.click()
        }
      })
    })
    cy.get('.settings-content .tab').then((elements) => {
      elements.toArray().forEach((element) => {
        if (element.innerText === 'Data management') {
          element.click()
        }
      })
    })
    cy.get('.icon-button').should(elements => {
      expect(elements[2]).to.have.text('Import backup')
    })
  })
})

describe('Should see Download all notes from Data Management in Settings', () => {
  it('renders Download all notes from Data Management in Settings', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.note-menu-bar-button').then((elements) => {
      elements.toArray().forEach((element) => {
        if (element.innerText === 'Settings') {
          element.click()
        }
      })
    })
    cy.get('.settings-content .tab').then((elements) => {
      elements.toArray().forEach((element) => {
        if (element.innerText === 'Data management') {
          element.click()
        }
      })
    })
    cy.get('.icon-button').should(elements => {
      expect(elements[0]).to.have.text('Download all notes')
    })
  })
})

describe('Should See View Source button in About TakeNote in Settings', () => {
  it('renders View Source button in About TakeNote in Settings', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.note-menu-bar-button').then((elements) => {
      elements.toArray().forEach((element) => {
        if (element.innerText === 'Settings') {
          element.click()
        }
      })
    })
    cy.get('.settings-content .tab').then((elements) => {
      elements.toArray().forEach((element) => {
        if (element.innerText === 'About TakeNote') {
          element.click()
        }
      })
    })
    cy.get('a').should(elements => {
      expect(elements[elements.length-1]).to.have.text('View source')
    })
  })
})

describe('Should See Logout button in Settings', () => {
  it('renders Logout button in Settings', () => {
    cy.visit('http://localhost:3000/app')
    cy.get('.note-menu-bar-button').then((elements) => {
      elements.toArray().forEach((element) => {
        if (element.innerText === 'Settings') {
          element.click()
        }
      })
    })
    cy.get('.profile > button').should('exist')
  })
})
