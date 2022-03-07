import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoginForm from './LoginForm'
import { logoutUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginHeader = () => {
  const getUser = state => state.loggedUser
  const user = useSelector(getUser)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    setNotification('Logout succesfull', 'success')
  }

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in<button onClick={handleLogout}>Logout</button>
          </p>
        </>
      )}
    </div>
  )
}

export default LoginHeader
