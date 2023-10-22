import { useState } from 'react';
import { Button, Form, Input, message } from 'antd'
// import { useDispatch } from 'react-redux';
// import { setLogin } from "../../store/reducers/loginState";
import { login } from '../../api/login'
import './style.scss'

type FieldType = {
    name?: string
    password?: string
}

export const Login = (): JSX.Element => {
    const [loading, setLoading] = useState(false);
    // const dispatch = useDispatch();
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onFinish = (values: { name: string; password: string }) => {
        setLoading(true)
        login({
            mail: values.name,
            password: values.password
        }).then(res => {
            if (res.status === 200) {
                const { code, data, msg } = res.data
                message[code === 0 ? 'success' : 'error']({
                    content: msg,
                });
                localStorage.setItem("AntdogToken", data?.token);
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const onFinishFailed = (errorInfo: unknown) => {
        console.error('Failed:', errorInfo)
    }

    return (
        <div className='login-container'>
            <div className='login-container-box'>
                <div className='title'>
                    Hello,Welcome to Antdog
                </div>
                <Form
                    className='login-container-form'
                    name='basic'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 700 }}
                    onFinish={(value) => !loading && onFinish(value)}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                >
                    <div className='account'>
                        Login by account
                    </div>
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
                            {loading ? 'Logging...' : 'Login'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
