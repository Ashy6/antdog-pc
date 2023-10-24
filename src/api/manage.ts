import { RequestDate, VITE_CONFIG, instance } from './utils'

export interface OrderPage {
  orderNO?: string // 订单号
  status?: number // 状态
  subStatus?: number // 子状态
  orderType?: string // 订单类型
  page?: number // 页码
  pageSize?: number // 条数
}

// 获取订单列表
export const getOrderPage = (options: OrderPage): Promise<RequestDate> => {
  return instance({
    url: `${VITE_CONFIG}/order/page`,
    method: 'post',
    data: options
  })
}
