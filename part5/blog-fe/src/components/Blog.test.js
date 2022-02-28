import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'http://test.url',
  }

  const mockHandler = jest.fn()

  const { container } = render(
    <Blog
      blog={blog}
      likeHandler={mockHandler}
      canBeDeleted={false}
      deleteHandler={mockHandler}
    />
  )

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
})
