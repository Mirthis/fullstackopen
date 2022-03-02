import { configureStore } from '@reduxjs/toolkit'
import anectdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'

const store = configureStore({
  reducer: {
    anectdotes: anectdoteReducer,
    notification: notificationReducer,
  },
})

export default store
