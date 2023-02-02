import { reqCartList,reqDeleteCartById,reqUpdataCheckedByid } from "@/api";

const state = {
    cartList:[],
};
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList;
    }
};
const actions = {
    // 获取购物车数据
    async getCartList({commit}){
        let result = await reqCartList();
        if(result.code == 200){
            commit("GETCARTLIST",result.data);
        }
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.code == 200){
            return 'ok';
        }else{
            return Promise.reject(new error('faile'));
        }
    },
    // 修改购物车产品选中状态
    async updataCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdataCheckedByid(skuId,isChecked);
        if(result.code == 200){
            return 'ok';
        }else{
            return Promise.reject(new error('faile'));
        }
    },
    // 删除勾选的产品
    deleteAllCheckedCart({dispatch,getters}){
        // context:小仓库，dispatch派发action，getters，计算属性
        // 获取购物车中全部产品
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1?dispatch('deleteCartListBySkuId',item.skuId):'';
            // 将返回值添加到数组中
            PromiseAll.push(promise);
        });
        // 数组都成功返回成功,有一个失败返回失败结果
        return Promise.all(PromiseAll);
    },
    // 全选
    updataAllCartIsChecked({dispatch,state},isChecked){
        // 数组
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach((item)=>{
            let promise = dispatch('updataCheckedById',{skuId:item.skuId,isChecked:isChecked});
            promiseAll.push(promise)
        });
        // 最终返回结果
        return Promise.all(promiseAll)
    }
};
const getters = {
    cartList(state){
        return state.cartList[0]||{}
    }
};
export default{
    state,
    mutations,
    actions,
    getters
}