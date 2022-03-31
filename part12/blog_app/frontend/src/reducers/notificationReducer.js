import { createSlice } from '@reduxjs/toolkit'
import config from '../config.json'

const initialState = { text: null, type: null, timeOut: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationText(state, action) {
      const { text, type, timeOut } = action.payload
      if (state.timeOut) clearTimeout(state.timeOut)
      return { text, type, timeOut }
    },
    clearNotification() {
      return initialState
    },
  },
})

export const setNotification = (
  text,
  type,
  secs = config.NOTIFICATION_SEC_TIMEOUT
) => {
  return async dispatch => {
    const timeOut = setTimeout(
      () => dispatch(clearNotification('')),
      secs * 1000
    )
    dispatch(setNotificationText({ text, type, timeOut }))
  }
}

export const { clearNotification, setNotificationText } =
  notificationSlice.actions
export default notificationSlice.reducer
