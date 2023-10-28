export enum OrderStatus {
    /* 正常状态 */
    normal = 0, // 错误数据？用于渲染按钮
    noSubmit = 10,
    submitted = 11, // 已经提交
    waitingSettle = 12, // 待结算
    /* 争议状态 */
    inNegotiating = 20, // 协商中
    applyNegotiate = 21, // 申请协商
    agreeNegotiate = 22, // 同意协商
    disagreeNegotiate = 23, // 不同意协商
    /* 仲裁 */
    inArbitration = 30,
    arbitration = 31,    // 仲裁中
    waitingArbitration = 32, // 等待平台仲裁
    /* 结束状态 */
    completed = 40,
    cancel = 41, // 已取消
    finish = 42 // 已结束
}

