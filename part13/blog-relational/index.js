require('dotenv').config()
const express = require('express')
require('express-async-errors')
const {
  blogsRouter,
  usersRouter,
  loginRouter,
  authorsRouter,
  readingListsRouter,
  logoutRouter,
} = require('./controllers')
const middleware = require('./util/middleware')
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const app = express()
const logger = require('./util/logger')

app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readingListsRouter)
app.use('/api/logout', logoutRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })
}

start()
