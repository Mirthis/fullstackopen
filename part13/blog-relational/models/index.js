const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')
const Session = require('./session')

User.hasMany(Blog)
User.hasMany(Session)
Blog.belongsTo(User)
Session.belongsTo(User)
User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'user_reading' })

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
}
