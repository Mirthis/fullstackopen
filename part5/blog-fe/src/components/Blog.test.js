import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog
  let container
  let mockDeleteHandler
  let mockLikeHandler

  beforeEach(() => {
    blog = {
      title: 'test blog',
      author: 'test author',
      url: 'http://test.url',
      user: { userna: 'root' },
      likes: 10,
    }

    mockLikeHandler = jest.fn()
    mockDeleteHandler = jest.fn()

    container = render(
      <Blog
        blog={blog}
        likeHandler={mockLikeHandler}
        canBeDeleted={false}
        deleteHandler={mockDeleteHandler}
      />
    ).container
  })

  test('renders content', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
  })

  test('show details when show button is clicked', () => {
    const button = screen.getByText('view')
    userEvent.click(button)

    const urlDiv = container.querySelector('.blog-url')
    expect(urlDiv).toHaveTextContent(blog.url)

    const likesDiv = container.querySelector('.blog-likes')
    expect(likesDiv).toHaveTextContent(`likes: ${blog.likes}`)
  })

  test('renders content', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
  })

  test('show details when show button is clicked', () => {
    const button = screen.getByText('view')
    userEvent.click(button)

    const urlDiv = container.querySelector('.blog-url')
    expect(urlDiv).toHaveTextContent(blog.url)

    const likesDiv = container.querySelector('.blog-likes')
    expect(likesDiv).toHaveTextContent(`likes: ${blog.likes}`)
  })

  test('call like handler when like button is clicked', () => {
    const viewButton = screen.getByText('view')
    userEvent.click(viewButton)

    const likeButton = screen.getByText('like')
    userEvent.click(likeButton)
    expect(mockLikeHandler.mock.calls).toHaveLength(1)
    userEvent.click(likeButton)
    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
