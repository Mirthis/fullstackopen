import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlogForm from './CreateBlogForm'
import userEvent from '@testing-library/user-event'

test('<CreateBlogForm /> updates parent state and calls onSubmit', () => {
  const createBlogHandler = jest.fn()

  render(<CreateBlogForm createBlogHandler={createBlogHandler} />)

  const inputTitle = screen.getByPlaceholderText('blog title')
  const inputAuthor = screen.getByPlaceholderText('blog author')
  const inputUrl = screen.getByPlaceholderText('blog url')
  const sendButton = screen.getByText('create')

  userEvent.type(inputTitle, 'Title for a testing blog')
  userEvent.type(inputAuthor, 'AC')
  userEvent.type(inputUrl, 'http://test.url')
  userEvent.click(sendButton)

  expect(createBlogHandler.mock.calls).toHaveLength(1)
  expect(createBlogHandler.mock.calls[0][0].title).toBe(
    'Title for a testing blog'
  )
})
