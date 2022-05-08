import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  InputNumber,
  message,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { reqAddStudent } from '../../api';

const AddStudent = (props) => {
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  const onFinish = (value)=>{
      const student = {...value,phone:value.phone.map((item)=>{
        return ({"phoneNumber":item})
      }),birthday:value.birthday.toDate()}
      reqAddStudent(student).then((response)=>{
        if(response.data.status === 1){
            message.error(response.data.message)
        }
        else if(response.data.status === 0){
            message.success('添加成功！')
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
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          onFinish={onFinish}
      >
          <Form.Item label="姓名" name='name'>
              <Input />
          </Form.Item>
          <Form.Item label="年龄" name='age'>
              <InputNumber />
          </Form.Item>
          <Form.Item label="性别">
              <Select defaultValue="male">
                  <Select.Option value="male">男</Select.Option>
                  <Select.Option value="female">女</Select.Option>
              </Select>
          </Form.Item>
          <Form.List
              name="phone"
              rules={[
                  {
                      validator: async (_, names) => {
                          if (!names || names.length < 1) {
                              return Promise.reject(new Error('至少要输入一个电话号码'));
                          }
                      },
                  },
              ]}
          >
              {(fields, { add, remove }, { errors }) => (
                  <>
                      {fields.map((field, index) => (
                          <Form.Item
                              {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                              label={index === 0 ? '电话号码' : ''}
                              required={false}
                              key={field.key}
                          >
                              <Form.Item
                                  {...field}
                                  validateTrigger={['onChange', 'onBlur']}
                                  rules={[
                                      {
                                          required: true,
                                          whitespace: true,
                                          message: "请输入电话号码",
                                      },
                                  ]}
                                  noStyle
                              >
                                  <Input placeholder="请输入电话号码" style={{ width: '60%' }} />
                              </Form.Item>
                              {fields.length > 1 ? (
                                  <MinusCircleOutlined
                                      className="dynamic-delete-button"
                                      onClick={() => remove(field.name)}
                                  />
                              ) : null}
                          </Form.Item>
                      ))}
                      <Form.Item>
                          <Button
                              type="dashed"
                              onClick={() => add()}
                              style={{ width: '60%',"marginLeft":"78px" }}
                              icon={<PlusOutlined />}
                          >
                              点击添加电话号码
                          </Button>
                          <Form.ErrorList errors={errors} />
                      </Form.Item>
                  </>
              )}
          </Form.List>
          <Form.Item label="出生日期" name='birthday'>
              <DatePicker />
          </Form.Item>
          <Form.Item label="籍贯" name='from'>
              <Input />
          </Form.Item>
          <Form.Item>
              <Button type='primary' htmlType='submit' style={{"marginLeft":'200px'}}>提交</Button>
          </Form.Item>
      </Form>
  );
};

export default AddStudent