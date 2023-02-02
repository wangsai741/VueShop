import { v4 as uuidv4 } from 'uuid';
// 生成随机字符串，每次执行不变化，游客身份持久存储
export const getUUID = () =>{
    // 先获取本地存储，看有没有
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    // 如果没有
    if(!uuid_token){
        // 生成
        uuid_token = uuidv4();
        // 存储
        localStorage.setItem('UUIDTOKEN',uuid_token)
    };
    return uuid_token;
}