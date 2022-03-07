import React from 'react'
import { useSelector } from 'react-redux'
import BlogPreview from './BlogPreview'

const BlogList = () => {
  const getBlogs = state => state.blogs

  const blogs = useSelector(getBlogs)
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
  //const user = { username: 'dummy' }

  return (
    <div>
      {sortedBlogs.map(blog => (
        <BlogPreview
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
