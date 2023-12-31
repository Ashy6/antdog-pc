/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Image, Modal, Row, Col, Upload, Input, InputNumber } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { updateSourceStore } from '../../../store/reducers/sourceState'
import { syncUserInfo } from '../../../store/reducers/userState'

import { judgmentOrder, negotiate, releaseOrder } from '../../../api/cards'
import { OrderStatus } from '../../../types/order-status'
import { formatTime } from '../../../utils/time'
import { SelectParamsType } from '../../../types/types';
import icon from '../../../assets/png'

import './style.scss'

const { TextArea } = Input;

const CardsComponent = (props: {
    value: AnyObject
    isDetails?: boolean
}) => {
    const { value, isDetails } = props
    const {
        detailList = [], // 详情
        advCode, //
        amount, // 总金额
        orderNo, // 订单编号
        currency, // 币种
        createTime, // 创建时间
        //updateTime, // 更新时间
        images, // 图片，TODO：1. 如果命名不对按接口返回的字段为主
        seller,      // 售卖人
        rate,        // 汇率
        // cardType,
        buyer, // 买家
        status,
        merchNo, // 商户号
        userId, // 用户
        faceValue // 总面值
    } = value;

    const dispatch = useDispatch()
    const selectValue = useSelector((store: { selectInfo: { value: SelectParamsType } }) => store.selectInfo.value)

    const [loading, setLoading] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [opened, setOpen] = useState(false);
    const [rulingOpened, setRulingOpened] = useState(false);
    const [description, setDescription] = useState('');
    const [rulingDescription, setRulingDescription] = useState('');
    const [points, setNegotiationRate] = useState(0);
    const [rulingRate, setRulingRate] = useState(detailList[0]?.rate);
    const [orderStatus, setOrderStatus] = useState(status || OrderStatus.inTrade);

    useEffect(() => {
        setOrderStatus(status);
    }, [status]);

    useEffect(() => {
        // 包含多组图片的详情
        const imgDetailList = detailList.map(it => ({
            ...it,
            imgArr: it.images.split(',') || []
        }))
        setImageList(imgDetailList)
    }, [detailList])

    const openDetails = () => {
        dispatch(updateSourceStore(value))
    }

    const showModal = () => {
        setOpen(true);
    };

    const showRulingModal = (winner: 'seller' | 'buyer') => {
        setRulingOpened(true);
        setWinner(winner);
    };

    const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
        setLoading(true);
        const response = await negotiate({
            "orderNo": orderNo,
            receiver: seller,
            // "details": [
            //     {
            //         "id": orderId,
            //         "orderNo": orderNo,
            //         "finalFaceValue": negotiationRate || detailList[0]?.rate,
            //         "memo": ""
            //     }
            // ],
            "images": fileList.map(x => x.response?.data).filter(x => Boolean(x)).join(),
            "description": description,
            "points": points
        });
        // 冻结积分数
        if (response.code === 0) {
            setOrderStatus(OrderStatus.inDisputeNegotiate);
            dispatch(syncUserInfo());
            setOpen(false);
            setLoading(false);
        }
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
    };

    const [winner, setWinner] = useState(null);
    const rulingHandleOk = async (e: React.MouseEvent<HTMLElement>) => {
        setLoading(true);
        const response = await judgmentOrder({
            orderNo: orderNo,
            winner: winner === 'buyer' ? userId : merchNo,
            loser: winner === 'buyer' ? merchNo : userId,
            points: points,
            images: fileList.map(x => x.response?.data).filter(x => Boolean(x)).join(),
            description: rulingDescription
        });
        // // 冻结积分数
        if (response.code === 0) {
            dispatch(syncUserInfo());
            setOrderStatus(OrderStatus.inDisputeNegotiate);
            setRulingOpened(false);
            setLoading(false);
        }
    };

    const rulingHandleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setRulingOpened(false);
    };

    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList, file }) => {
        if (file.status === 'uploading') {
            setUploading(true);
        } else {
            setUploading(false);
        }
        setFileList(newFileList);
    };

    const negotiateRateChange = (value: number) => {
        setNegotiationRate(value);
    };

    const rulingRateChange = (value: number) => {
        setRulingRate(value);
    }

    const submitReleaseOrder = async () => {
        const response = await releaseOrder(orderNo);
        if (response.code === 0) {
            setOrderStatus(OrderStatus.completed);
            dispatch(syncUserInfo());
        }
    }

    const modalDescriptions = [
        { key: 1, postfix: 'odd', label: 'Order Number', value: [null, orderNo] },
        { key: 2, postfix: 'even', label: 'Order Time', value: [null, formatTime(createTime)] },
        { key: 3, postfix: 'odd', label: 'Seller', value: [null, seller] },
        { key: 4, postfix: 'even', label: 'Order Amount', span: 3, value: [amount, `USD`] },
        {
            key: 5, postfix: 'odd', label: 'Order Rate', span: 3, value: [
                <InputNumber min={0} max={points} value={points} defaultValue={amount} onChange={negotiateRateChange} />, 'Points'
            ]
        },
        // {
        //     key: 6, postfix: 'even', label: 'Negotiation Rate', span: 3, value: [
        //         <InputNumber min={0} max={detailList[0]?.rate} value={negotiationRate} defaultValue={detailList[0]?.rate} onChange={negotiateRateChange} />, 'Points'
        //     ]
        // },
        {
            key: 7,
            postfix: 'odd',
            isControl: true,
            span: 3,
            label: <>
                <div className='desc-label'>Description</div>
                <div className='uploader-wrapper'>
                    {fileList.length > 0 ? <Image.PreviewGroup
                        items={fileList}
                    >
                        <Image
                            width={80}
                            height={80}
                            src={fileList[0]?.response?.data}
                        />
                    </Image.PreviewGroup>
                        : ''}
                    <Upload
                        name="file"
                        accept="image/*"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        fileList={fileList}
                        action="/api/gcard/web/file/upload"
                        onChange={handleChange}
                    >
                        <div className='upload-btn'>
                            {uploading ? <LoadingOutlined /> : <PlusOutlined />}
                        </div>
                    </Upload>
                </div>
            </>,
            value: [
                <TextArea
                    bordered={false}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please describe the matter in detail and the platform will also question the seller.Combine all the circumstances and make a ruling."
                    autoSize={{ minRows: 5, maxRows: 6 }}
                />
            ]
        },
    ]

    const rulingModalData = [
        { key: 1, postfix: 'odd', label: 'Order Number', value: [null, orderNo] },
        { key: 2, postfix: 'even', label: 'Order Time', value: [null, formatTime(createTime)] },
        { key: 3, postfix: 'odd', label: 'Seller', value: [null, seller] },
        { key: 4, postfix: 'even', label: 'Buyer', value: [null, buyer] },
        { key: 5, postfix: 'odd', label: 'Order Amount', span: 3, value: [amount, `USD`] },
        { key: 6, postfix: 'even', label: 'Order Rate', span: 3, value: [rate, `Points`] },
        { key: 7, postfix: 'odd', label: 'Ruling', span: 3, value: [<InputNumber min={0} max={detailList[0]?.rate} value={rulingRate} defaultValue={detailList[0]?.rate} onChange={rulingRateChange} />, 'Points'] },
        {
            key: 8,
            postfix: 'even',
            isControl: true,
            span: 3,
            label: <>
                <div className='desc-label'>Conclusion</div>
            </>,
            value: [
                <TextArea
                    bordered={false}
                    value={rulingDescription}
                    onChange={(e) => setRulingDescription(e.target.value)}
                    placeholder="Please combine all the circumstances and enter the platform’s ruling conclusion."
                    autoSize={{ minRows: 5, maxRows: 6 }}
                />
            ]
        }
    ];

    const detailClass = `${isDetails ? 'detail-content' : ''}`;
    return (
        <div className='card-item'>
            {/* amount */}
            <div className={`card-item-amount cursor-pointer ${detailClass}`} onClick={openDetails}>
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
            <div className={`card-item-order ${detailClass}`} >
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

            {
                imageList.map((info, index) => {
                    const { imgArr } = info
                    return (isDetails || index === 0) ? (<div className={detailClass} key={`IMG-${index}`}>
                        {/* images */}
                        <div className='card-item-images' >
                            <Image.PreviewGroup>
                                {/* TODO: 这里的样式渲染有问题，考虑每三个一组独立渲染
                                每一组加 detail-content 类名保证不换行展示*/}
                                {imgArr.map((url, i) => (
                                    <Image key={`image-${i}`} width={100} height={120} src={url} />
                                ))}
                                {/* 不满足三个展示空占位 */}
                                {imgArr.length < 3 &&
                                    Array.from({ length: 3 - imgArr.length }, (_, i) => (
                                        <div className='ant-image' key={`empty-${i}`} style={{ height: 120 }}></div>
                                    ))}
                            </Image.PreviewGroup>
                        </div>
                        {/* 图片超过三个显示 */}
                        {imgArr.length > 3 && !isDetails && (
                            <div className='card-item-more'>······</div>
                        )}
                        {/* USD */}
                        <div className='card-item-USD' >
                            <span>999999</span>
                            <span>USD</span>
                            <span>37793555427155729</span>
                            <span>05/31</span>
                            <span>6207</span>
                        </div>
                    </div>) : <></>
                })
            }


            {selectValue.isRuling ? (<div className='card-item-btn'>
                <Button className='antdog-btn' type="primary" onClick={() => showRulingModal('seller')}>
                    Seller Win
                </Button>
                <Button className='antdog-btn' type="primary" onClick={() => showRulingModal('buyer')}>
                    Buyer Win
                </Button>
            </div>) : (<>
                {/* In trade */}
                {orderStatus === OrderStatus.inTrade && <div className='card-item-btn'>
                    <Button className='antdog-btn' type='primary' onClick={showModal}>
                        Negotiate
                    </Button>
                    <Button className='antdog-btn' type='primary' onClick={submitReleaseOrder}>
                        Release
                    </Button>
                </div>}

                {/* In dispute */}
                {[OrderStatus.inDisputeNegotiate].includes(orderStatus) && <div className='card-item-btn short'>
                    <Button className='antdog-btn disabled' type="primary" disabled>
                        In dispute
                    </Button>
                </div>}

                {/* wait */}
                {orderStatus === OrderStatus.inDisputeArbitration && <div className='card-item-btn'>
                    <Button className='antdog-btn disabled' type="primary" disabled>
                        Platform is in arbitration,please wait
                    </Button>
                </div>}

                {/* Completed */}
                {orderStatus === OrderStatus.completed && <div className='card-item-btn short'>
                    <Button className='antdog-btn disabled' type="primary" disabled>
                        Order Completed
                    </Button>
                </div>}
            </>
            )}

            <Modal
                className='negotiate-dialog'
                title="Ruling"
                open={rulingOpened}
                closeIcon={null}
                destroyOnClose={true}
                onCancel={rulingHandleCancel}
                footer={[
                    <Button className='antdog-btn' key="cancel" onClick={rulingHandleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" className='submit-btn' loading={loading} onClick={e => rulingHandleOk(e)}>
                        Confirm
                    </Button>
                ]}
            >
                {
                    rulingModalData.map(item => {
                        return <Row key={item.key} className={`ant-row-${item.postfix}`}>
                            <Col span={10}>{item.label}</Col>
                            {item.value.map((v) => {
                                return <Col key={item.key + '-' + v} span={v === null ? 4 : item.isControl ? 14 : item.span === 3 ? 7 : 10}>{v}</Col>
                            })}
                        </Row>;
                    })
                }
            </Modal>

            <Modal
                className='negotiate-dialog'
                title="Negotiate"
                open={opened}
                closeIcon={null}
                destroyOnClose={true}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button className='antdog-btn' key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" className='submit-btn' loading={loading} onClick={handleOk}>
                        Confirm
                    </Button>
                ]}
            >
                {
                    modalDescriptions.map(item => {
                        return <Row key={item.key} className={`ant-row-${item.postfix}`}>
                            <Col span={10}>{item.label}</Col>
                            {item.value.map((v) => {
                                return <Col key={item.key + '-' + v} span={v === null ? 4 : item.isControl ? 14 : item.span === 3 ? 7 : 10}>{v}</Col>
                            })}
                        </Row>;
                    })
                }
            </Modal>
        </div >
    )
}

export default CardsComponent
