// const commentsRouter = require('express').Router()
// const Comment = require('../models/comment')

// // commentsRouter.get('/', async (request, response) => {
// //   const blogs = await Blog.find({}).populate('user', {
// //     username: 1,
// //     name: 1,
// //     id: 1,
// //   })
// //   response.json(blogs)
// // })

// // blogsRouter.get('/:id', async (request, response, next) => {
// //   const note = await Blog.findById(request.params.id).populate('user', {
// //     username: 1,
// //     name: 1,
// //     id: 1,
// //   })
// //   if (note) {
// //     response.json(note)
// //   } else {
// //     response.status(404).end()
// //   }
// // })

// commentsRouter.post('/', async (request, response) => {
//   const body = request.body
//   if (!request.token) return response.status(401).json({ error: 'Unauthorize' })
//   const user = request.user

//   const blog = new Blog({
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//     user: user.id,
//   })
//   const savedBlog = await blog.save()
//   user.blogs = user.blogs.concat(savedBlog._id)
//   await user.save()
//   response.status(201).json(savedBlog)
// })

// module.exports = commentsRouter
