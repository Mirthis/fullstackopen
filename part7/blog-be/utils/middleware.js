const logger = require('./logger')
const morgan = require('morgan')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    request.token = decodedToken
  }

  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    request.user = await User.findById(request.token.id)
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

morgan.token('type', function (req, _) {
  const data = req.body
  return JSON.stringify(data)
})

module.exports = {
  unknownEndpoint,
  errorHandler,
  morgan,
  tokenExtractor,
  userExtractor,
}
