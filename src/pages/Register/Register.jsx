import React from 'react'
import { Form,Input,Button, message } from 'antd';
import "./Register.less"
import { reqRegister } from '../../api';
import { useNavigate } from 'react-router-dom';
import store from 'store';

export default function Register() {

    const navigate = useNavigate()

    const onFinish = async (values) => {
        const {data} = await reqRegister(values.username,values.password)
        console.log(data)
        if(data.status === 1 ){
            message.error('密码或者用户名不符合要求！'+data.message)
        }
        else if(data.status === 0){
            if(store.get('user')){
                message.success("添加成功!")
                navigate('/admin/user_info')
            }
            else{
                message.success('注册成功!')
                navigate('/login')
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        message.error('输入的用户名或者密码不正确！')
    };


    return (
        <>
            <div className='register-background'>
                <header className='register-header'>
                    <h1>
                        用户注册
                    </h1>
                </header>
                <section className='register-content'>
                    <Form
                        name="basic"
                        className='register-form'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                                {
                                    pattern:/^.{2,10}$/,
                                    message:'用户名长度需要在2到10之间',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                                {
                                    pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
                                    message:'密码需要在8到16之间，并且至少包含大写，小写字母，数字'
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button className='register-button' type='primary' htmlType='submit'>注册</Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        </>

    )
}
