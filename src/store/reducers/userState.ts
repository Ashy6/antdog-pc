import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'

/**
 * 存储用（商）户信息的 store
 */
const userStateSlice = createSlice({
  name: 'userStore',
  initialState: {
    value: {
      tenantId: '',
      walletNo: '',
      balance: 0,
    }
  },
  reducers: {
    // 更新积分 store
    updateUserStore: (state, action) => {
      state.value = { ...state.value, ...action.payload }
    },
    // 处理冻结积分逻辑
    freezeUserPoints: (state, action) => {
      if (state.value.balance > 0 && state.value.balance - action.payload > 0) {
        state.value.balance -= action.payload
      } else {
        message.warning({ content: 'Insufficient points balance.' })
      }
    }
  }
})

export const { updateUserStore, freezeUserPoints } = userStateSlice.actions
export default userStateSlice.reducer
