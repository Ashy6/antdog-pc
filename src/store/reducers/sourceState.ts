import { createSlice } from '@reduxjs/toolkit'

const sourceStateSlice = createSlice({
  name: 'sourceState',
  initialState: { value: null },
  reducers: {
    updateSourceStore: (state, action) => {
      state.value = action.payload
    },
    clearSourceStore: state => {
      state.value = null
    }
  }
})

export const { updateSourceStore, clearSourceStore } = sourceStateSlice.actions
export default sourceStateSlice.reducer
