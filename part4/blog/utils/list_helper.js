const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  if (!blogs) return 0
  return blogs.reduce((sum, cur) => sum + cur.likes, 0)
}

const favoriteBlog = blogs => {
  return blogs.reduce(
    (max, curr) => (curr.likes > max?.likes ? curr : max),
    blogs[0]
  )
}

const mostBlogs = blogs => {
  // return _.sortBy(
  //   _.map(_.countBy(blogs, 'author'), (k, v) => ({ author: v, blogs: k })),
  //   [el => el.blogs]
  // ).pop()
  return _(blogs)
    .countBy('author')
    .map((k, v) => ({ author: v, blogs: k }))
    .sortBy('blogs')
    .value()
    .pop()
}

const mostLikes = blogs => {
  return _(blogs)
    .groupBy('author')
    .map((v, k) => ({ author: k, likes: _.sumBy(v, 'likes') }))
    .sortBy('likes')
    .value()
    .pop()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
