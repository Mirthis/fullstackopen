import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blogReducer'
import notificationReducer from './notificationReducer'
import loginReducer from './loginReducer'
import userReducer from './userReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    loggedUser: loginReducer,
    users: userReducer,
  },
})

export default store
