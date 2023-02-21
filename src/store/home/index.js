// home的小仓库

import { reqCategoryList } from 'api'


const state = {
    // state的初始数据类型，应与服务器返回的相同
    categoryList: [],
}
const actions = {
    // 通过在api里面的接口函数request()调用，向服务器发送请求
    //1. async和await 方法法
    async categoryList(state) {
        let res = await reqCategoryList();
        // console.log(res); 
        if (res.code == 200) {
            state.commit('CATEGORYLIST', res.data)
        }


    },

    //2. Promise.then(()=>{})方法
    // categoryList(state) {
    //     let res = reqCategoryList();
    //     console.log(res);
    //     res.then((result) => {
    //         console.log(result); //{code: 200, message: '成功', data: Array(17), ok: true}
    //         // 这里操作result
    //     }).catch((err) => {

    //     });
    // }

}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    }
}
const getters = {}

export default {

    state,
    actions,
    mutations,
    getters
}