import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import Button from '@mui/material/Button'
import LoginIcon from '@mui/icons-material/Login'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import { TextField } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async event => {
    try {
      event.preventDefault()
      const userData = { username, password }
      dispatch(loginUser(userData))
      setUsername('')
      setPassword('')
      setNotification('Login succesfull', 'success')
    } catch (err) {
      setNotification('Login failed.', 'success')
      console.log(err)
    }
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom component="div">
        Log in to application
      </Typography>
      <Box
        id="login-form"
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <div>
          <TextField
            type="text"
            value={username}
            label="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            type="password"
            value={password}
            label="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button
          id="login-submit"
          variant="contained"
          type="submit"
          endIcon={<LoginIcon />}
          sx={{ ml: 5 }}
        >
          Login
        </Button>
      </Box>
    </div>
  )
}

export default LoginForm
