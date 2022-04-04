const router = require('express').Router()
const { Blog, User } = require('../models')
const { Op } = require('sequelize')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const where = {}
  if (req.query.search) {
    where[Op.or] = {
      title: {
        [Op.iLike]: `%${req.query.search}%`,
      },
      author: {
        [Op.iLike]: `%${req.query.search}%`,
      },
    }
  }

  const blogs = await Blog.findAll({
    include: { model: User, attributes: ['username'] },
    where,
    order: [['likes', 'DESC']],
  })
  return res.json(blogs)
})

router.post('/', async (req, res) => {
  if (!req.token) return res.status(401).json({ error: 'Unauthorize' })

  const blog = await Blog.create({ ...req.body, userId: req.token.id })
  return res.json(blog)
})

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (!req.token.id || blog.userId !== req.token.id) {
    return res.status(401).json({ error: 'Unauthorize' })
  }
  const deletedRows = await Blog.destroy({ where: { id: req.params.id } })
  if (deletedRows) {
    return res.json({ status: `${deletedRows} deleted` })
  } else {
    return res.status(400).json({ error: 'blog not found' })
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    return res.status(400).json({ error: 'blog not found' })
  }
})

module.exports = router
