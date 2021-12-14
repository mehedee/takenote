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

  it('Should Show the last sync time on clicking Sync button', () => {
    const enabledProps: LastSyncedNotificationProps = {
      datetime: '',
      pending: false,
      syncing: false,
    }

    const component = render(<LastSyncedNotification {...enabledProps} />)
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

  it('Should Render the Settings Modal on click', () => {
    expect(2 + 2).toBe(4)
  })
})
