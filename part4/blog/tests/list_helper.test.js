const listHelper = require('../utils/list_helper')
const blogs = require('./test_helper').initialBlogs

describe('total likes', () => {
  test('when list is empty, equals 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs.slice(0, 1))
    expect(result).toBe(blogs[0].likes)
  })

  test('when list has multiple items equals the sum of the likes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('when list is empty, return undefined', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(undefined)
  })

  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favoriteBlog(blogs.slice(0, 1))
    expect(result).toEqual(blogs[0])
  })

  test('when list has multiple items equals the sum of the likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('most blogs', () => {
  test('when list is empty, return undefined', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(undefined)
  })

  test('when list has only one blog, equals the author of that blog with a single blog', () => {
    const result = listHelper.mostBlogs(blogs.slice(0, 1))
    expect(result).toEqual({ author: blogs[0].author, blogs: 1 })
  })

  test('when list has multiple items equals the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  test('when list is empty, return undefined', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(undefined)
  })

  test('when list has only one blog, equals the author and likes of that blog', () => {
    const result = listHelper.mostLikes(blogs.slice(0, 1))
    expect(result).toEqual({ author: blogs[0].author, likes: blogs[0].likes })
  })

  test('when list has multiple items equals the author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
