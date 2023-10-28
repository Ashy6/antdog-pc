import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'

const userStateSlice = createSlice({
  name: 'sourceState',
  initialState: {
    value: {
      mail: '',
      merchName: '',
      merchNo: '',
      points: 100,
      phone: '',
      token: ''
    }
  },
  reducers: {
    updateUserStore: (state, action) => {
      state.value = { ...state.value, ...action.payload }
    },
    // 处理冻结积分逻辑
    freezeUserPoints: (state, action) => {
      if (state.value.points > 0 && state.value.points - action.payload > 0) {
        state.value.points -= action.payload
      } else {
        message.warning({ content: 'Insufficient points balance.' })
      }
    }
  }
})

export const { updateUserStore, freezeUserPoints } = userStateSlice.actions
export default userStateSlice.reducer
