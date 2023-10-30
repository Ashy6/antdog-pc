import { OrderStatus } from "./order-status"

/**
 * Sidebar 传参相关类型
 */
export type MenuType = 'menu' | 'submenu'
export interface Menu {
  key: SidebarMenuType
  label: string
  type: MenuType
  children: SubMenu[]
}

export interface SubMenu {
  key: SidebarSubMenuType | SidebarMenuType
  label: string
  type: MenuType
  parentId: string
}

export enum SidebarMenuType {
  Cards = 'cards',
  Points = 'points',
  Ruling = 'ruling'
}

export enum SidebarSubMenuType {
  InTrade = 'in-trade', // 进行中
  InDispute = 'in-dispute', // 争议
  Completed = 'completed', // 完成
  Cancelled = 'cancelled', // 取消
  none = '' // 未选择任何
}

export interface ActiveSidebar {
  menuKey: SidebarMenuType
  subMenuKey: SidebarMenuType | SidebarSubMenuType
  isRuling: boolean
}

export interface SelectParamsType extends ActiveSidebar {
  params: {
    orderNo: string // 搜索过滤条件
    status?: OrderStatus[] // 由 subMenu 控制
    subStatus?: number
  }
}