export enum OrderStatus {
    /* 正常状态 */
    inTrade = 11,
    /* 正常状态 待结算 */
    inTradeProcessing = 12,
    /* 争议状态 申请协商 */
    inDisputeNegotiate = 20,
    /* 争议状态 仲裁 */
    inDisputeArbitration = 30,
    // waitingArbitration = 32, // 等待平台仲裁
    /* 结束状态 完成 */
    completed = 42,
    /* 结束状态 取消 */
    cancelled = 41,
    /* ruling */
    // finish = 30 // 已结束
}

