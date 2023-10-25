/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { Button, Image } from 'antd'
import { useDispatch } from 'react-redux'
import { updateSourceStore } from '../../../store/reducers/sourceState'

import icon from '../../../assets/png'
import './style.scss'

export const CardsComponent = (props: {
    value: AnyObject
    isDetails?: boolean
}) => {
    const { value, isDetails } = props
    const {
        detailList, // 详情
        advCode, //
        amount, // 总金额
        orderNo, // 订单编号
        currency, // 币种
        createTime, // 创建时间
        updateTime, // 更新时间
        images, // 图片，TODO：1. 如果命名不对按接口返回的字段为主
    } = value

    const dispatch = useDispatch()

    const [img, setImg] = useState([
        'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
        'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
        'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
        'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
        'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp'
    ])

    /**
     * TODO: 1 渲染图片
     * 这里假设 传入的 images 需要二次处理，用这个 effect 来监听，然后处理后 set 到 img 里
     * 这里详情页和卡片都用到了当前组件，在详情页中图片的展示没能平铺下去，不用管。
     */
    useEffect(() => {
        const newImages = (images || []).map(item => item)
        setImg(newImages)
    }, [images]);

    const openDetails = () => {
        dispatch(updateSourceStore(value))
    }

    const formatTime = (createTime: string) => {
        if (!createTime) return ''
        const date = new Date(createTime)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`
        return formattedDate
    }

    const componentClass = `card-item ${isDetails && 'detail-content'}`
    return (
        <div className={componentClass}>
            {/* amount */}
            <div className='card-item-amount cursor-pointer' onClick={openDetails}>
                <img className='card-item-icon left' src={icon.steam} alt='' />
                <div className='amount'>
                    <label className='amount-title'>{advCode}</label>
                    <div className='amount-line'>
                        <span>Amount</span>
                        <span>{amount}</span>
                        <span>{currency}USD</span>
                    </div>
                    <div className='amount-line'>
                        <span>Rate</span>
                        <span>9999999</span>
                        <span>Points</span>
                    </div>
                </div>
            </div>

            {/* order info */}
            <div className='card-item-order'>
                <div className='card-item-order-info'>
                    <span>Order Number</span>
                    <span>{orderNo}</span>
                </div>
                <div className='card-item-order-info'>
                    <span>Order Time</span>
                    <span>{formatTime(createTime)}</span>
                </div>
                <div className='card-item-order-info'>
                    <span>Time Limit</span>
                    <span>300 mins</span>
                </div>
            </div>

            {/* images */}
            <div className='card-item-images'>
                <Image.PreviewGroup
                    preview={{
                        onChange: (current, prev) =>
                            console.log(`current index: ${current}, prev index: ${prev}`)
                    }}
                >
                    {/* TODO: 这里的样式渲染有问题，考虑每三个一组独立渲染
                    每一组加 detail-content 类名保证不换行展示*/}
                    {img.slice(0, isDetails ? img.length : 3).map((img, i) => (
                        <Image key={i} width={100} height={120} src={img} />
                    ))}
                    {/* 不满足三个展示空占位 */}
                    {img.length < 3 &&
                        Array.from({ length: 3 - img.length }, (_, i) => (
                            <div className='ant-image' key={`empty-${i}`}></div>
                        ))}
                </Image.PreviewGroup>
            </div>

            {/* USD */}
            <div className='card-item-USD'>
                <span>999999</span>
                <span>USD</span>
                <span>37793555427155729</span>
                <span>05/31</span>
                <span>6207</span>
            </div>

            {/* 图片超过三个显示 */}
            {img.length > 3 && !isDetails && (
                <div className='card-item-more'>······</div>
            )}

            {/* In trade */}
            <div className='card-item-btn'>
                <Button className='antdog-btn' type='primary'>
                    Negotiate
                </Button>
                <Button className='antdog-btn' type='primary'>
                    Release
                </Button>
            </div>

            {/* In dispute */}
            {/* <div className='card-item-btn short'>
                <Button className='antdog-btn disabled' type="primary" disabled>
                    In dispute
                </Button>
            </div> */}

            {/* wait */}
            {/* <div className='card-item-btn'>
                <Button className='antdog-btn disabled' type="primary" disabled>
                    Platform is in arbitration,please wait
                </Button>
            </div> */}

            {/* Completed */}
            {/* <div className='card-item-btn short'>
                <Button className='antdog-btn disabled' type="primary" disabled>
                    Order Completed
                </Button>
            </div> */}
        </div>
    )
}
