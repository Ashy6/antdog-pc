import { useEffect, useState } from 'react'
import { Image } from 'antd'
import CardsComponent from '../CardsComponent'
import { getOrderDetails } from '../../../api/cards'
import { convertTimeString, getImageList } from '../../../utils/fun'

const CardsDetails = (props: AnyObject) => {
    const { source } = props
    const { orderNo } = source

    const [logList, setlogList] = useState([])

    useEffect(() => {
        setlogList([])
        getOrderDetails(orderNo).then((res: any) => {
            setlogList(
                (res?.data?.statusRecordList || []).map(
                    ({ afterStatusDesc, createTime, memo, images }) => {
                        const { date, time } = convertTimeString(createTime)
                        return {
                            label: afterStatusDesc,
                            date,
                            time,
                            desc: memo,
                            imageList: getImageList(images || '')
                        }
                    }
                )
            )
        })
    }, [orderNo])

    return (
        <>
            <CardsComponent value={source} isDetails></CardsComponent>

            {logList.map(({ label, date, time, desc, imageList }, i) => {
                return (
                    <div key={i} className='detail-content'>
                        <div className='detail-info'>
                            <div className='label'>{label}</div>
                            <div>
                                <p>{date}</p>
                                <p>{time}</p>
                            </div>
                        </div>
                        <div className='detail-desc'>
                            <label htmlFor=''>Description：</label>
                            <br />
                            <span>{desc}</span>
                            <br />
                            <div className='images'>
                                {imageList?.length && (
                                    <Image.PreviewGroup>
                                        {imageList.map(url => (
                                            <Image width={110} height={140} src={url} />
                                        ))}
                                        {/* 不满足三个展示空占位 */}
                                        {imageList.length < 3 &&
                                            Array.from({ length: 3 - imageList.length }, (_, i) => (
                                                <div
                                                    className='ant-image'
                                                    key={`empty-${i}`}
                                                    style={{ width: 110, height: 140 }}
                                                ></div>
                                            ))}
                                    </Image.PreviewGroup>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default CardsDetails
