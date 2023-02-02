// 存储
export const setToken = (token)=>{
    localStorage.setItem('TOKEN',token);
}

// 获取
export const getToken = ()=>{
    return localStorage.getItem('TOKEN');
}

// 清除本地存储token
export const removeToken =()=>{
    localStorage.removeItem("TOKEN");
}