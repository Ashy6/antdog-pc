/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, InputNumber, Modal, Row, Upload, UploadFile, Image, UploadProps } from 'antd';
import { useDispatch } from 'react-redux'
import { updateSourceStore } from '../../../store/reducers/sourceState'
import './style.scss'
import { useEffect, useState } from 'react';
import { OrderStatus } from '../../../types/order-status';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { formatTime } from '../../../utils/time';
import { cancelPointsOrder, paidPointsOrder } from '../../../api/points';
import { freezeUserPoints } from '../../../store/reducers/userState';

export const PointsComponent = (props: { value: AnyObject, isDetails?: boolean }) => {
    const { value, isDetails } = props

    const {
        id: orderId,
        createTime,
        orderNo,
        detailList = [], // 详情
        status,
        points
    } = value;
    const dispatch = useDispatch()

    const openDetails = () => {
        dispatch(updateSourceStore(value))
    }

    const [description, setDescription] = useState('');

    const [opened, setOpen] = useState(false);
    const [action, setAction] = useState('');

    const showModal = () => {
        setOpen(true);
    };

    const [loading, setLoading] = useState(false);
    const [orderStatus, setOrderStatus] = useState(status);

    useEffect(() => {
        setOrderStatus(status);
    }, [status]);

    const cancelOrder = async () => {
        // TODO: 二次弹窗
        await cancelPointsOrder(orderNo);
        setOrderStatus(OrderStatus.cancel);
    }

    const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
        setLoading(true);
        await paidPointsOrder({
            orderNo: orderNo,
            images: '',
            memo: description
        });
        setOrderStatus(OrderStatus.submitted);
        dispatch(freezeUserPoints(points));
        setOpen(false);
        setLoading(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
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
                        1234567890
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Name
                    </span>
                    <span>
                        BADDALAJHDHAU
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Points
                    </span>
                    <span>
                        987654321.99
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Amount
                    </span>
                    <span>
                        987654321.99 NGN
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Order Number
                    </span>
                    <span>
                        1234567834567890
                    </span>
                </div>
                <div className='card-item-points-info'>
                    <span>
                        Order Time
                    </span>
                    <span>
                        2023.9.19 23.55
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
            {/* In trade */}
            {[OrderStatus.noSubmit, OrderStatus.normal].includes(orderStatus) && <div className='card-item-btn'>
                <Button className='antdog-btn' type="primary" onClick={cancelOrder}>Cancel</Button>
                <Button className='antdog-btn' type="primary" onClick={showModal}>
                    Paid
                </Button>
            </div>}

            {/* In dispute */}
            {orderStatus === OrderStatus.arbitration && <div className='card-item-btn'>
                <Button className='antdog-btn disabled' type="primary" disabled>
                    Platform is in arbitration,please wait
                </Button>
            </div>}
            {[OrderStatus.applyNegotiate, OrderStatus.waitingArbitration].includes(orderStatus) && <div className='card-item-btn short'>
                <Button className='antdog-btn processing' type="primary" disabled>
                    Order Processing
                </Button>
            </div>}

            {/* Cancelled */}
            {orderStatus === OrderStatus.cancel && <div className='card-item-btn short'>
                <Button className='antdog-btn disabled' type="primary" disabled>
                    Cancelled
                </Button>
            </div>}

            {/* Completed */}
            {[OrderStatus.finish, OrderStatus.completed].includes(orderStatus) && <div className='card-item-btn short'>
                <Button className='antdog-btn disabled' type="primary" disabled>
                    Order Completed
                </Button>
            </div>}
        </div>
    )
}
