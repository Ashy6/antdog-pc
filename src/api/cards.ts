import { RequestDate, VITE_CONFIG, instance } from './utils'

export interface OrderPage {
  orderNo?: string // 订单号
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

/**
 * 订单详情
 */
export const orderDetail = (orderNo: string): Promise<string> => {
  return instance({
    url: `${VITE_CONFIG}/order/detail?orderNo=${orderNo}`,
    method: 'get'
  })
}

/**
 * 释放订单
 */
export const releaseOrder = (orderNo: string): Promise<RequestDate> => {
  return instance({
    url: `${VITE_CONFIG}/order/release?orderNo=${orderNo}`,
    method: 'get'
  })
}

/**
 * 商家申请协商
 * @param options
 */
export interface NegotiateParams {
  orderNo?: string
  images?: string
  description?: string
  receiver?: string
  points?: number
}
export const negotiate = (options: NegotiateParams): Promise<RequestDate> => {
  return instance({
    url: `${VITE_CONFIG}/order/negotiate?receiver=${options.receiver}`,
    method: 'post',
    data: options
  })
}
