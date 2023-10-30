import { useEffect, useState } from 'react'
import CardsComponent from '../CardsComponent'
import { getOrderDetails } from '../../../api/cards'
import './style.scss'

const CardsDetails = ({ source }: {
    source: {
        orderNo: string
        detailList: AnyObject[]
    }
}) => {
    const {
        orderNo,
        detailList, // 详情
    } = source

    const [logList, setlogList] = useState(detailList || [])

    /**
     * TODO: 3 详情页中的日志
     * 这里假设 传入的 detailList 需要二次处理
     */
    useEffect(() => {
        console.log('cards:source', source);
        getOrderDetails(orderNo).then(res => {
            console.log('res', res);
        })

        if (detailList && detailList.length) {
            const newLogLists = (detailList).map(item => item)
            setlogList(newLogLists)
        }
    }, [detailList])
    return (
        <>
            <CardsComponent value={source} isDetails></CardsComponent>

            {/* 拿到 log 中的信息遍历出日志列表 */}
            {logList.map((log, i) => {
                return <div key={i}>{ }</div>
            })}
        </>
    )
}

export default CardsDetails