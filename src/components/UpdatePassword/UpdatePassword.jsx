import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  message,
} from 'antd';
import { reqUpdatePassword } from '../../api';

const UpdatePassword = (props) => {
  const [componentSize, setComponentSize] = useState('default');
  const user = props.user

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };


  const onFinish = (value)=>{
      const User = value
      reqUpdatePassword(User).then((response)=>{
        if(response.data.status === 1){
            message.error(response.data.message)
        }
        else if(response.data.status === 0){
            message.success('更新成功！')
            props.changeIsVisiable(false)
        }
      }).catch((error)=>{
          message.error('出错了',error.message)
      })
      
  }

  return (
      <Form
          labelCol={{
              span: 4,
          }}
          wrapperCol={{
              span: 14,
          }}
          layout="horizontal"
          initialValues={{
              size: componentSize,
              username : user.username
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          onFinish={onFinish}
      >
          <Form.Item label="用户名" name='username'>
              <Input disabled={true}/>
          </Form.Item>
          <Form.Item
              label="新密码"
              name='password'
              rules={[
                  {
                      required: true,
                      message: '请输入密码!',
                  },
                  {
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
                      message: '密码需要在8到16之间，并且至少包含大写，小写字母，数字'
                  },
              ]}
          >
              <Input/>
          </Form.Item>
          <Form.Item>
              <Button type='primary' htmlType='submit' style={{"marginLeft":'200px'}}>提交</Button>
          </Form.Item>
      </Form>
  );
};

export default UpdatePassword

