// search模块小仓库
import { reqGetSearchInfo } from 'api'



const state = { searchInfo: {} }
const actions = {
    // 获取search模块的数据
    async getSearchInfo(state, payload = {}) {
        // reqGetSearchInf至少传递一个参数(空对象 )
        // payload载荷，此处载荷至少是一个空对象
        let res = await reqGetSearchInfo(payload)
            // console.log(res);
        if (res.code == 200) {
            state.commit("GETSEARCHINFO", res.data)
        }
    }
}
const mutations = {
        GETSEARCHINFO(state, searchInfo) {
            state.searchInfo = searchInfo
        }
    }
    // 计算属性
    // 在项目当中，getter的作用：简化仓库中的数据
    // getter可以把将来我们在组件中用到的数据简化，
const getters = {
    goodsList(state) {
        // 如果网路和数据请求成功，返回的是一个数组
        // 假如没网络，retun 的就是一个undefined，但是search组件中要对这个返回值undefined进行遍历，j就会报代码错误（这时候程序员就去代码中找，但是怎么也找不到），但是其实是网络请求数据不成功导致遍历undefined，undefined不是一个可得迭代对象，
        // 
        return state.searchInfo.goodsList || []
    },
    trademarkList(state) {
        return state.searchInfo.trademarkList || []
    },
    attrsList(state) {
        return state.searchInfo.attrsList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}