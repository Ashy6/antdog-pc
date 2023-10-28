import { useEffect, useState } from 'react'
import CardsComponent from '../CardsComponent'
import './style.scss'

const CardsDetails = ({ source }: { source: AnyObject }) => {
    const {
        logs // 日志，TODO：3. 如果命名不对按接口返回的字段为主，我理解这里有个打印日志
    } = source

    const [logList, setlogList] = useState([
        1,2,3,4,5,6,7,8,9,0,0,2,3,454,5,4,6565,76,76,87
    ])

    /**
     * TODO: 3 详情页中的日志
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
            <CardsComponent value={source} isDetails></CardsComponent>

            {/* 拿到 log 中的信息遍历出日志列表 */}
            {logList.map((log, i) => {
                return <div key={i}>{log}</div>
            })}
        </>
    )
}

export default CardsDetails