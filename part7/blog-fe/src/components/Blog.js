import { useState } from 'react'
import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, canBeDeleted }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = async () => {
    try {
      await dispatch(likeBlog(blog))
      dispatch(
        setNotification(`Like for "${blog.title}" submitted!`, 'success')
      )
    } catch (err) {
      dispatch(
        setNotification(
          `Something went wrong when liking "${blog.title}"!`,
          'error'
        )
      )
      console.log(err)
    }
  }

  const handleDelete = () => {
    const confirmed = window.confirm(`Delete ${blog.title} by ${blog.author}?`)
    if (confirmed) {
      try {
        dispatch(deleteBlog(blog))
        dispatch(setNotification(`"${blog.title}" deleted!`, 'success'))
      } catch (err) {
        dispatch(
          setNotification(
            `Something went wrong when deleting "${blog.title}"!`,
            'error'
          )
        )
        console.log(err)
      }
    }
  }

  const blogDetails = () => (
    <div className="blog-details">
      <div className="blog-url">{blog.url}</div>
      <div className="blog-likes">
        likes: <span className="blog-likes-number">{blog.likes}</span>
        <button onClick={handleLike}>like</button>
      </div>
      <div>owner: {blog.user.username}</div>
      <div>
        {canBeDeleted && <button onClick={handleDelete}>Remove</button>}
      </div>
    </div>
  )

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button className="btn-blog-expand" onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && blogDetails()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  canBeDeleted: PropTypes.bool.isRequired,
}

export default Blog
