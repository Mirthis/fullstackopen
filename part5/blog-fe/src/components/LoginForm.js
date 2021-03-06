import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ loginHandler }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    const userData = { username, password }
    const result = await loginHandler(userData)
    if (result) {
      setUsername('')
      setPassword('')
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

LoginForm.propTypes = {
  loginHandler: PropTypes.func.isRequired,
}

export default LoginForm
