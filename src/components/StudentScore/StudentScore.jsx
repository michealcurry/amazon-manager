import React,{useState,useEffect} from 'react'
import { Table,Modal,Button,Popconfirm } from 'antd';
import { reqScore } from '../../api';
import UpdateScore from '../UpdateScore/UpdateScore';

export default function StudentScore() {

  const [data,setData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [score,setScore] = useState({})

  const changeIsVisiable = (value)=>{
    setIsModalVisible(value)
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdate = (key,record) => {
    setScore(record)
    setIsModalVisible(true)
  }
  
  useEffect(()=>{
    reqScore().then((response)=>{
      if(response.data.status === 0){
        setData(response.data.data.map((item)=>{
          return ({
            ...item,
            key:item._id
          })
        }))
        
      }
    })
  },[isModalVisible])
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      filters: data.map((item)=>{
        return ({text:item.name,value:item.name})
      }),
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      filterSearch: true,
      sortDirections: ['descend'],
    },
    {
      title: '数学',
      dataIndex: 'Math',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.Math - b.Math,
    },
    {
      title: '语文',
      dataIndex: 'Chinese',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.Chinese - b.Chinese,
    },
    {
      title: '英语',
      dataIndex: 'English',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.English - b.English,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => (
        <>
          <Popconfirm title="添加或者修改成绩" onConfirm={() => handleUpdate(record.key,record)}>
            <Button type='link' style={{ "padding": 0 }}>添加或者修改成绩</Button>
          </Popconfirm>
        </>
          
        ) 
    }
  ];
  
  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <>
      <Table columns={columns} dataSource={data} onChange={onChange} pagination={{ pageSize: 8 }} />
      <Modal key='1' title="添加学生" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[]}>
        <UpdateScore score={score} changeIsVisiable={changeIsVisiable} />
      </Modal>
    </>
    
  )
}
