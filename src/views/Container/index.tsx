/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Col, Pagination, Row } from 'antd'

import { CardsComponent } from '../component/CardsComponent'
import { PointsComponent } from '../component/PointsComponent'

import { getPointsOrderPage } from '../../api/points'
import { getOrderPage } from '../../api/cards'
import { SelectParamsType, SidebarMenuType } from '../../types/types'

import './style.scss'

const component: { [key: string]: (props: AnyObject) => JSX.Element } = {
    [SidebarMenuType.Cards]: props => <CardsComponent value={props}></CardsComponent>,
    [SidebarMenuType.Points]: props => <PointsComponent value={props}></PointsComponent>
}

export const Container = () => {
    const selectValue = useSelector((store: { selectInfo: { value: SelectParamsType } }) => store.selectInfo.value)

    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 8,
        total: 0
    })
    const [list, setList] = useState<AnyObject[]>([
        { type: 1 },
        { type: 2 },
        { type: 3 },
        { type: 4 },
        { type: 5 },
        { type: 6 },
        { type: 7 },
        { type: 8 },
        { type: 9 }
    ])

    useEffect(() => {
        const params = {
            ...selectValue.params,
            page: pagination.page,
            pageSize: pagination.pageSize
        }
        const { status, subStatus } = selectValue.params
        status && (params.status = status)
        subStatus && (params.subStatus = subStatus)

        switch (selectValue.menuKey) {
            // 获取 Cards 数据
            case SidebarMenuType.Cards:
                getOrderPage(params).then(res => {
                    const { records, total } = res.data
                    setPagination(value => ({
                        ...value,
                        total,
                    }))
                    setList(records as AnyObject[])
                })
                break
            // 获取 Points 数据
            case SidebarMenuType.Points:
                getPointsOrderPage(params).then(res => {
                    const { records, total } = res.data
                    setPagination(value => ({
                        ...value,
                        total,
                    }))
                    setList(records as AnyObject[])
                })
                break

            // TODO：获取 Ruling 接口
        }
    }, [selectValue, pagination.page])

    const onPageChange = (page: number) => {
        setPagination(value => ({
            ...value,
            page
        }))
    }

    return (
        <div className='main h-100'>
            <div className='main-cards'>
                <Row className='cards' gutter={[32, 16]}>
                    {list.map((source, i) => {
                        return (
                            <Col className='gutter-row' key={i} span={6}>
                                {component[selectValue.menuKey]?.(source)}
                            </Col>
                        )
                    })}
                </Row>
            </div>
            <div className='main-pagination'>
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
