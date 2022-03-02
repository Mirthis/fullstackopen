import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotificationText(state, action) {
      console.log(action.payload)
      return action.payload
    },
    clearNotification(state, action) {
      return null
    },
  },
})

export const setNotification = (text, secs) => {
  return async dispatch => {
    console.log(text)
    dispatch(setNotificationText(text))
    setTimeout(() => dispatch(clearNotification('')), secs * 1000)
  }
}

export const { clearNotification, setNotificationText } =
  notificationSlice.actions
export default notificationSlice.reducer
