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

  it('Should render the TakeNote component properly', () => {
    const component = renderWithRouter(<TakeNoteApp />)
    const location = window.location.pathname

    expect(location).toBe('/')
    expect(component).toBeTruthy()
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
})
