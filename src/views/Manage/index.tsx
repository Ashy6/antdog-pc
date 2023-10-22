import React, { useState, useEffect } from 'react';
import { Layout, Space } from 'antd';
import { Sidebar } from '../Sidebar';
import { Container } from '../Container';
import { SearchInput } from '../SearchInput';
import './style.scss'

const { Header, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#666',
    height: 100,
    paddingInline: 200,
    lineHeight: '64px',
    backgroundColor: '#FFF',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    color: '#666',
    backgroundColor: '#fff',
};

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#666',
    backgroundColor: '#fff',
};

export function Manage() {
    const [params, setParams] = useState<string[]>([])

    const updateParams = (selectedMenuKeys: string[]) => {
        setParams(selectedMenuKeys);
    }

    return (
        <Space className='h-full w-full' direction="vertical" style={{ width: '100%', height: '100%', minWidth: 1200 }} size={[0, 48]}>
            <Layout>
                <Sider theme='light' style={siderStyle} width='256px'>
                    <Sidebar menusChange={updateParams}></Sidebar>
                </Sider>
                <Layout style={{ width: 'calc(100% - 256px)'}}>
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
