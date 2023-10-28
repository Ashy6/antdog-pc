import { createSlice } from '@reduxjs/toolkit'

/**
 * 详情页展展示 的 示例信息
 */
const sourceStateSlice = createSlice({
  name: 'sourceStore',
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
