import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import { login } from '../../api/login'
import { MANAGE_URL } from '../../route/root'
import './style.scss'

type FieldType = {
    name?: string
    password?: string
}

export const Login = (): JSX.Element => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onFinish = (values: { name: string; password: string }) => {
        setLoading(true)
        login({
            mail: values.name,
            password: values.password
        }).then(res => {
            const { code, data, msg } = res
            message[code === 0 ? 'success' : 'error']({
                content: msg
            })
            localStorage.setItem('AntdogToken', data?.token)
            return res.code === 0
        }).then(code => code && navigate(MANAGE_URL)).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className='login-container'>
            <div className='login-container-box'>
                <div className='title'>Hello,Welcome to Antdog</div>
                <Form
                    className='login-container-form'
                    name='basic'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 700 }}
                    onFinish={value => !loading && onFinish(value)}
                    autoComplete='off'
                >
                    <div className='account'>Login by account</div>
                    <Form.Item<FieldType>
                        label='Email'
                        name='name'
                        rules={[{ required: true, message: 'Please enter account' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label='Password'
                        name='password'
                        rules={[{ required: true, message: 'Please enter password' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button className='antdog-btn' type='primary' htmlType='submit'>
                            {loading ? (
                                <>
                                    Logging <SyncOutlined spin />
                                </>
                            ) : (
                                <>Login</>
                            )}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
