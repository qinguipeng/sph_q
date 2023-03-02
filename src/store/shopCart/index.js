import { reqCartList } from 'api'
const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, payload) {
        state.cartList = payload
    }
}
const actions = {
    // 获取购物车数据列表
    async getCartList({ commit }) {
        let res = await reqCartList()
        if (res.code == 200) {
            commit("GETCARTLIST", res.data)
        }
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }

}



export default {
    state,
    mutations,
    actions,
    getters
}