/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Col, Pagination, Row } from 'antd'

import CardsComponent from '../component/CardsComponent'
import PointsComponent from '../component/PointsComponent'
import EmptyComponent from '../../components/EmptyComponent'

import { getPointsOrderPage } from '../../api/points'
import { getOrderPage } from '../../api/cards'
import { SelectParamsType, SidebarMenuType } from '../../types/types'

import './style.scss'

const component: { [key: string]: (props: AnyObject) => JSX.Element } = {
    [SidebarMenuType.Cards]: props => (
        <CardsComponent value={props}></CardsComponent>
    ),
    [SidebarMenuType.Points]: props => (
        <PointsComponent value={props}></PointsComponent>
    )
}

const Container = () => {
    const selectValue = useSelector(
        (store: { selectInfo: { value: SelectParamsType } }) =>
            store.selectInfo.value
    )

    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 8,
        total: 0
    })
    const [list, setList] = useState<AnyObject[]>([])

    useEffect(() => {
        const params = {
            page: pagination.page,
            pageSize: pagination.pageSize,
            orderNo: selectValue.params.orderNo
        }
        const { status, subStatus } = selectValue.params
        status && status.length && (params['status'] = status)
        subStatus && (params['subStatus'] = subStatus)

        switch (selectValue.menuKey) {
            // 获取 Cards 数据
            case SidebarMenuType.Cards:
                getOrderPage(params).then(callback)
                break
            // 获取 Points 数据
            case SidebarMenuType.Points:
                getPointsOrderPage(params).then(callback)
                break
        }
    }, [selectValue, pagination.page])

    const callback = res => {
        if (res) {
            const { records, total } = res.data
            setPagination(value => ({
                ...value,
                total
            }))
            setList(records as AnyObject[])
        }
    }

    const onPageChange = (page: number) => {
        setPagination(value => ({
            ...value,
            page
        }))
    }

    return (
        <div className='container h-100'>
            {list?.length ? (
                <div className='container-cards'>
                    <Row className='cards' gutter={[32, 16]}>
                        {list.map((source, i) => {
                            return (
                                <Col
                                    className='gutter-row'
                                    key={`${selectValue.menuKey}-${i}`}
                                    span={6}
                                >
                                    {component[selectValue.menuKey]?.(source)}
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            ) : (
                <EmptyComponent />
            )}
            <div className='container-pagination'>
                <Pagination
                    current={pagination.page}
                    defaultPageSize={pagination.pageSize}
                    total={pagination.total}
                    showQuickJumper
                    showSizeChanger={false}
                    showTitle={false}
                    onChange={onPageChange}
                />
            </div>
        </div>
    )
}

export default Container
