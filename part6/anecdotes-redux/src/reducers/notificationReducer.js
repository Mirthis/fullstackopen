import { createSlice } from '@reduxjs/toolkit'

const initialState = { text: null, timeOut: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationText(state, action) {
      const { text, timeOut } = action.payload
      if (state.timeOut) clearTimeout(state.timeout)
      return { text, timeOut }
    },
    clearNotification(state, action) {
      return initialState
    },
  },
})

export const setNotification = (text, secs) => {
  return async dispatch => {
    const timeOut = setTimeout(
      () => dispatch(clearNotification('')),
      secs * 1000
    )
    dispatch(setNotificationText({ text, timeOut }))
  }
}

export const { clearNotification, setNotificationText } =
  notificationSlice.actions
export default notificationSlice.reducer
