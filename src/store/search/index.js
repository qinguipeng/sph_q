// search模块小仓库
import { reqGetSearchInfo } from 'api'



const state = { searchInfo: {} }
const actions = {
    // 获取search模块的数据
    async getSearchInfo(state, payload = {}) {
        // reqGetSearchInf至少传递一个参数(空对象 )
        // payload载荷，此处载荷至少是一个空对象
        let res = await reqGetSearchInfo(payload)
        console.log(res);
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
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}