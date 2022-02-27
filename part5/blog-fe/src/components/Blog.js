import { useState } from 'react'
import React from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blogDetails = () => (
    <>
      <div>{blog.url}</div>
      <div>
        likes: {blog.likes}
        <button>like</button>
      </div>
    </>
  )

  const toggleVisibility = () => {
    console.log(typeof setVisible)
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
