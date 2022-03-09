import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { AppBar, Toolbar, IconButton, Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

const Navigation = () => {
  const getLoggedUser = state => state.loggedUser
  const loggedUser = useSelector(getLoggedUser)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    setNotification('Logout succesfull', 'success')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <div style={{ flex: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
        </div>
        <div>
          {loggedUser && (
            <span>
              <em>{loggedUser.name}</em> logged in
              <Button color="inherit" sx={{ mx: 1 }} onClick={handleLogout}>
                Logout
                <LogoutIcon sx={{ mx: 1 }} />
              </Button>
            </span>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}
// <div>
//   <Link style={padding} to="/">
//     Home
//   </Link>
//   <Link style={padding} to="/users">
//     User
//   </Link>
//   {loggedUser && (
//     <span>
//       {loggedUser.name} logged in
//       <button onClick={handleLogout}>Logout</button>
//     </span>
//   )}
// </div>
export default Navigation
