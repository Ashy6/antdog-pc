import { createSlice } from '@reduxjs/toolkit'
import {
  SelectParamsType,
  SidebarMenuType,
  SidebarSubMenuType
} from '../../types/types'
import { OrderStatus } from '../../types/order-status'

const initialState: SelectParamsType = {
  menuKey: SidebarMenuType.Cards,
  subMenuKey: SidebarSubMenuType.none,
  isRuling: false,
  params: {
    orderNO: '',
    status: null,
    subStatus: null
  }
}

/**
 * 用户交互 Sidebar 与 Container 区域的数据传值
 */
const selectStateSlice = createSlice({
  name: 'selectStore',
  initialState: { value: initialState },
  reducers: {
    updateOrderNO: (state, action) => {
      state.value.params.orderNO = action.payload
    },
    updateSelect: (
      state,
      action: {
        payload: {
          menuKey: SidebarMenuType
          subMenuKey: SidebarSubMenuType | SidebarMenuType
          isRuling: boolean
        }
      }
    ) => {
      state.value.menuKey = action.payload.menuKey
      state.value.subMenuKey = action.payload.subMenuKey
      state.value.isRuling = action.payload.isRuling

      // TODO：
      if (action.payload.menuKey === SidebarMenuType.Cards) {
        switch (action.payload.subMenuKey) {
          case SidebarSubMenuType.InTrade: // 进行中
            state.value.params.status = OrderStatus.noSubmit
            break

          case SidebarSubMenuType.InDispute: // 争议
            // Card 属于协商  20 inNegotiating
            // 30 inArbitration
            // 等待平台仲裁  32 waitingArbitration
            // 这里能查的只有申请协商  21  applyNegotiate 和 32 waitingArbitration
            state.value.params.status = OrderStatus.applyNegotiate
            break

          case SidebarSubMenuType.Completed: // 完成
            // Card 属于完成 40
            state.value.params.status = OrderStatus.completed
            break

          case SidebarSubMenuType.Cancelled: // 取消 41
            state.value.params.status = OrderStatus.cancel
            break

          default: // 未选择任何  SidebarSubMenuType.none
            state.value.params.status = null
            break
        }
      } else if (action.payload.menuKey === SidebarMenuType.Points) {
        // 更新 Points status
        switch (action.payload.subMenuKey) {
          case SidebarSubMenuType.InTrade: // 进行中
            state.value.params.status = OrderStatus.normal
            break

          case SidebarSubMenuType.InDispute: // 争议
            // Points 属于协商
            state.value.params.status = OrderStatus.inArbitration
            break

          case SidebarSubMenuType.Completed: // 完成
            // Points 属于已结束 42
            state.value.params.status = OrderStatus.finish
            break

          case SidebarSubMenuType.Cancelled: // 取消 41
            state.value.params.status = OrderStatus.cancel
            break

          default: // 未选择任何  SidebarSubMenuType.none
            state.value.params.status = null
            break
        }
      } else if (action.payload.menuKey === SidebarMenuType.Ruling) {
        state.value = initialState
        return
      }
      // TODO：subStatus 暂时未用于接口参数
      // state.value.params.subStatus = action.payload
      // console.log('action.payload.2222', state.value)
    }
  }
})

export const { updateOrderNO, updateSelect } = selectStateSlice.actions
export default selectStateSlice.reducer
