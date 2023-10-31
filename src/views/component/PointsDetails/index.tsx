import { useEffect, useState } from 'react'
import { Image } from 'antd'
import { getPointsDetails } from '../../../api/points'
import PointsComponent from '../PointsComponent'
import { convertTimeString, getImageList } from '../../../utils/fun'

const PointsDetails = ({ source }: { orderNo: string; source: AnyObject }) => {
    const { orderNo } = source

    const [logList, setlogList] = useState([])

    useEffect(() => {
        setlogList([])
        getPointsDetails(orderNo).then((res: any) => {
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
            <PointsComponent value={source} isDetails></PointsComponent>

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
                            <Image.PreviewGroup>
                                {imageList.map(url => (
                                    <Image width={80} height={120} src={url} />
                                ))}
                            </Image.PreviewGroup>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default PointsDetails
