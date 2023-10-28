import { useEffect, useState } from 'react'
import PointsComponent from '../PointsComponent'
import './style.scss'

const PointsDetails = ({ source }: { source: AnyObject }) => {
    const {
        detailList // 日志，TODO：2. 如果命名不对按接口返回的字段为主，我理解这里有个打印日志
    } = source

    const [logList, setlogList] = useState(detailList || [])

    /**
     * TODO: 2 详情页中的日志
     * 这里假设 传入的 logs 需要二次处理
     */
    useEffect(() => {
        console.log('detailList', detailList);
        
        if (detailList) {
            const newLogLists = (detailList || []).map(item => item)
            setlogList(newLogLists)
        }
    }, [detailList])
    return (
        <>
            <PointsComponent value={source} isDetails></PointsComponent>

            {/* 拿到 log 中的信息遍历出日志列表 */}
            {logList.map((log, i) => {
                return <div key={i}>{}</div>
            })}
        </>
    )
}

export default PointsDetails
