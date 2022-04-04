const router = require('express').Router()
const { ReadingList } = require('../models')

router.post('/', async (req, res) => {
  if (!req.token || req.token.id !== req.body.userId) {
    return res.status(401).json({ error: 'Unauthorize' })
  }

  const readingList = await ReadingList.create(req.body)
  return res.json(readingList)
})

router.post('/:id', async (req, res) => {
  if (!req.token) {
    return res.status(401).json({ error: 'Unauthorize' })
  }

  const readingList = await ReadingList.findOne({
    where: { blogId: req.params.id, userId: req.token.id },
  })

  if (!readingList) {
    return res.status(400).json({ error: 'reading list item not found' })
  }
  readingList.read = true
  await readingList.save()
  return res.json(readingList)
})

module.exports = router
