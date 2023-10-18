import React, { useState, useEffect } from 'react';
import { Layout, Space } from 'antd';
import { Sidebar } from '../Sidebar';
import { Container } from '../Container';
import './style.scss'

const { Header, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#666',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#FFF',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
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
    const [params, setParams] = useState()

    const updateParams = (p: unknown) => {
        setParams(p)
    }

    useEffect(() => {
    }, [params])

    return (
        <Space className='h-full w-full' direction="vertical" style={{ width: '100%', height: '100%' }} size={[0, 48]}>
            <Layout>
                <Sider theme='light' style={siderStyle}>
                    <Sidebar callback={updateParams}></Sidebar>
                </Sider>
                <Layout>
                    <Header style={headerStyle}>Search</Header>
                    <Content style={contentStyle}>
                        <Container />
                    </Content>
                </Layout>
            </Layout>
        </Space>
    )
}
