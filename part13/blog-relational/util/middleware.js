const logger = require('./logger')
const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { Session } = require('../models')

const tokenExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    const session = await Session.findOne({ where: { token: token } })
    const decodedToken = jwt.verify(token, SECRET)
    if (!session || !decodedToken) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    request.token = decodedToken
  }

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  logger.error(error.name)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeForeignKeyConstraintError'
  ) {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
}
