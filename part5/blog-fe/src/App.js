import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      setNotificationObj('Login succesfull', 'success')
    } catch (error) {
      setNotificationObj('Login failed', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setNotificationObj('Logout succesfull', 'success')
  }

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const setNotificationObj = function (message, type = 'success') {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  return (
    <div>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      {user == null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          onUsernameChange={setUsername}
          password={password}
          onPasswordChange={setPassword}
        />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in<button onClick={handleLogout}>Logout</button>
          </p>
          <BlogsList blogs={blogs} />
        </div>
      )}
    </div>
  )
}

export default App
