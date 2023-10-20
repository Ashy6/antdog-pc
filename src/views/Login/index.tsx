import { Button, Form, Input, message } from 'antd'
import { login } from '../../api/login'
import './style.scss'

export const Login = (): JSX.Element => {
    const [messageApi] = message.useMessage();

    const onFinish = (values: { name: string; password: string }) => {
        const loginValue = {
            mail: values.name,
            password: values.password
        }
        login(loginValue).then(res => {
            if (res.status === 200) {
                const { code, data } = res.data
                if (code === 0) {
                    localStorage.setItem("AntdogToken", data.token);

                    messageApi.open({
                        type: 'success',
                        content: data.msg,
                    });
                } else {
                    messageApi.open({
                        type: 'error',
                        content: data.msg,
                    });
                }
            }
        })
    }

    const onFinishFailed = (errorInfo: unknown) => {
        console.error('Failed:', errorInfo)
    }

    type FieldType = {
        name?: string
        password?: string
        remember?: string
    }

    return (
        <div className='login-container'>
            <div className='login-container-box'>
                <label>Hello,Welcome to Antdog</label>
                <Form
                    className='login-container-form'
                    name='basic'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                >
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
                        <Button type='primary' htmlType='submit'>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
