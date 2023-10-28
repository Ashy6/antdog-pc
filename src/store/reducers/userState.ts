import { createSlice } from '@reduxjs/toolkit'

const userStateSlice = createSlice({
  name: 'sourceState',
  initialState: {
    value: {
      mail: '',
      merchName: '',
      merchNo: '',
      points: 0,
      phone: '',
      token: ''
    }
  },
  reducers: {
    updateUserStore: (state, action) => {
      state.value = { ...state.value, ...action.payload }
    }
  }
})

export const { updateUserStore } = userStateSlice.actions
export default userStateSlice.reducer
