const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')

mongoose.connect(config.MONGODB_URI)

const app = express()

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV !== 'test') {
  app.use(
    middleware.morgan(
      ':method :url :status :res[content-length] - :response-time ms :type'
    )
  )
}

app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
