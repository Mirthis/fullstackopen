const router = require('express').Router()
const { User, Session } = require('../models')

router.post('/', async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: 'Unauthorize' })
  }
  const user = await User.findOne({
    where: {
      id: request.token.id,
    },
  })

  await Session.destroy({ where: { userId: user.id } })
  return response.status(201)
})

module.exports = router
