import {
  addCategory,
  assertCategoryExists,
  assertCategoryListDoesNotExists,
  assertCategoryListExists,
  collapseCategoryList,
  defocusCategory,
  renameCategory,
  startEditingCategory,
} from '../e2e/utils/testCategoryHelperUtils'
import { dynamicTimeCategoryName } from '../e2e/utils/testHelperEnums'
// import { defaultInit, getTestID } from '../e2e/utils/testHelperUtils'
import { TestID } from '../../src/resources/TestID'

import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'
import React from 'react'
import { TakeNoteApp } from '../../src/client/containers/TakeNoteApp'
import { renderWithRouter } from '../unit/client/testHelpers'

describe('Categories', () => {

  it('should hide the category list on click of category', () => {

    renderWithRouter(<TakeNoteApp />)
    // userEvent.click(screen.getByTestId(TestID.ADD_CATEGORY_BUTTON))
    // userEvent.type(screen.getByTestId(TestID.NEW_CATEGORY_INPUT), 'TestCategoryName')
    // userEvent.click(screen.getByTestId(TestID.NEW_CATEGORY_FORM))
    // console.log('heloijowfiejoiwejfoij')

    const content = screen.getByTestId(TestID.ADD_CATEGORY_BUTTON)
    expect(content).toBeInTheDocument()

    // cy.contains('TestCategory')
    //
    // collapseCategoryList()
    //
    // assertCategoryListDoesNotExists()
  })

  // it('should show category list on add new category', () => {
  //   collapseCategoryList()
  //
  //   addCategory(dynamicTimeCategoryName)
  //
  //   assertCategoryListExists()
  // })
  //
  // it('should rename existing category after defocusing edit state', () => {
  //   const originalCategoryName = 'Category'
  //   const newCategoryName = 'Renamed Category'
  //
  //   addCategory(originalCategoryName)
  //   startEditingCategory(originalCategoryName)
  //   renameCategory(originalCategoryName, newCategoryName)
  //   defocusCategory(newCategoryName)
  //
  //   assertCategoryExists(newCategoryName)
  // })
})
