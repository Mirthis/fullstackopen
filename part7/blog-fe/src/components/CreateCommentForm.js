import { useState } from 'react'
import { commentBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const CreateCommentForm = ({ blog }) => {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const createCommentSubmit = async e => {
    e.preventDefault()
    const newComment = {
      text,
    }
    try {
      dispatch(commentBlog(blog.id, newComment))
      dispatch(setNotification('Comment added!', 'success'))
      setText('')
    } catch (err) {
      dispatch(
        setNotification('There was an error adding your comment!', 'error')
      )
      console.log(err)
    }
  }

  return (
    <div>
      <form onSubmit={createCommentSubmit}>
        <input
          type="text"
          value={text}
          name="text"
          onChange={({ target }) => setText(target.value)}
          placeholder="blog title"
        />
        <button id="create-blog-submit" type="submit">
          add comment
        </button>
      </form>
    </div>
  )
}

export default CreateCommentForm
