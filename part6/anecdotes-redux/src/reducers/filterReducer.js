import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload
    },
    removeFilter(state, action) {
      return null
    },
  },
})

export const { setFilter, removeFilter } = filterSlice.actions
export default filterSlice.reducer
