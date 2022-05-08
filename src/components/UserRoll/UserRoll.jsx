import React from 'react';
import {
  Form,
  Button,
  Select,
  message
} from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { reqUpdateRole, reqUsers } from '../../api';

 const UserRoll = () => {

  const [users,setUsers] = useState([])

  const onFinish = (value)=>{
    console.log(value)
    reqUpdateRole(value).then((response)=>{
      if(response.data.status===0){
        message.success('修改成功！')
      }
      else message.error(response.data.message)
    }).catch((error)=>{
      message.error(error.message)
    })
  }

  useEffect(()=>{
    reqUsers().then((response)=>{
      if(response.data.status===0){
        const data = response.data.data
        setUsers(data)
      }
      else message.error(response.data.message)
    }).catch((error)=>{
      message.error(error.message)
    })
  },[])


  return (
    <Form
      style={{"marginTop":'100px'}}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
      }}
      onFinish={onFinish}
    >
      <Form.Item label="选择用户" name='username'>
        <Select>
          {
            users.map((item)=>{
              return (<Select.Option value={item.username}>{item.username}</Select.Option>)
            })
          }
        </Select>
      </Form.Item>
      <Form.Item label="选择权限" name='roleName'>
        <Select>
          <Select.Option value="teacher">教师</Select.Option>
          <Select.Option value="admin">管理员</Select.Option>
          <Select.Option value="superadmin">超级管理员</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        style={{"marginLeft":"400px"}}
      >
        <Button type='primary' htmlType='submit' style={{"width":"200px"}}>提交</Button>
      </Form.Item>
    </Form>
  );
};

export default UserRoll

