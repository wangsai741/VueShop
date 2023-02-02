// 在当前模块：API进行统一管理
import requests from "./request";
import mockRequests from "./mockRequest";

// 三级联动接口
// /api/product/getBaseCategoryList     get     无参数

export const reqCategoryList = () => {
    // 发送的axios请求返回的结果是Promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
};

// 获取banner，轮播图
export const reqGetBannerList = () => {
    return mockRequests.get('/banner')
};

export const reqFloorList = () => {
    return mockRequests.get('/floor')
};

// 获取搜索数据，地址：/api/list，请求方式：post

// 当前接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

// 产品详情页的接口
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });

// 将产品添加到购物车中
export const reqAddOrUpdataShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车数据接口
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' });

// 删除购物车商品
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

// 修改商品的选中状态
export const reqUpdataCheckedByid = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});

// 获取验证码
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

// 注册
export const reqUserRigister = (data)=>requests({url:'/user/passport/register',data,method:'post'});

// 登陆 /api/user/passport/login
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'});

// 获取用户信息，带token    /api/user/passport/auth/getUserInfo
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});

// 退出登陆
export const reqLoginOut = ()=>requests({url:'/user/passport/logout',method:'get'});

// 获取用户地址     /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取订单交易页信息     /api/order/auth/trade
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})

// 提交订单的接口   /api/order/auth/submitOrder?tradeNo={tradeNo}   post
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取支付信息 /api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo = (orderId) =>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取支付状态 /api/payment/weixin/queryPayStatus/{orderId}    get
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取我的订单列表 /api/order/auth/{page}/{limit}  get
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})