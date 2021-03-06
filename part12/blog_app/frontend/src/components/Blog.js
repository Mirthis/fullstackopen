import React from 'react'
import { useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
import CommentsList from './CommentsList'
import CreateCommentForm from './CreateCommentForm'
import Typography from '@mui/material/Typography'

const Blog = () => {
  const match = useMatch('/blogs/:id')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getBlogs = state => state.blogs
  const blogs = useSelector(getBlogs)

  const getUser = state => state.loggedUser
  const loggedUser = useSelector(getUser)

  const blog = blogs.find(blog => blog.id === match.params.id)
  if (!blog) return <p>Blog not found</p>
  const canBeDeleted = blog.user.username === loggedUser.username

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
        navigate('/')
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

  return (
    <div>
      <Typography variant="h3" gutterBottom component="div" sx={{ mb: 0 }}>
        {blog.title}
      </Typography>
      <Typography variant="h6" gutterBottom component="div">
        by <em>{blog.author}</em>
      </Typography>
      <div className="blog-details">
        <div className="blog-url">
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div className="blog-likes">
          likes: <span className="blog-likes-number">{blog.likes}</span>
          <button onClick={handleLike}>like</button>
        </div>
        <div>added by {blog.user.username}</div>
        <div>
          {canBeDeleted && <button onClick={handleDelete}>Remove</button>}
        </div>
      </div>
      <h3>Comments</h3>
      <CreateCommentForm blog={blog} />
      <CommentsList comments={blog.comments} />
    </div>
  )
}

export default Blog
