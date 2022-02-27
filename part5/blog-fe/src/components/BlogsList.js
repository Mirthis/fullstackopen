import Blog from './Blog'

const BlogsList = ({ blogs, likeHandler }) => {
  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} likeHandler={likeHandler} />
      ))}
    </div>
  )
}

export default BlogsList
