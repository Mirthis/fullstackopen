import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'

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
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} id="login-form">
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-submit" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
