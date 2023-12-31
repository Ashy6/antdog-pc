/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Modal, Row, Upload, UploadFile, Image, UploadProps, InputNumber } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

import { cancelPointsOrder, judgmentPoints, paidPointsOrder } from '../../../api/points';
import { updateSourceStore } from '../../../store/reducers/sourceState'
import { syncUserInfo } from '../../../store/reducers/userState';
import { OrderStatus } from '../../../types/order-status';
import { formatTime } from '../../../utils/time';
import { SelectParamsType } from '../../../types/types';
import './style.scss'

const PointsComponent = (props: { value: AnyObject, isDetails?: boolean }) => {
    const { value, isDetails } = props

    const {
        id: orderId,
        createTime,
        orderNo,
        bankName,
        bankAccount,
        detailList = [], // 详情
        status,
        amount,
        seller,      // 售卖人
        buyer,
        point,
        points,
        rate,
        userId,
        merchNo
    } = value;
    const dispatch = useDispatch()

    const selectValue = useSelector((store: { selectInfo: { value: SelectParamsType } }) => store.selectInfo.value)

    const [description, setDescription] = useState('');
    const [rulingOpened, setRulingOpened] = useState(false);
    const [opened, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [orderStatus, setOrderStatus] = useState(status);

    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [rulingDescription, setRulingDescription] = useState('');
    const [rulingPoint, setRulingPoint] = useState(points);

    useEffect(() => {
        setOrderStatus(status);
    }, [status]);

    useEffect(() => {
        setRulingPoint(points);
    }, [points]);


    const cancelOrder = async () => {
        // TODO: 二次弹窗
        await cancelPointsOrder(orderNo);
        setOrderStatus(OrderStatus.cancelled);
    }

    const openDetails = () => {
        dispatch(updateSourceStore(value))
    }

    const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
        setLoading(true);
        await paidPointsOrder({
            orderNo: orderNo,
            images: '',
            memo: description
        });
        setOrderStatus(OrderStatus.inTradeProcessing);
        dispatch(syncUserInfo());
        setOpen(false);
        setLoading(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
    };

    const rulingPointChange = (value: number) => {
        setRulingPoint(value);
    }

    const [winner, setWinner] = useState(null);

    const rulingHandleOk = async (e: React.MouseEvent<HTMLElement>) => {
        setLoading(true);

        const response = await judgmentPoints({
            orderNo: orderNo,
            winner: winner === 'buyer' ? userId : merchNo,
            loser: winner === 'buyer' ? merchNo : userId,
            description: rulingDescription,
            points: points,
            images: fileList.map(x => x.response?.data).filter(x => Boolean(x)).join(),
        });
        if (response.code === 0) {
            setOrderStatus(OrderStatus.inDisputeNegotiate);
            setRulingOpened(false);
            setLoading(false);
        }
    };

    const rulingHandleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setRulingOpened(false);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList, file }) => {
        if (file.status === 'uploading') {
            setUploading(true);
        } else {
            setUploading(false);
        }
        setFileList(newFileList);
    };

    const showModal = () => {
        setOpen(true);
    };

    const showRulingModal = () => {
        setRulingOpened(true);
    };

    const modalDescriptions = [
        { key: 1, postfix: 'odd', label: 'Order Number', value: [null, orderNo] },
        { key: 2, postfix: 'even', label: 'Order Time', value: [null, formatTime(createTime)] },
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
        { key: 7, postfix: 'odd', label: 'Negotiation Rate', span: 3, value: [rate, `Points`] },
        { key: 8, postfix: 'even', label: 'Ruling', span: 3, value: [<InputNumber min={0} max={rulingPoint} value={rulingPoint} defaultValue={rulingPoint} onChange={rulingPointChange} />, 'Points'] },
        {
            key: 9,
            postfix: 'odd',
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

    const componentClass = `card-item ${isDetails && 'detail-content'}`
    return (
        <div className={componentClass}>
            <div className='card-item-card cursor-pointer' onClick={openDetails}>
                Points
            </div>

            {/* Points text */}
            <div className='card-item-text'>
                Points
            </div>

            {/* points info */}
            <div className='card-item-points'>
                <div className='card-item-points-info'>
                    <span>
                        Bank
                    </span>
                    <span>
                        Kuda
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Bank Account Number
                    </span>
                    <span>
                        {bankAccount}
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Name
                    </span>
                    <span>
                        {bankName}
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Points
                    </span>
                    <span>
                        {point}
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Amount
                    </span>
                    <span>
                        {amount}
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Order Number
                    </span>
                    <span>
                        {orderNo}
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Order Time
                    </span>
                    <span>
                        {createTime}
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Time Limit
                    </span>
                    <span>
                        120 min
                    </span>
                </div>
            </div>

            {<Modal
                className='negotiate-dialog'
                title="Upload payment screenshot"
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
            </Modal>}

            <Modal
                className='negotiate-dialog'
                title="Ruling"
                open={rulingOpened}
                closeIcon={null}
                destroyOnClose={true}
                onOk={rulingHandleOk}
                onCancel={rulingHandleCancel}
                footer={[
                    <Button className='antdog-btn' key="cancel" onClick={rulingHandleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" className='submit-btn' loading={loading} onClick={rulingHandleOk}>
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

            {/* btn */}
            {
                selectValue.isRuling ? (<div className='card-item-btn'>
                    <Button className='antdog-btn' type="primary" onClick={showRulingModal}>
                        Seller Win
                    </Button>
                    <Button className='antdog-btn' type="primary" onClick={showRulingModal}>
                        Buyer Win
                    </Button>
                </div>) : (<>
                    {/* In trade */}
                    {[OrderStatus.inTrade].includes(orderStatus) && <div className='card-item-btn'>
                        <Button className='antdog-btn' type="primary" onClick={cancelOrder}>Cancel</Button>
                        <Button className='antdog-btn' type="primary" onClick={showModal}>
                            Paid
                        </Button>
                    </div>}

                    {/* In dispute */}
                    {orderStatus === OrderStatus.inDisputeArbitration && <div className='card-item-btn'>
                        <Button className='antdog-btn disabled' type="primary" disabled>
                            Platform is in arbitration,please wait
                        </Button>
                    </div>}
                    {[OrderStatus.inTradeProcessing].includes(orderStatus) && <div className='card-item-btn short'>
                        <Button className='antdog-btn processing' type="primary" disabled>
                            Order Processing
                        </Button>
                    </div>}

                    {/* Cancelled */}
                    {orderStatus === OrderStatus.cancelled && <div className='card-item-btn short'>
                        <Button className='antdog-btn disabled' type="primary" disabled>
                            Cancelled
                        </Button>
                    </div>}

                    {/* Completed */}
                    {[OrderStatus.completed].includes(orderStatus) && <div className='card-item-btn short'>
                        <Button className='antdog-btn disabled' type="primary" disabled>
                            Order Completed
                        </Button>
                    </div>}
                </>)
            }
        </div>
    )
}

export default PointsComponent