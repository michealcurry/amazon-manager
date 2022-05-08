import React from 'react'
import { Table,Popconfirm,Button, message,Modal } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { reqDeleteUser, reqUsers } from '../../api';
import UpdatePassword from '../UpdatePassword/UpdatePassword';
import { NavLink } from 'react-router-dom';

export default function UserInfo() {

  const [users,setUsers] = useState([])
  const [user,setUser] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDelete,setIsDelete] = useState(false)

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(()=>{
    reqUsers().then((response)=>{
      if(response.data.status===0){
        const data = response.data.data.map((item)=>{
          return {...item,key:item._id}
        })
        setUsers(data)
      }
      else message.error(response.data.message)
    }).catch((error)=>{
      message.error(error.message)
    })
  },[isModalVisible,isDelete])

  const changeIsVisiable = (value)=>{
    setIsModalVisible(value)
  }

  const handleUpdate = (key,record)=>{
    setUser(record)
    setIsModalVisible(true)
  }

  const handleDelete = (key) =>{
    reqDeleteUser(key).then((response)=>{
      if(response.data.status === 1){
          message.error(response.data.message)
      }
      else if(response.data.status === 0){
          message.success('删除成功！')
          setIsDelete(!isDelete)
      }
    }).catch((error)=>{
        message.error('出错了',error.message)
    })
  }

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      filters: users.map((item)=>{
        return {text:item.username,value:item.username}
      }),
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      filterSearch:true,
      sortDirections: ['descend'],
    },
    {
      title: '权限',
      dataIndex: 'roleName',
      filters: [
        {
          text : '教师',
          value : 'teacher'
        },
        {
          text : '管理员',
          value : 'admin'
        },
        {
          text : '超级管理员',
          value : 'superamin'
        }
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      filterSearch:true,
      render:(roleName)=>{
        return roleName === 'teacher'?'教师':roleName === 'admin'?'管理员':'超级管理员'
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => (
        <>
          <Popconfirm title="修改密码" onConfirm={() => handleUpdate(record.key,record)}>
            <Button type='link' style={{ "padding": 0 }}>修改密码</Button>
          </Popconfirm>
          <Popconfirm title="删除用户" onConfirm={() => handleDelete(record.key)}>
            <Button type='link' style={{ "padding": 0 }}>删除用户</Button>
          </Popconfirm>
        </>
        ) 
    }
  ]

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }


  return (
    <>
      <NavLink to='/register'><Button type='primary'>添加用户</Button></NavLink>
      <Table columns={columns} dataSource={users} onChange={onChange} pagination={{ pageSize: 7 }} />
      <Modal key='1' title="修改密码" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[]}>
        <UpdatePassword user={user} changeIsVisiable={changeIsVisiable} />
      </Modal>
    </>
  )
}






