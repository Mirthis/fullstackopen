import { useState } from 'react'
import { commentBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { TextField, Box } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import { Button } from '@mui/material'

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
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={createCommentSubmit}
      >
        <TextField
          type="text"
          value={text}
          label="Comment"
          onChange={({ target }) => setText(target.value)}
          placeholder="Comment Text"
        />
        <Button
          id="create-blog-submit"
          variant="contained"
          type="submit"
          endIcon={<CreateIcon />}
          sx={{ mt: 2 }}
        >
          Add comment
        </Button>
      </Box>
    </div>
  )
}

export default CreateCommentForm
