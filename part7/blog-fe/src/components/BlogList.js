import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const getBlogs = state => state.blogs

  const blogs = useSelector(getBlogs)
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
  //const user = { username: 'dummy' }

  return (
    <div>
      {sortedBlogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          // canBeDeleted={blog.user.username === user.username}
          canBeDeleted={true}
        />
      ))}
    </div>
  )
}

export default BlogList
