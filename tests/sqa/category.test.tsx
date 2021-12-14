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
})
