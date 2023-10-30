export enum OrderStatus {
    // 标识不传，默认展示全部
    /* 正常状态 */
    normal = 11, // 错误数据？用于渲染按钮
    noSubmit = 10,
    submitted = 11, // 已经提交
    /* 争议状态 */
    applyNegotiate = 20, // 申请协商
    /* 仲裁 */
    inArbitration = 30,
    arbitration = 31,    // 仲裁中
    waitingArbitration = 32, // 等待平台仲裁
    /* 结束状态 */
    completed = 40,
    cancel = 41, // 已取消
    finish = 42 // 已结束
}

