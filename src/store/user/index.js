//登录与注册

import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from 'api'
import { setToken, getToken, removeToken } from '@/utils/token'


const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}

const mutations = {
    GETCODE(state, payload) {
        state.code = payload
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state) {
        // 清空用户数据
        state.token = ''
        state.userInfo = {}
            // 清空本地存储的token
        removeToken()
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
            // setTimeout(() => {
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
        // }, 50)

    },
    // 用户登录
    async userLogin({ commit }, data) {
        let res = await reqUserLogin(data)
            // console.log(res);
        if (res.code == 200) {
            // token 时用户的唯一标识，登陆时只有携带用户的token post给服务器，服务器才会返回响应token的数据，也就是用户数据
            commit("USERLOGIN", res.data.token);
            // 持久化存储token
            setToken(res.data.token);
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let res = await reqUserInfo();
        if (res.code == 200) {
            commit('GETUSERINFO', res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },


    // 退出登录
    async userLogout({ commit }) {
        let res = await reqLogout()
            // console.log(res);
        if (res.code == 200) {
            commit('CLEAR')
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
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