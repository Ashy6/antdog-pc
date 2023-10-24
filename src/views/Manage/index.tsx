import { useState } from 'react';
import { Layout, Space } from 'antd';

import { Sidebar } from '../Sidebar';
import { Container } from '../Container';
import { SearchInput } from '../SearchInput';

import { contentStyle, headerStyle, siderStyle } from './data';
import { ActiveSidebar } from './types';

import './style.scss'

const { Header, Sider, Content } = Layout;


export function Manage() {
    const [params, setParams] = useState<ActiveSidebar>({} as ActiveSidebar)

    const updateParams = (selectedMenuKeys: ActiveSidebar) => {
        setParams(selectedMenuKeys);
    }

    return (
        <Space className='h-full w-full' direction="vertical" style={{ width: '100%', height: '100%', minWidth: 1200 }} size={[0, 48]}>
            <Layout>
                <Sider theme='light' style={siderStyle} width='256px'>
                    <Sidebar menusChange={updateParams}></Sidebar>
                </Sider>
                <Layout style={{ width: 'calc(100% - 256px)' }}>
                    <Header style={headerStyle}>
                        <SearchInput></SearchInput>
                    </Header>
                    <Content style={contentStyle}>
                        <Container select={params} />
                    </Content>
                </Layout>
            </Layout>
        </Space>
    )
}
