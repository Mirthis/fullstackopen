import { configureStore } from '@reduxjs/toolkit'
import anectdoteReducer from './anecdoteReducer'
import filterReducer from './filterReducer'
import notificationReducer from './notificationReducer'

const store = configureStore({
  reducer: {
    anectdotes: anectdoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
  },
})

export default store
