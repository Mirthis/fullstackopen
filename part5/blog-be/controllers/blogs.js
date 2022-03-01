const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const note = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!request.token) return response.status(401).json({ error: 'Unauthorize' })
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!request.token)
    return response.status(401).json({ error: 'Unauthorized' })
  const user = request.user
  if (!blog) {
    return response.status(204).end()
  }
  if (blog.user.toString() !== user.id.toString()) {
    return response
      .status(401)
      .json({ error: 'blog can only be deleted by the creator' })
  }
  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog)
})

module.exports = blogsRouter
