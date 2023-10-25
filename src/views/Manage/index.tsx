import { useState } from 'react'
import { Layout, Space } from 'antd'
import { LeftOutlined } from '@ant-design/icons'

import FullComponent from '../FullComponent'
import { Sidebar } from '../Sidebar'
import { Container } from '../Container'
import { SearchInput } from '../SearchInput'
import { CardsDetails } from '../component/CardsDetails'
import { PointsDetails } from '../component/PointsDetails'

import { contentStyle, headerStyle, siderStyle } from './data'
import { ActiveSidebar, SidebarMenuType } from './types'

import './style.scss'

const { Header, Sider, Content } = Layout

const detailsMap: { [key: string]: (source: AnyObject) => JSX.Element } = {
    [SidebarMenuType.Cards]: (source: AnyObject) => <CardsDetails source={source} />,
    [SidebarMenuType.Points]: (source: AnyObject) => <PointsDetails source={source} />
}

export function Manage() {
    const [params, setParams] = useState<ActiveSidebar>({} as ActiveSidebar)

    // true 为详情页面
    const [layoutFull, setLayoutFull] = useState(false)
    const [source, setSource] = useState({})

    // Sidebar 状态
    const updateParams = (selectedMenuKeys: ActiveSidebar) => {
        setParams(selectedMenuKeys)
        closeDetails()
    }

    const openDetails = (source: AnyObject) => {
        setLayoutFull(true)
        setSource(source)
    }

    // 切换 Sidebar 关闭详情页
    const closeDetails = () => {
        setLayoutFull(false)
        setSource({})
    }
    return (
        <Space
            className='h-full w-full'
            direction='vertical'
            style={{ width: '100%', height: '100%', minWidth: 1200 }}
            size={[0, 48]}
        >
            <Layout>
                <Sider theme='light' style={siderStyle} width='256px'>
                    <Sidebar menusChange={updateParams}></Sidebar>
                </Sider>
                <Layout style={{ width: 'calc(100% - 256px)' }}>
                    <Header
                        style={headerStyle}
                        className={layoutFull ? 'detail' : 'manage'}
                    >
                        {layoutFull ? (
                            <LeftOutlined onClick={closeDetails} />
                        ) : (
                            <SearchInput />
                        )}
                    </Header>
                    <Content style={contentStyle}>
                        {layoutFull ? (
                            <FullComponent>
                                {detailsMap[params.menuKey]?.(source)}
                            </FullComponent>
                        ) : (
                            <Container select={params} />
                        )}
                    </Content>
                </Layout>
            </Layout>
        </Space>
    )
}
