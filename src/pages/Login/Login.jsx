import { Button,Form,Input, message } from 'antd'
import React from 'react'
import './Login.less'
import { useNavigate } from 'react-router-dom'
import { reqLogin } from '../../api'
import store from 'store'
import { useEffect } from 'react'

export default function Login() {

  const navigate = useNavigate()

  const handleRegister = () => {
    navigate('/register')
  }

  const onFinish = async(values)=>{
    const {username,password} = values
    const {data} = await reqLogin(username,password)
    if(data.status === 1) {
      message.error(data.message)
    }
    else if(data.status === 0 ) {
      store.set('user',{name:data.data.username,roleName:data.data.roleName})
      message.success('登录成功！')
      navigate('/admin')
    }
  }
  
  const onFinishFailed = ()=>{

  }

  useEffect(()=>{
    if(store.get('user')) {
      navigate('/admin')
    }
  },)

  return (
    <>
      <div className='login-background'>
        <header className='login-header'>
          <h1>
            学生信息后台管理系统
          </h1>
        </header>
        <section className='login-content'>
          <h1>
            用户登录
          </h1>
          <Form
            className='login-form'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='on'
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            >
              <Input  autoComplete='on'/>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码!',
                },
              ]}
            >
              <Input.Password autoComplete='on'/>
            </Form.Item>
            <Form.Item>
              <Button className='login-button' type='primary' htmlType='submit'>登录</Button>
            </Form.Item>
          </Form>
          <Button className='register-button' type='primary' onClick={handleRegister}>注册</Button>
        </section>
      </div>
    </>
    
  )
}
