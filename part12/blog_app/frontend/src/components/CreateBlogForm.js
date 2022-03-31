import { useState, useEffect } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import { Stack, TextField, Box } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import AddIcon from '@mui/icons-material/Add'

const CreateBlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

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
      toggleVisibility()
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
      <div style={hideWhenVisible}>
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={toggleVisibility}
          sx={{ mt: 2 }}
        >
          Create Blog
        </Button>
      </div>
      <div style={showWhenVisible}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '50ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={createBlogSubmit}
        >
          <div>
            <TextField
              type="text"
              label="Title"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
              placeholder="blog title"
            />
          </div>
          <div>
            <TextField
              type="text"
              label="Author"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
              placeholder="blog author"
            />
          </div>
          <div>
            <TextField
              type="text"
              value={url}
              label="Url"
              name="url"
              onChange={({ target }) => setUrl(target.value)}
              placeholder="blog url"
            />
          </div>
          <Stack direction="row" spacing={5} sx={{ px: 10 }}>
            <Button
              id="create-blog-submit"
              variant="contained"
              type="submit"
              endIcon={<CreateIcon />}
            >
              Create
            </Button>
            <Button
              variant="outlined"
              onClick={toggleVisibility}
              startIcon={<DeleteIcon />}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </div>
    </div>
  )
}

export default CreateBlogForm
