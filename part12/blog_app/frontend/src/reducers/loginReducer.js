import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'userLogin',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      window.localStorage.removeItem('loggedUser')
      blogService.setToken(null)
      return null
    },
  },
})

export const initializeLoggedUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const loginUser = userData => {
  return async dispatch => {
    const user = await loginService.login(userData)
    dispatch(setUser(user))
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    return true
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    dispatch(clearUser())
  }
}

export default userSlice.reducer
export const { setUser, clearUser } = userSlice.actions
