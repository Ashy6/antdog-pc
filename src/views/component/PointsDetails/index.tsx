import { useEffect, useState } from 'react'
import { PointsComponent } from '../PointsComponent'
import './style.scss'

export const PointsDetails = ({ source }: { source: AnyObject }) => {
    const {
        logs // 日志，TODO：2. 如果命名不对按接口返回的字段为主，我理解这里有个打印日志
    } = source

    const [logList, setlogList] = useState([
        '日志1', '日志2', '日志3', '日志4', '日志5', '日志6',
    ])

    /**
     * TODO: 2 详情页中的日志
     * 这里假设 传入的 logs 需要二次处理
     */
    useEffect(() => {
        if (logs) {
            const newLogLists = (logs || []).map(item => item)
            setlogList(newLogLists)
        }
    }, [logs])
    return (
        <>
            <PointsComponent value={source} isDetails></PointsComponent>

            {/* 拿到 log 中的信息遍历出日志列表 */}
            {logList.map((log, i) => {
                return <div key={i}>{log}</div>
            })}
        </>
    )
}
