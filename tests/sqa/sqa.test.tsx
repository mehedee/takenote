// @ts-ignore
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import { TestID } from '../../src/resources/TestID'
import { TakeNoteApp } from '../../src/client/containers/TakeNoteApp'
import { renderWithRouter } from '../unit/client/testHelpers'
import { AddCategoryButton, AddCategoryButtonProps } from '../../src/client/components/AppSidebar/AddCategoryButton'
import { AddCategoryForm, AddCategoryFormProps } from '../../src/client/components/AppSidebar/AddCategoryForm'
import reducer, { initialState, toggleDarkTheme } from '../../src/client/slices/settings'

describe('Sample Tests', () => {
  it('Should see the App page', () => {
    const container = renderWithRouter(<TakeNoteApp />)

    const location = window.location.pathname
    expect(location).toBe('/')
  })

  it('renders the AddCategoryButton component', () => {
    const enabledProps: AddCategoryButtonProps = {
      handler: jest.fn,
      label: 'Test',
      dataTestID: TestID.ADD_CATEGORY_BUTTON,
    }

    const component = render(<AddCategoryButton {...enabledProps} />)

    expect(component).toBeTruthy()
  })

  it('renders the AddCategoryForm component', () => {
    const enabledProps: AddCategoryFormProps = {
      submitHandler: jest.fn,
      changeHandler: jest.fn,
      resetHandler: jest.fn,
      editingCategoryId: 'Category-id',
      tempCategoryName: 'Category-id',
      dataTestID: TestID.NEW_CATEGORY_INPUT,
    }

    const component = render(<AddCategoryForm {...enabledProps} />)

    expect(component).toBeTruthy()
  })

  it('should toggle dark theme state', () => {
    const nextState = { ...initialState, darkTheme: !initialState.darkTheme }
    const result = reducer(initialState, toggleDarkTheme())

    expect(result).toEqual(nextState)
  })
})
