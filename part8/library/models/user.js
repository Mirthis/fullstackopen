const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is mandatory'],
    minlength: [3, 'Username must be at least 3 character long'],
  },
  favoriteGenre: {
    type: String,
    required: [true, 'Genre is mandatory'],
    minlength: [3, 'Genre must be at least 3 character long'],
  },
})

module.exports = mongoose.model('User', schema)
