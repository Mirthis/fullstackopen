import { useState, useEffect } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const CreateBlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlogSubmit = async e => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: user,
    }
    try {
      dispatch(createBlog(newBlog))
      dispatch(
        setNotification(
          `A new blog "${newBlog.title}" by ${newBlog.author} added!`,
          'success'
        )
      )
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (err) {
      dispatch(
        setNotification('There was an error creating the blog!', 'error')
      )
      console.log(err)
    }
  }

  return (
    <div>
      <form onSubmit={createBlogSubmit}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="blog title"
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="blog author"
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="blog url"
          />
        </div>
        <button id="create-blog-submit" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default CreateBlogForm
