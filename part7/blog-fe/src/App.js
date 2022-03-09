import { useEffect } from 'react'
import Notification from './components/Notification'
import './index.css'
import CreateBlogForm from './components/CreateBlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { initializeLoggedUser } from './reducers/loginReducer'
import { Routes, Route } from 'react-router-dom'
import UsersList from './components/UsersList'
import UserDetails from './components/User'
import { initializeUsers } from './reducers/userReducer'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Navigation from './components/Navigation'
import Container from '@mui/material/Container'
import { Stack } from '@mui/material'
import Typography from '@mui/material/Typography'

const App = () => {
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
  const getBlogs = state => state.blogs
  const blogs = useSelector(getBlogs)

  const Home = () => {
    return (
      <>
        {loggedUser ? (
          <div>
            <Stack direction="row" spacing={10}>
              <Typography variant="h3" gutterBottom component="div">
                Blogs
              </Typography>
              <CreateBlogForm />
            </Stack>
            <BlogList blogs={blogs} />
          </div>
        ) : (
          <LoginForm />
        )}
      </>
    )
  }

  return (
    <Container>
      <Navigation />
      <Notification />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Container>
  )
}

export default App
