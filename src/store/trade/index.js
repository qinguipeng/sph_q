// trade仓库
import { reqAdressInfo, reqOrderInfo } from 'api'

const state = {
    address: [],
    orderInfo: {}
}
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    GETODERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const actions = {
    // 获取用户地址信息
    async getUserAdress({ commit }) {
        let res = await reqAdressInfo()
        console.log(res);
        if (res.code == 200) {
            commit('GETUSERADDRESS', res.data)
        }
    },
    // 获取用户订单信息
    async getOrderInfo({ commit }) {
        let res = await reqOrderInfo()
        console.log(res);
        if (res.code == 200) {
            commit('GETODERINFO', res.data)
        }
    }

}
const getters = {}


export default {
    state,
    mutations,
    actions,
    getters
}