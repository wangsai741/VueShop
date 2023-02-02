import { reqGetSearchInfo } from '@/api'

const state = {
    searchList:{}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
const actions = {
    async getSearchList({ commit }, params = {}) {
        // params形参：当用户派发action时，第二个参数传递过来至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
};
// 计算属性，在项目中，为了简化数据
const getters = {
    // 参数state是当前仓库中的state，不是大仓库的
    goodsList(state){
        // 有问题，searchList默认为空对象
        // 如果没用网络state.searchList.goodsList返回的是undefind，至少返回空数组
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}