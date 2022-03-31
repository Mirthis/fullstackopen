import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const initializeUsers = () => {
  return async dispatch => {
    const blogs = await userService.getAll()
    dispatch(setUsers(blogs))
  }
}

export default userSlice.reducer
export const { setUsers } = userSlice.actions
