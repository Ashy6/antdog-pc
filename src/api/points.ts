import { RequestDate, VITE_CONFIG, instance } from './utils'


/**
 * 积分订单列表
 */
export interface OrderPage {
    orderNO?: string // 订单号
    status?: number // 状态
    subStatus?: number // 子状态
    orderType?: string // 订单类型
    page?: number // 页码
    pageSize?: number // 条数
}
export const getPointsOrderPage = (options: OrderPage): Promise<RequestDate> => {
    return instance({
        url: `${VITE_CONFIG}/points/page`,
        method: 'post',
        data: options
    })
}


/**
 * 商家支付积分订单
 */
export interface paidOrderParams {
    orderNo?: string
    images?: string
    memo?: string
}
export const paidPointsOrder = (options: paidOrderParams): Promise<RequestDate> => {
    return instance({
        url: `${VITE_CONFIG}/points/paid`,
        method: 'post',
        data: options
    })
}

/**
 * 商家取消积分订单
 */
export const cancelPointsOrder = (orderNo: string): Promise<RequestDate> => {
    return instance({
        url: `${VITE_CONFIG}/points/cancel`,
        method: 'get',
        data: orderNo
    })
}