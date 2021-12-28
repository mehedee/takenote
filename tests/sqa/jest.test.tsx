// @ts-ignore
import React from 'react'
// eslint-disable-next-line import/order
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import userEvent from '@testing-library/user-event'
import dayjs = require('dayjs')

import { TakeNoteApp } from '../../src/client/containers/TakeNoteApp'
import { EmptyEditor } from '../../src/client/components/Editor/EmptyEditor'
import { renderWithRouter } from '../unit/client/testHelpers'
import {
  AddCategoryForm,
  AddCategoryFormProps,
} from '../../src/client/components/AppSidebar/AddCategoryForm'
import reducer, { initialState, toggleDarkTheme } from '../../src/client/slices/settings'
import {
  LastSyncedNotification,
  LastSyncedNotificationProps,
} from '../../src/client/components/LastSyncedNotification'
import { AddCategoryButton } from '../../src/client/components/AppSidebar/AddCategoryButton'
import {
  ScratchpadOption,
  ScratchpadOptionProps,
} from '../../src/client/components/AppSidebar/ScratchpadOption'
import { TestID } from '../../src/resources/TestID'

describe('TakeNote Tests', () => {
  function createCategory(categoryName: string) {
    // click the Add Category Button
    const addCategoryBtn = screen.getByTestId('add-category-button')
    fireEvent.click(addCategoryBtn)

    const inputField = screen.getByTestId('new-category-label')
    const formSubmitBtn = screen.getByTestId('new-category-form')

    userEvent.type(inputField, categoryName)
    fireEvent.submit(formSubmitBtn)
  }

  it('Should have Add Category component/button rendered when loaded TakeNote App', () => {
    const props = {
      handler: jest.fn,
      label: 'Test',
      dataTestID: 'add-category-button',
    }

    render(<AddCategoryButton {...props} />)

    const content = screen.getByTestId('add-category-button')
    expect(content).toBeInTheDocument()
  })

  it('Should add new category', () => {
    const component = renderWithRouter(<TakeNoteApp />)
    const categoryName = 'TestCategory'
    createCategory(categoryName)

    const selector = screen.getByText('TestCategory')
    expect(selector).toBeInTheDocument()
  })

  it('Should Collapse Category List on click if there are items in categories', () => {
    const component = renderWithRouter(<TakeNoteApp />)

    createCategory('TestCategory')
    createCategory('TestCategory2')

    const triggerBtn = screen.getByTestId('category-collapse-button')
    const targetElement = screen.getAllByTestId('category-list-div')

    expect(targetElement).toHaveLength(2)
    targetElement.forEach((element) => {
      expect(element).toBeInTheDocument()
    })

    fireEvent.click(triggerBtn)

    targetElement.forEach((element) => {
      expect(element).not.toBeInTheDocument()
    })
  })

  it('Should render the TakeNote component properly', () => {
    const component = renderWithRouter(<TakeNoteApp />)
    const location = window.location.pathname

    expect(location).toBe('/')
    expect(component).toBeTruthy()
  })

  it('Should change to `dark theme` when clicked the `theme button`', () => {
    const container = renderWithRouter(<TakeNoteApp />)
    const themeButton = screen.getByRole('button', { name: 'Themes' })
    fireEvent.click(themeButton)

    const target = container.container.firstChild

    const nextState = { ...initialState, darkTheme: !initialState.darkTheme }
    const triggerChange = reducer(initialState, toggleDarkTheme())

    expect(triggerChange).toEqual(nextState)
    expect(target).toHaveClass('dark')
  })

  it('Should open new note in the window when pressed `CTRL+ALT+N`', () => {
    const container = renderWithRouter(<TakeNoteApp />)
    const noteEditor = screen.getByTestId('sidebar-action-create-new-note')
    fireEvent.keyDown(noteEditor, { key: 'n', ctrlKey: true, altKey: true })
    const target = screen.getByText('New note')
    expect(target).toBeInTheDocument()
  })

  it('Should render `Empty Editor` component with Keyboard indicators', () => {
    const component = render(<EmptyEditor />)
    const createNoteText = component.queryByTestId('empty-editor')
    expect(createNoteText).toBeInTheDocument()
    expect(component.getByText('CTRL')).toBeInTheDocument()
    expect(component.getByText('ALT')).toBeInTheDocument()
    expect(component.getByText('N')).toBeInTheDocument()
  })

  it('Should render `Category Add Form` component when the `Add Category` button is clicked', () => {
    const enabledProps: AddCategoryFormProps = {
      submitHandler: jest.fn,
      changeHandler: jest.fn,
      resetHandler: jest.fn,
      editingCategoryId: 'Category-id',
      tempCategoryName: 'Category-id',
      dataTestID: 'new-category-label',
    }
    const component = render(<AddCategoryForm {...enabledProps} />)
    expect(component).toBeTruthy()
  })

  it('Should have Search button on the page', () => {
    const component = renderWithRouter(<TakeNoteApp />)
    const target = screen.getByTestId('note-search')
    expect(target).toBeInTheDocument()
  })

  it('Should have Open new note page on New Note menu click', () => {
    const component = renderWithRouter(<TakeNoteApp />)
    expect(component).toBeTruthy()
  })

  it('renders the ScratchpadOption component', () => {
    const enabledProps: ScratchpadOptionProps = {
      swapFolder: jest.fn,
      active: true,
    }

    const component = render(<ScratchpadOption {...enabledProps} />)

    expect(component).toBeTruthy()
  })

  it('Should display date on Last Sync Notification Date ', () => {
    const enabledProps: LastSyncedNotificationProps = {
      datetime: Date(),
      pending: false,
      syncing: false,
    }

    const { getByTestId } = render(<LastSyncedNotification {...enabledProps} />)
    const target = getByTestId(TestID.LAST_SYNCED_NOTIFICATION_DATE).innerHTML
    expect(target).toBe(dayjs(Date()).format('LT on L'))
  })

  it('Should Render the Settings Modal on click', () => {
    const container = renderWithRouter(<TakeNoteApp />)
    const themeButton = screen.getByRole('button', { name: 'Settings' })
    fireEvent.click(themeButton)

    // @ts-ignore
    const target = container.container.firstChild
    // const target = screen.getByText('Log out')
    expect(target.childNodes[1]).toHaveClass('dimmer')
  })

  it('Should See Preference menu on Settings Page', () => {
    const container = renderWithRouter(<TakeNoteApp />)
    const themeButton = screen.getByRole('button', { name: 'Settings' })
    fireEvent.click(themeButton)
    const target = screen.getByRole('button', { name: 'Preferences' })
    expect(target).toBeInTheDocument()
  })

  it('Should See Data Management menu on Settings Page', () => {
    const container = renderWithRouter(<TakeNoteApp />)
    const themeButton = screen.getByRole('button', { name: 'Settings' })
    fireEvent.click(themeButton)
    const target = screen.getByRole('button', { name: 'Data management' })
    expect(target).toBeInTheDocument()
  })

  it('Should See Export Button from Data Management in Settings', () => {
    const container = renderWithRouter(<TakeNoteApp />)
    const themeButton = screen.getByRole('button', { name: 'Settings' })
    fireEvent.click(themeButton)
    let target = screen.getByRole('button', { name: 'Data management' })
    fireEvent.click(target)

    target = screen.getByRole('button', { name: 'Export backup' })
    expect(target).toBeInTheDocument()
  })

  it('Should See Import Button from Data Management in Settings', () => {
    const container = renderWithRouter(<TakeNoteApp />)
    const themeButton = screen.getByRole('button', { name: 'Settings' })
    fireEvent.click(themeButton)
    let target = screen.getByRole('button', { name: 'Data management' })
    fireEvent.click(target)

    target = screen.getByRole('button', { name: 'Import backup' })
    expect(target).toBeInTheDocument()
  })

  it('Should See Download All Button from Data Management in Settings', () => {
    const container = renderWithRouter(<TakeNoteApp />)
    const themeButton = screen.getByRole('button', { name: 'Settings' })
    fireEvent.click(themeButton)
    let target = screen.getByRole('button', { name: 'Data management' })
    fireEvent.click(target)

    target = screen.getByRole('button', { name: 'Download all notes' })
    expect(target).toBeInTheDocument()
  })

  it('Should See View Source button in About TakeNote in Settings', () => {
    const container = renderWithRouter(<TakeNoteApp />)
    const themeButton = screen.getByRole('button', { name: 'Settings' })
    fireEvent.click(themeButton)
    let target = screen.getByRole('button', { name: 'About TakeNote' })
    fireEvent.click(target)

    target = screen.getByText('View source')
    expect(target).toBeInTheDocument()
  })

  it('Should See Logout button in Settings', () => {
    const container = renderWithRouter(<TakeNoteApp />)
    const themeButton = screen.getByRole('button', { name: 'Settings' })
    fireEvent.click(themeButton)
    const target = screen.getByRole('button', { name: 'Log out' })

    expect(target).toBeInTheDocument()
  })
})
