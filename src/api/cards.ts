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
export const getOrderDetails = (orderNo: string): Promise<string> => {
  return instance({
    url: `${VITE_CONFIG}/order/detail`,
    method: 'get',
    params: { orderNo }
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
 * 仲裁订单
 * 商户获胜 winner 为商户号 loser 为用户id
 * 用户获胜 winner 为用户id loser 为商户号
 */
export const judgmentOrder = (data: {
  orderNo: string,
  winner: string,
  loser: string,
  images?: string,
  description?: string,
  points: number
}): Promise<RequestDate> => {
  return instance({
    url: `${VITE_CONFIG}/order/judgment`,
    method: 'post',
    data: data
  });
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
