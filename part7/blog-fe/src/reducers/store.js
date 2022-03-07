import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blogReducer'
import notificationReducer from './notificationReducer'
import userReducer from './loginReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
  },
})

export default store
