import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import './index.css'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { initializeUser, logoutUser } from './reducers/loginReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const getUser = state => state.user

  const user = useSelector(getUser)

  const handleLogout = () => {
    dispatch(logoutUser())
    setNotification('Logout succesfull', 'success')
  }

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in<button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <CreateBlogForm formRef={blogFormRef} />
          </Togglable>
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App
