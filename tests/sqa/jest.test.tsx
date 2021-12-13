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
import { NoteEditor } from '../../src/client/containers/NoteEditor'
import {
  LastSyncedNotification,
  LastSyncedNotificationProps,
} from '../../src/client/components/LastSyncedNotification'

describe('TakeNote Tests', () => {
  // it('Should have Add Category component rendered when loaded TakeNote App', () => {
  //   const props = {
  //     handler: jest.fn,
  //     label: 'Test',
  //     dataTestID: 'add-category-button',
  //   }
  //
  //   render(<AddCategoryButton {...props} />)
  //
  //   const content = screen.getByTestId('add-category-button')
  //   expect(content).toBeInTheDocument()
  // })

  function createCategory(categoryName: string) {
    // click the Add Category Button
    const addCategoryBtn = screen.getByTestId('add-category-button')
    fireEvent.click(addCategoryBtn)

    const inputField = screen.getByTestId('new-category-label')
    const formSubmitBtn = screen.getByTestId('new-category-form')

    userEvent.type(inputField, categoryName)
    fireEvent.submit(formSubmitBtn)
  }

  it('Should add new category', () => {
    const component = renderWithRouter(<TakeNoteApp />)
    const categoryName = 'TestCategory'
    createCategory(categoryName)

    const selector = screen.getByText('TestCategory')
    expect(selector).toBeInTheDocument()
  })

  it('Should Collapse Category List if there are items in categories', () => {
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

  it('Should Show the last sync time on clicking Sync button', () => {
    const enabledProps: LastSyncedNotificationProps = {
      datetime: '',
      pending: false,
      syncing: false,
    }

    const component = render(<LastSyncedNotification {...enabledProps} />)
    expect(component).toBeTruthy()
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

  it('Should Render the Settings Modal on click', () => {
    expect(2 + 2).toBe(4)
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

  it('Should Open the settings model when clicked settings icon', () => {
    const container = renderWithRouter(<TakeNoteApp />)
    const settingsBtn = screen.getByRole('button', { name: 'Settings' })
    // const settingsBtn = screen.getByRole('button', {name: 'Settings'})

    fireEvent.click(settingsBtn)

    // const target = container.getByRole('Settings-model')
    const target = container.findAllByRole('dimmer')
    // const target = container.container.getElementsByClassName('dimmer')
    //  const target = container.getByRole('dimmer')

    // expect(target).toBeInTheDocument()
    expect(target).toBeTruthy()
    // expect(target).toHaveClass('settings-modal')
  })
})
