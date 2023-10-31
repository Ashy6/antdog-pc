export enum OrderStatus {
    /* 正常状态 */
    inTrade = 11,
    /* 正常状态 待结算 */
    inTradeProcessing = 12,
    /* 争议状态 申请协商 */
    inDisputeNegotiate = 20,
    /* 争议状态 仲裁 ruling */
    inDisputeArbitration = 30,
    waitingArbitration = 32, // 等待平台仲裁（暂未启用）
    /* 结束状态 完成 */
    completed = 42,
    /* 结束状态 取消 */
    cancelled = 41,
}

