const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const hashedUsers = await Promise.all(
    helper.initialUsers.map(async user => ({
      username: user.username,
      name: user.name,
      passwordHash: await bcrypt.hash(user.password, 10),
    }))
  )
  const modelUsers = hashedUsers.map(user => new User(user))
  const createProm = modelUsers.map(user => user.save())
  await Promise.all(createProm)

  await Blog.deleteMany({})
  const dbUsers = await helper.usersInDb()

  const blogObjects = helper.initialBlogs.map(
    blog => new Blog({ ...blog, user: dbUsers[0].id })
  )
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('Retrieving all blogs GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs have an id property', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('Retrieving a single blog GET /api/blogs/:id', () => {
  test('blog is returned as json', async () => {
    await api
      .get(`/api/blogs/${helper.initialBlogs[0]._id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('specified blog is returned', async () => {
    const allBlogs = await helper.blogsInDb()
    const blogToGet = allBlogs[0]
    const response = await api.get(`/api/blogs/${blogToGet.id}`)
    expect(response.body).toEqual(blogToGet)
  })

  test('return 404 if id does not exist', async () => {
    const blogId = await helper.nonExistingId()
    await api.get(`/api/blogs/${blogId}`).expect(404)
  })

  test('return 400 Bad request if id is invalid', async () => {
    const blogId = (await helper.nonExistingId()) + 'dummy'
    await api.get(`/api/blogs/${blogId}`).expect(400)
  })
})

describe('Updating a blog PUT /api/blogs/:id', () => {
  test('should update the blog if id is valid', async () => {
    const originalBlog = (await helper.blogsInDb())[0]
    const updatedBlog = {
      ...originalBlog,
      title: originalBlog.title + ' (updated)',
    }
    await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const endBlogs = await helper.blogsInDb()
    expect(endBlogs).toContainEqual(updatedBlog)
    expect(endBlogs).not.toContainEqual(originalBlog)
  })
})

describe('Creating blogs POST /api/blogs', () => {
  const newBlog = {
    title: 'This is a new blog post for testing',
    author: 'AC',
    url: 'https://new.test.blog/',
  }

  test('create a new blog', async () => {
    const result = await api.post('/api/login').send(helper.initialUsers[0])
    const token = result.body.token

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: 'bearer ' + token })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allBlogs = await helper.blogsInDb()
    const cleanBlogs = allBlogs.map(b => ({
      title: b.title,
      author: b.author,
      url: b.url,
    }))
    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(cleanBlogs).toContainEqual(newBlog)
  })

  test('set likes to 0 when likes value is not provided', async () => {
    const result = await api.post('/api/login').send(helper.initialUsers[0])
    const token = result.body.token

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: 'bearer ' + token })
    expect(response.body.likes).toEqual(0)
  })

  test('return 400 Bad request if title is missing', async () => {
    const result = await api.post('/api/login').send(helper.initialUsers[0])
    const token = result.body.token

    const invalidBlog = { author: newBlog.author, url: newBlog.url }
    await api
      .post('/api/blogs')
      .send(invalidBlog)
      .set({ Authorization: 'bearer ' + token })
      .expect(400)
  })

  test('return 400 Bad request if url is missing', async () => {
    const result = await api.post('/api/login').send(helper.initialUsers[0])
    const token = result.body.token

    const invalidBlog = { author: newBlog.author, title: newBlog.title }
    await api
      .post('/api/blogs')
      .send(invalidBlog)
      .set({ Authorization: 'bearer ' + token })
      .expect(400)
  })

  test('fails with 401 if token is not present', async () => {
    await api.post('/api/blogs').send(newBlog).expect(401)
  })
})

describe('Deleting blog DELETE /api/notes/:id', () => {
  test('return 204 and delete blogs if id exist', async () => {
    const startBlogs = await helper.blogsInDb()
    const blogToDelete = startBlogs[0]
    const result = await api.post('/api/login').send(helper.initialUsers[0])
    const token = result.body.token

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: 'bearer ' + token })
      .expect(204)

    const endBlogs = await helper.blogsInDb()
    expect(endBlogs).toHaveLength(startBlogs.length - 1)
    expect(endBlogs).not.toContainEqual(blogToDelete)
  })

  test('return 204 and does not change db if id does not exist', async () => {
    const startBlogs = await helper.blogsInDb()
    const blogIdToDelete = await helper.nonExistingId()
    const result = await api.post('/api/login').send(helper.initialUsers[0])
    const token = result.body.token

    await api
      .delete(`/api/blogs/${blogIdToDelete}`)
      .set({ Authorization: 'bearer ' + token })
      .expect(204)

    const endBlogs = await helper.blogsInDb()
    expect(endBlogs).toHaveLength(startBlogs.length)
  })

  test('return 400 Bad request if id is invalid', async () => {
    const blogIdToDelete = (await helper.nonExistingId()) + 'dummy'
    const result = await api.post('/api/login').send(helper.initialUsers[0])
    const token = result.body.token

    await api
      .delete(`/api/blogs/${blogIdToDelete}`)
      .set({ Authorization: 'bearer ' + token })
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
