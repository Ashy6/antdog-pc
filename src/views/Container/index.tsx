/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Col, Pagination, Row } from 'antd'

import { getPointsOrderPage } from '../../api/points'
import { getOrderPage } from '../../api/cards'
import { ActiveSidebar, SidebarMenuType } from '../Manage/types'

import { CardsComponent } from '../component/CardsComponent'
import { PointsComponent } from '../component/PointsComponent'

import './style.scss'

const component: { [key: string]: (props: AnyObject) => JSX.Element } = {
    cards: props => <CardsComponent value={props}></CardsComponent>,
    points: props => <PointsComponent value={props}></PointsComponent>
}

export const Container = (props: { select: ActiveSidebar }) => {
    const { select } = props
    const { menuKey, subMenuKey, isRuling } = select

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
        switch (menuKey) {
            case SidebarMenuType.Cards:
                getPageCards()
                break
            case SidebarMenuType.Points:
                getPagePoints()
                break
        }
    }, [select, pagination.page])

    // 获取 Cards 数据
    const getPageCards = () => {
        const option = {
            orderNO: '',
            // status: null,
            // subStatus: '',
            page: pagination.page,
            pageSize: pagination.pageSize
        }
        getOrderPage(option).then(res => {
            const { records, total } = res.data
            setPagination(value => ({
                ...value,
                total,
            }))
            setList(records as AnyObject[])
        })
    }

    // 获取 Points 数据
    const getPagePoints = () => {
        const option = {
            orderNO: '',
            // status: null,
            // subStatus: '',
            page: pagination.page,
            pageSize: pagination.pageSize
        }
        getPointsOrderPage(option).then(res => {
            const { records, total } = res.data
            setPagination(value => ({
                ...value,
                total,
            }))
            setList(records as AnyObject[])
        })
    }

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
                                {component[menuKey]?.(source)}
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
