import { BarsOutlined,FrownOutlined,IdcardOutlined,ToolOutlined,UsergroupAddOutlined,VerifiedOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

const menuList = {
    menuList1 : [
        {
            label : '学生信息',
            key : 's_info',
            icon : <BarsOutlined />,
            children : [
                {
                    label : <NavLink to='s_score'>学生成绩</NavLink>,
                    key : 's_score',
                    icon : <FrownOutlined />
                },
                {
                    label : <NavLink to='s_roll'>学籍信息</NavLink>,
                    key : 's_roll',
                    icon : <IdcardOutlined />
                }
            ]
        },
        {
            label : '用户管理',
            key : 'manage',
            icon : <ToolOutlined />,
            children : [
                {
                    label : <NavLink to='user_info'>用户信息</NavLink>,
                    key : 'user_info',
                    icon : <UsergroupAddOutlined />
                },
                {
                    label : <NavLink to='user_roll'>用户权限</NavLink>,
                    key : 'user_roll',
                    icon : <VerifiedOutlined />
                }
            ]
        }
    ],
    menuList2:[
        {
            label : '学生信息',
            key : 's_info',
            icon : <BarsOutlined />,
            children : [
                {
                    label : <NavLink to='s_score'>学生成绩</NavLink>,
                    key : 's_score',
                    icon : <FrownOutlined />
                },
                {
                    label : <NavLink to='s_roll'>学籍信息</NavLink>,
                    key : 's_roll',
                    icon : <IdcardOutlined />
                }
            ]
        },
    ],
    menuList3 : [
        {
            label : '学生信息',
            key : 's_info',
            icon : <BarsOutlined />,
            children : [
                {
                    label : <NavLink to='s_score'>学生成绩</NavLink>,
                    key : 's_score',
                    icon : <FrownOutlined />
                },
            ]
        }
    ]
}



export default menuList