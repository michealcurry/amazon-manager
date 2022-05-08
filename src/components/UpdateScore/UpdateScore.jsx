import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  InputNumber,
  message,
} from 'antd';
import { reqAddScore } from '../../api';

const UpdateScore = (props) => {
  const [componentSize, setComponentSize] = useState('default');
  const score = props.score

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };


  const onFinish = (value)=>{
      const Score = {...value,_id:score._id}
      console.log(Score)
      reqAddScore(Score).then((response)=>{
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
              ...score
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          onFinish={onFinish}
      >
          <Form.Item label="姓名" name='name'>
              <Input disabled={true}/>
          </Form.Item>
          <Form.Item label="数学" name='Math'>
              <InputNumber />
          </Form.Item>
          <Form.Item label="语文" name='Chinese'>
              <InputNumber />
          </Form.Item>
          <Form.Item label="英语" name='English'>
              <InputNumber />
          </Form.Item>
          <Form.Item>
              <Button type='primary' htmlType='submit' style={{"marginLeft":'200px'}}>提交</Button>
          </Form.Item>
      </Form>
  );
};

export default UpdateScore
