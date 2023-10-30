import { useEffect, useState } from 'react'
import PointsComponent from '../PointsComponent'
import { getPointsDetails } from '../../../api/points'
import './style.scss'

const PointsDetails = ({ source }: { orderNo: string, source: AnyObject }) => {
    const {
        orderNo,
        detailList, // 详情
    } = source

    const [logList, setlogList] = useState(detailList || [])

    /**
     * TODO: 2 详情页中的日志
     * 这里假设 传入的 logs 需要二次处理
     */
    useEffect(() => {
        console.log('detailList', detailList);
        getPointsDetails(orderNo).then(res => {
            console.log('res', res);
        })

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
                return <div key={i}>{ }</div>
            })}
        </>
    )
}

export default PointsDetails
