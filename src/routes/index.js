import Login from "../pages/Login/Login"
import Admin from "../pages/Admin/Admin"
import { Navigate } from "react-router-dom"
import Register from "../pages/Register/Register"
import StudentScore from "../components/StudentScore/StudentScore"
import StudentRoll from "../components/StudentRoll/StudentRoll"
import UserInfo from "../components/UserInfo/UserInfo"
import UserRoll from "../components/UserRoll/UserRoll"

const routes = [
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/admin',
        element:<Admin/>,
        children:[
            {
                path:'s_score',
                element:<StudentScore/>
            },
            {
                path:'s_roll',
                element:<StudentRoll/>
            },
            {
                path:'user_info',
                element:<UserInfo/>
            },
            {
                path:'user_roll',
                element:<UserRoll/>
            },
            {
                path:'',
                element:<Navigate to='s_score'/>
            }
        ]
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/',
        element:<Navigate to='/login'/>
    }
]

export default routes