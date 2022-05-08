import axios from "axios";
import { message } from "antd";
import qs from "qs"

export default function ajax(url,data={},method='GET',type='x-www'){
    return new Promise((resolve,reject)=>{
        let promise
        if(method === 'GET') promise = axios.get(url,{params:data})
        else if(method === 'POST') {
            if(type === 'x-www') promise = axios.post(url,qs.stringify(data))
            else if(type === 'json') promise = axios.post(url,data)
        }
        promise.then((response)=>{
            resolve(response)
        }).catch((error)=>{
            message.error('请求出错了：'+error.message)
        })
    })
}