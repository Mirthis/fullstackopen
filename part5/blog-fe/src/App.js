import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const loginUser = async userData => {
    try {
      const user = await loginService.login(userData)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setNotificationObj('Login succesfull', 'success')
      return true
    } catch (error) {
      setNotificationObj('Wrong username or password', 'error')
      return false
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(null)
    setNotificationObj('Logout succesfull', 'success')
  }

  const createBlog = async blogData => {
    try {
      const data = await blogService.create(blogData)
      data.user = user
      setBlogs(blogs.concat(data))
      setNotificationObj(`A new blog "${data.title}" by ${data.author} added!`)
      blogFormRef.current.toggleVisibility()
      return data
    } catch (err) {
      setNotificationObj(err.response.data.error, 'error')
      console.log(err.response.data)
    }
  }

  const updateBlog = async blogData => {
    try {
      const data = await blogService.update(blogData)
      setBlogs(blogs.map(b => (b.id !== data.id ? b : data)))
      setNotificationObj(`Like for "${data.title}" submitted!`)
      return data
    } catch (err) {
      setNotificationObj(err.response.data.error, 'error')
      console.log(err.response.data)
    }
  }

  const deleteBlog = async blogData => {
    try {
      const data = await blogService.remove(blogData)
      setBlogs(blogs.filter(b => b.id !== blogData.id))
      setNotificationObj(`Blog "${blogData.title}" deleted!`)
      return data
    } catch (err) {
      setNotificationObj(err.response.data.error, 'error')
      console.log(err.response.data)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setNotificationObj = function (message, type = 'success') {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      {user === null ? (
        <LoginForm loginHandler={loginUser} />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in<button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <CreateBlogForm createBlogHandler={createBlog} />
          </Togglable>
          <div>
            {sortedBlogs.map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                likeHandler={updateBlog}
                canBeDeleted={blog.user.username === user.username}
                deleteHandler={deleteBlog}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
