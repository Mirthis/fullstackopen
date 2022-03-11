const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Author name is mandatory'],
    unique: [true, 'Author name must be unique'],
    minlength: [4, 'Author name must be at least 2 characters long.'],
  },
  born: {
    type: Number,
  },
})

module.exports = mongoose.model('Author', schema)
