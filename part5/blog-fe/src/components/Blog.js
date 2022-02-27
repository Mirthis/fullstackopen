import { useState } from 'react'
import React from 'react'

const Blog = ({ blog, likeHandler, canBeDeleted, deleteHandler }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = () => {
    likeHandler({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = () => {
    const confirmed = window.confirm(`Delete ${blog.title} by ${blog.author}?`)
    if (confirmed) {
      deleteHandler(blog)
    }
  }

  const blogDetails = () => (
    <>
      <div>{blog.url}</div>
      <div>
        likes: {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
      <div>owner: {blog.user.username}</div>
      <div>
        {canBeDeleted && <button onClick={handleDelete}>Remove</button>}
      </div>
    </>
  )

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && blogDetails()}
    </div>
  )
}

export default Blog
