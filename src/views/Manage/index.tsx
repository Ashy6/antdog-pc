import { useState } from 'react'
import { Layout, Space } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { clearSourceStore } from '../../store/reducers/sourceState'

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
    const sourceValue = useSelector((store: { source: AnyObject }) => store.source.value)
    const dispatch = useDispatch();

    const [params, setParams] = useState<ActiveSidebar>({} as ActiveSidebar)

    // Sidebar 状态
    const updateParams = (selectedMenuKeys: ActiveSidebar) => {
        setParams(selectedMenuKeys)
        dispatch(clearSourceStore())
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
                        className={sourceValue ? 'detail' : 'manage'}
                    >
                        {sourceValue ? (
                            <LeftOutlined onClick={() => dispatch(clearSourceStore())} />
                        ) : (
                            <SearchInput />
                        )}
                    </Header>
                    <Content style={contentStyle}>
                        {sourceValue ? (
                            <FullComponent>
                                {detailsMap[params.menuKey]?.(sourceValue)}
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
