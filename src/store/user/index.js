//登录与注册

import { reqGetCode, reqUserRegister } from 'api'


const state = {
    code: ''
}
const mutations = {
    GETCODE(state, payload) {
        state.code = payload
    }
}



const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let res = await reqGetCode(phone)
        if (res.code == 200) {
            commit('GETCODE', res.data)
        }
    },
    // 用户注册
    async reqUserRegister({ commit }, user) {
        let res = await reqUserRegister(user)

        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },


}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}