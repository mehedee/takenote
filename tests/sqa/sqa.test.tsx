// @ts-ignore
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import { TakeNoteApp } from '../../src/client/containers/TakeNoteApp'
import { NoteEditor } from '../../src/client/containers/NoteEditor'
import { EmptyEditor } from '../../src/client/components/Editor/EmptyEditor'
import { renderWithRouter } from '../unit/client/testHelpers'
import {
  AddCategoryButton,
  AddCategoryButtonProps,
} from '../../src/client/components/AppSidebar/AddCategoryButton'
import {
  AddCategoryForm,
  AddCategoryFormProps,
} from '../../src/client/components/AppSidebar/AddCategoryForm'
import reducer, { initialState, toggleDarkTheme } from '../../src/client/slices/settings'

describe('Sample Tests', () => {
  it('Should see the TakeNote App', () => {
    renderWithRouter(<TakeNoteApp />)

    const location = window.location.pathname
    expect(location).toBe('/')
  })

  it('When rendered Add Category Button should be present in the document', () => {
    const enabledProps = {
      handler: jest.fn,
      label: 'Test',
      dataTestID: 'add-category-button',
    }

    const component = render(<AddCategoryButton {...enabledProps} />)

    const content = screen.getByTestId('add-category-button')
    expect(content).toBeInTheDocument()
  })

  it('Category Add form should be available when the Category Form component is called', () => {
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

  it('State update on Theme change', () => {
    const nextState = { ...initialState, darkTheme: !initialState.darkTheme }
    const triggerChange = reducer(initialState, toggleDarkTheme())

    expect(triggerChange).toEqual(nextState)
  })

  it('Should change to dark theme when clicked the theme button', () => {
    const container = renderWithRouter(<TakeNoteApp />)
    const themeButton = screen.getByRole('button', { name: 'Themes' })
    fireEvent.click(themeButton)
    const target = container.container.firstChild

    expect(target).toHaveClass('dark')
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

  it('Should open new note when pressed CTRL+ALT+N', () => {
    const container = renderWithRouter(<TakeNoteApp />)
    const noteEditor = screen.getByTestId('sidebar-action-create-new-note')
    fireEvent.keyDown(noteEditor, { key: 'n', ctrlKey: true, altKey: true })
    const target = screen.getByText('New note')
    expect(target).toBeInTheDocument()
  })

  it('Empty Editor Window Rendered with CTRL+ALT+N text', () => {
    const component = render(<EmptyEditor />)
    const createNoteText = component.queryByTestId('empty-editor')
    expect(component.getByText('CTRL')).toBeInTheDocument()
    expect(component.getByText('ALT')).toBeInTheDocument()
    expect(component.getByText('N')).toBeInTheDocument()
  })
})
