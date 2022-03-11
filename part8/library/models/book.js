const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is mandatory'],
    unique: [true, 'Book title must be unique'],
    minlength: [2, 'Book title must be at least 2 characters long.'],
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [{ type: String }],
})

module.exports = mongoose.model('Book', schema)
