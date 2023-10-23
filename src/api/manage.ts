import { AxiosResponse, VITE_CONFIG, instance } from './utils'

export interface OrderPage {
  orderNO?: string // 订单号
  status?: number // 状态
  subStatus?: number // 子状态
  orderType?: string // 订单类型
  page?: number // 页码
  pageSize?: number // 条数
}

export const getOrderPage = (options: OrderPage): Promise<AxiosResponse> => {
  return instance({
    url: `${VITE_CONFIG}/order/page`,
    method: 'post',
    data: options
  })
}
