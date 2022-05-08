import React from 'react'
import { Menu } from 'antd';
import './Leftnav.less'
import menuList from '../../config/menuList';
import store from 'store';



export default function Leftnav() {

    const items = store.get('user').roleName==='teacher'?menuList.menuList3:(store.get('user').roleName==='admin')?menuList.menuList2:menuList.menuList1


    const onClick = (e) => {
        //console.log('click ', e);
    };

    return (

        <>
            <div className='left-nav'>
                <div className='left-header'>
                    <h1>
                        学生管理
                    </h1>
                </div>
                <Menu
                    onClick={onClick}
                    defaultSelectedKeys={window.location.pathname.slice(7)?window.location.pathname.slice(7):'s_score'}
                    defaultOpenKeys={(window.location.pathname.slice(7)==='s_roll' 
                    || window.location.pathname.slice(7)==='s_score' || window.location.pathname.slice(7)==='')?['s_info']:['manage']}
                    mode="inline"
                    items={items}
                    theme='dark'
                />
            </div>
        </>
        
    )
}
