import React, { useState } from 'react'
import { useEffect } from 'react'
import { Table,List, Button,Popconfirm,Modal, message} from 'antd';
import { reqDeleteStudent, reqStudent } from "../../api"
import "./StudentRoll.less"
import AddStudent from '../AddStudent/AddStudent';
import UpdateStudent from '../UpdateStudent/UpdateStudent';

export default function StudentRoll() {

  const [students,setStudents] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [student,setStudent] = useState({})

  const changeIsVisiable = (value)=>{
    setIsModalVisible(value)
  }

  const changeIsVisiable1 = (value)=>{
    setIsModalVisible1(value)
  }

  const handleDelete = (key) => {
    reqDeleteStudent(key).then((response)=>{
      if(response.data.status === 0){
        message.success('删除成功')
      }
    }).catch((error)=>{
      message.error('失败了',error,message)
    })
  }

  const handleUpdate = (key,record) => {
    setStudent(record)
    setIsModalVisible1(true)
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk1 = () => {
    setIsModalVisible1(false);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      filters: students.map((item)=>{
        return {text:item.name,value:item.name}
      }),
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      filterSearch: true,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: '年龄',
      dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render:(gender)=>{
        if(gender === 'male') return('男')
        else if(gender === 'female') return('女')
      },
      filters: [
        {
          text: '男',
          value: 'male',
        },
        {
          text: '女',
          value: 'female',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title:'电话号码',
      dataIndex:'phone',
      render:(phone)=>{
        const data = phone.map((item)=>{
          return item.phoneNumber
        })
        return(
          <List
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                {item}
              </List.Item>
            )}
          />
        )
      }
    },
    {
      title:'生日',
      dataIndex:'birthday',
      render:(birthday)=>{
        return birthday.slice(0,10)
      }
    },
    {
      title:'籍贯',
      dataIndex:'from'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => (
        <>
          <Popconfirm title="确定要删除吗?" onConfirm={() => handleDelete(record.key)}>
            <Button type='link' style={{ "padding": 0 }}>删除</Button>
          </Popconfirm>
          <Popconfirm title="确认要修改吗 ?" onConfirm={() => handleUpdate(record.key,record)}>
            <Button type='link' style={{ "padding": "0,0,0,10" }}>修改</Button>
          </Popconfirm>
        </>
          
        ) 
    },
  ];

  useEffect(()=>{
    reqStudent().then((response)=>{
      setStudents((response.data.data).map((item)=>{
        return({...item,key:item._id})
      }))
    })
  },[isModalVisible,isModalVisible1])

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }




  return (
    <>
      <div className='studentRoll'>
        <Button type='primary' className='addStudentRoll' onClick={showModal}>添加学生</Button>
        <Modal key='1' title="添加学生" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[]}>
          <AddStudent changeIsVisiable={changeIsVisiable}/>
        </Modal>
        <Modal  key='2' title="更新学生" visible={isModalVisible1} onOk={handleOk1} onCancel={handleCancel1} footer={[]}>
          <UpdateStudent student={student} changeIsVisiable={changeIsVisiable1}/>
        </Modal>
        <Table className='showStudentRoll' columns={columns} dataSource={students} onChange={onChange} pagination={{pageSize:3}}/>
      </div>
    </>
  )
}
