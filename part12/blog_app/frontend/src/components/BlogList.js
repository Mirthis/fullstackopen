import React from 'react'
import BlogPreview from './BlogPreview'
import { List } from '@mui/material'

const BlogList = ({ blogs }) => {
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
  //const user = { username: 'dummy' }

  return (
    <div>
      {sortedBlogs.length ? (
        <List>
          {sortedBlogs.map(blog => (
            <BlogPreview
              key={blog.id}
              blog={blog}
              // canBeDeleted={blog.user.username === user.username}
              canBeDeleted={true}
            />
          ))}
        </List>
      ) : (
        <p>No blogs to display</p>
      )}
    </div>
  )
}

export default BlogList
