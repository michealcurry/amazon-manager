import React from 'react'
import './Top.less'
import { useEffect,useState } from 'react'
import { Button,message,Modal } from 'antd'
import store from 'store'
import { useNavigate } from 'react-router-dom'
import { reqWeather } from '../../api'
import formDateTime from "../../utils/timeUtils"

export default function Top() {

    const navigate = useNavigate()
    const [username,changeUsername] = useState('')
    const [time,setTime] = useState('2021-1-1 0:0:0')
    const [weather,setWeather] = useState('晴')
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        store.remove('user')
        navigate('/login')
        message.success('退出成功')
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(()=>{
        changeUsername(store.get('user').name)
    },[])

    useEffect(()=>{
        setInterval(()=>{
            const currentTime = Date.now()
            setTime(formDateTime(currentTime))
          },1000)
    },[])

    useEffect(()=>{
        reqWeather().then((result)=>{
            setWeather(result.data.lives[0].weather)
        })
    },[])
    
    return (
        <div className='top'>
            <div className='top-head'>
                <span>
                    欢迎,{username}
                    <Button type="link" onClick={showModal}>退出</Button>
                    <Modal title="提示" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        请确认你是否真的要退出
                    </Modal>
                </span>
            </div>
            <hr style={{"color":"#CD950C"}}></hr>
            <div className='top-bottom'>
                <span>
                    {time}
                    <span className='middle'></span>
                    {weather}  
                </span>
            </div>
        </div>
    )
}
