import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import { getSelectBalance } from '../../api/login'

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
    },
    syncUserInfo: (state) => {
      getSelectBalance().then((res) => {
        state.value = res.data as any;
      });
    }
  }
})

export const { updateUserStore, freezeUserPoints, syncUserInfo } = userStateSlice.actions
export default userStateSlice.reducer
