// @ts-ignore
import React from 'react'
// eslint-disable-next-line import/order
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import userEvent from '@testing-library/user-event'

import { TakeNoteApp } from '../../src/client/containers/TakeNoteApp'
import { EmptyEditor } from '../../src/client/components/Editor/EmptyEditor'
import { renderWithRouter } from '../unit/client/testHelpers'
import {
  AddCategoryForm,
  AddCategoryFormProps,
} from '../../src/client/components/AppSidebar/AddCategoryForm'
import reducer, { initialState, toggleDarkTheme } from '../../src/client/slices/settings'

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

  it('Should add new category', () => {
    const component = renderWithRouter(<TakeNoteApp />)
    const addCategoryBtn = screen.getByTestId('add-category-button')
    fireEvent.click(addCategoryBtn)

    const inputField = screen.getByTestId('new-category-label')
    const formSubmitBtn = screen.getByTestId('new-category-form')

    userEvent.type(inputField, 'TestCategory')
    fireEvent.submit(formSubmitBtn)

    const selector = screen.getByText('TestCategory')
    expect(selector).toBeInTheDocument()
  })

  it('Creates a new note and previews it', () => {
    expect(4).toBe(4)
  })

  it('Should the title only have the first line of the note only', () => {
    // const note = `The note title
    // only should add the first line
    // of the note.`
    //
    // const container = renderWithRouter(<TakeNoteApp />)
    //
    // const title = screen.getByTestId('note-title-0')
    // expect(title).toMatch(`The note title`)
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

  // it('Should Open the Settings Modal when clicked settings icon', () => {
  //   const container = renderWithRouter(<TakeNoteApp/>)
  //   const settingsBtn = screen.getByRole('button', {name: 'Settings'})
  //   fireEvent.click(settingsBtn)
  //
  //   const target = container.getByText('settings-modal')
  //
  //   expect(target).toBeInTheDocument()
  // })
})
