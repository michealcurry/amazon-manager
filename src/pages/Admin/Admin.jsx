import { Layout} from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Leftnav from '../../components/Leftnav/Leftnav'
import Top from '../../components/Top/Top'

export default function Admin() {

  const { Header, Footer, Sider, Content } = Layout

  return (
    <>
      <Layout style={{height:"100%"}}>
        <Sider><Leftnav/></Sider>
        <Layout>
          <Header style={{"height":"80px","backgroundColor":"white",padding:0}}><Top/></Header>
          <Content style={{"margin":"20px",backgroundColor:'white'}}><Outlet/></Content>
          <Footer style={{'textAlign':'center','marginBottom':'0','color':'gray'}}>推荐使用谷歌浏览器，观感更佳</Footer>
        </Layout>
      </Layout>
    </>
  )
}
