// @ts-ignore
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { TakeNoteApp } from '../../src/client/containers/TakeNoteApp'
import { EmptyEditor } from '../../src/client/components/Editor/EmptyEditor'
import { renderWithRouter } from '../unit/client/testHelpers'
import { AddCategoryButton } from '../../src/client/components/AppSidebar/AddCategoryButton'
import {
  AddCategoryForm,
  AddCategoryFormProps,
} from '../../src/client/components/AppSidebar/AddCategoryForm'
import reducer, { initialState, toggleDarkTheme } from '../../src/client/slices/settings'

describe('TakeNote Tests', () => {
  it('Should render the TakeNote component properly', () => {
    renderWithRouter(<TakeNoteApp />)

    const location = window.location.pathname
    expect(location).toBe('/')
  })

  it('Should have Add Category component rendered when loaded TakeNote App', () => {
    const enabledProps = {
      handler: jest.fn,
      label: 'Test',
      dataTestID: 'add-category-button',
    }

    const component = render(<AddCategoryButton {...enabledProps} />)

    const content = screen.getByTestId('add-category-button')
    expect(content).toBeInTheDocument()
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

  it('Should change the theme color status when Status is updated ', () => {
    const nextState = { ...initialState, darkTheme: !initialState.darkTheme }
    const triggerChange = reducer(initialState, toggleDarkTheme())

    expect(triggerChange).toEqual(nextState)
  })

  it('Should change to `dark theme` when clicked the `theme button`', () => {
    const container = renderWithRouter(<TakeNoteApp />)
    const themeButton = screen.getByRole('button', { name: 'Themes' })
    fireEvent.click(themeButton)
    const target = container.container.firstChild

    expect(target).toHaveClass('dark')
  })

  it('Should render `Empty Editor` component with CTRL+ALT+N text', () => {
    const component = render(<EmptyEditor />)
    const createNoteText = component.queryByTestId('empty-editor')
    expect(component.getByText('CTRL')).toBeInTheDocument()
    expect(component.getByText('ALT')).toBeInTheDocument()
    expect(component.getByText('N')).toBeInTheDocument()
  })

  it('Should open new note in the window when pressed `CTRL+ALT+N`', () => {
    const container = renderWithRouter(<TakeNoteApp />)
    const noteEditor = screen.getByTestId('sidebar-action-create-new-note')
    fireEvent.keyDown(noteEditor, { key: 'n', ctrlKey: true, altKey: true })
    const target = screen.getByText('New note')
    expect(target).toBeInTheDocument()
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
