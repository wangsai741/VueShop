import {reqGoodsInfo,reqAddOrUpdataShopCart} from '@/api';
// 封装的游客身份模块uuid--->生成随机字符串，不改变
import {getUUID} from '@/utils/uuid_token';

const state={
    goodsInfo:{},
    // 游客的临时身份
    uuid_token:getUUID()
};
const mutations={
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo;
    }
};
const actions={
    async getGoodsInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId);
        if(result.code===200){
            commit('GETGOODSINFO',result.data)
        }
    },
    // 商品添加到购物车中或修个个数
    async addOrUpdataShopCart({commit},{skuId,skuNum}){
        // 请求发送后返回的结果
        // 服务器返回code=200，没有其他数据，不需要三连环存储数据
        let result = await reqAddOrUpdataShopCart(skuId,skuNum)
        // 当前函数返回promise，不将结果保存在state中，但要知道成功失败
        if(result.code == 200){
            // promise,返回非空字符串就是成功
            return "ok"
        }else{
            // 失败
            return Promise.reject(new Error('faile'))
        }
    }
};
const getters={
    // 路径导航
    categoryView(state){
        // state.goodsInfo初始状态为空，空对象的categoryView为undefined
        // 当前计算出的categoryView至少为空，不然会有假的报错
        return state.goodsInfo.categoryView||{}
    },
    // 产品信息
    skuInfo(state){
        return state.goodsInfo.skuInfo||{}
    },
    // 产品售卖属性
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList||{}
    }
};

export default{
    state,
    mutations,
    actions,
    getters
}