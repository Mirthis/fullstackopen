const router = require('express').Router()
const { User, Blog, Session } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({ include: { model: Blog } })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  })
  if (user) {
    user.username = req.body.username
    await user.save()
    res.json(user)
  } else {
    return res.status(400).json({ error: 'user not found' })
  }
})

router.get('/:id', async (req, res) => {
  let where = {}
  if (req.query.read) {
    where = { read: req.query.read === 'true' }
  }

  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      as: 'readings',
      through: {
        attributes: ['read', 'id'],
        where,
      },
    },
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

// Only for testing
router.post('/:id/disable', async (req, res) => {
  const [, [user]] = await User.update(
    { disabled: req.body.disabled },
    { returning: true, where: { id: req.params.id } }
  )
  if (user) {
    await Session.destroy({ where: { userId: user.id } })
    res.json(user)
  } else {
    return res.status(400).json({ error: 'user not found' })
  }
})

module.exports = router
