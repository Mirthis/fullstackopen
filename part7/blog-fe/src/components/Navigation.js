import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const Navigation = () => {
  const getLoggedUser = state => state.loggedUser
  const loggedUser = useSelector(getLoggedUser)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    setNotification('Logout succesfull', 'success')
  }
  const padding = {
    padding: 5,
  }

  return (
    <div>
      <Link style={padding} to="/">
        Home
      </Link>
      <Link style={padding} to="/users">
        User
      </Link>
      {loggedUser && (
        <span>
          {loggedUser.name} logged in
          <button onClick={handleLogout}>Logout</button>
        </span>
      )}
    </div>
  )
}

export default Navigation
