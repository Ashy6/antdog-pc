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
    orderNo: '',
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
      state.value.params.orderNo = action.payload
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

      // TODO：后期配置映射关系处理此段屎中屎
      if (action.payload.menuKey === SidebarMenuType.Cards) {
        switch (action.payload.subMenuKey) {
          case SidebarSubMenuType.InTrade: // 进行中
            state.value.params.status = [OrderStatus.inTrade]
            break

          case SidebarSubMenuType.InDispute: // 争议
            state.value.params.status = [
              OrderStatus.inDisputeNegotiate,
              OrderStatus.inDisputeArbitration
            ]
            break

          case SidebarSubMenuType.Completed: // 完成
            // Card 属于完成 40
            state.value.params.status = [OrderStatus.completed]
            break

          case SidebarSubMenuType.Cancelled: // 取消 41
            state.value.params.status = [OrderStatus.cancelled]
            break

          default: // 未选择任何  SidebarSubMenuType.none
            state.value.params.status = null
            break
        }
      } else if (action.payload.menuKey === SidebarMenuType.Points) {
        // 更新 Points status
        switch (action.payload.subMenuKey) {
          case SidebarSubMenuType.InTrade: // 进行中
            state.value.params.status = [
              OrderStatus.inTrade,
              OrderStatus.inTradeProcessing
            ]
            break

          case SidebarSubMenuType.InDispute: // 争议
            state.value.params.status = [
              OrderStatus.inDisputeNegotiate,
              OrderStatus.inDisputeArbitration
            ]
            break

          case SidebarSubMenuType.Completed: // 完成
            // Points 属于已结束 42
            state.value.params.status = [OrderStatus.completed]
            break

          case SidebarSubMenuType.Cancelled: // 取消 41
            state.value.params.status = [OrderStatus.cancelled]
            break

          default: // 未选择任何  SidebarSubMenuType.none
            state.value.params.status = null
            break
        }
      }
      if (action.payload.isRuling) {
        state.value.params.status = [OrderStatus.inDisputeArbitration]
      }
    }
  }
})

export const { updateOrderNO, updateSelect } = selectStateSlice.actions
export default selectStateSlice.reducer
