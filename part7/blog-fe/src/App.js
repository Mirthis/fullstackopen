import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import './index.css'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { initializeLoggedUser } from './reducers/loginReducer'
import LoginHeader from './components/LoginHeader'
import { Routes, Route } from 'react-router-dom'
import UsersList from './components/UsersList'
import UserDetails from './components/User'
import { initializeUsers } from './reducers/userReducer'
import Blog from './components/Blog'

const App = () => {
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeLoggedUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const getUser = state => state.loggedUser
  const loggedUser = useSelector(getUser)

  const Home = () => {
    return (
      <>
        {loggedUser && (
          <div>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <CreateBlogForm formRef={blogFormRef} />
            </Togglable>
            <BlogList />
          </div>
        )}
      </>
    )
  }

  return (
    <div>
      <Notification />
      <LoginHeader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App
