import ajax from "./ajax";

export const reqRegister = (username,password)=>{
    return ajax('http://localhost:3007/api/register',{username,password},'POST')
}

export const reqLogin = (username,password)=>{
    return ajax('http://localhost:3007/api/login',{username,password},'POST')
}

export const reqWeather = ()=>{
    return ajax('https://restapi.amap.com/v3/weather/weatherInfo',{key:'2d64fccaa0f8e843bc6155a102cef567',city:'110115'},'GET')
}

export const reqStudent = ()=>{
    return ajax('http://127.0.0.1:3007/api/get_student')
}

export const reqAddStudent = (student)=>{
    return ajax('http://127.0.0.1:3007/api/add_student',student,'POST','json')
}

export const reqDeleteStudent = (_id)=>{
    return ajax('http://127.0.0.1:3007/api/delete_student',_id,'POST')
}

export const reqUpdateStudent = (student)=>{
    return ajax('http://127.0.0.1:3007/api/update_student',student,'POST','json')
}

export const reqAddScore = (score)=>{
    return ajax('http://127.0.0.1:3007/api/add_score',score,'POST','json')
}

export const reqScore = ()=>{
    return ajax('http://127.0.0.1:3007/api/get_score')
}

export const reqUsers = ()=>{
    return ajax('http://127.0.0.1:3007/api/get_user')
}

export const reqUpdatePassword = (user)=>{
    return ajax('http://127.0.0.1:3007/api/update_student',user,'POST')
}

export const reqDeleteUser = (_id) => {
    return ajax('http://127.0.0.1:3007/api/delete_user',{_id},'POST')
}

export const reqUpdateRole = (user)=>{
    return ajax('http://localhost:3007/api/update_role',user,'POST')
}
