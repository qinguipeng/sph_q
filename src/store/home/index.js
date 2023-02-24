// home的小仓库

import { reqCategoryList, reqGetBannerList, reqGetFloorList } from 'api'


const state = {
    // state的初始数据类型，应与服务器返回的相同
    categoryList: [],
    // 轮播图数据
    bannerList: [],
    // floor数据
    floorLIst: []
}
const actions = {
    // 获取首页三级分类数据
    // 通过在api里面的接口函数request()调用，向服务器发送请求
    //1. async和await 方法法
    async getCategoryList(state) {
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



    // 获取首页banner轮播图
    async getBannerList({ commit }) {
        let res = await reqGetBannerList();
        // console.log(res);
        if (res.code == 200) {
            commit("GETBANNERLIST", res.data)
        }

    },

    // 获取floor数据
    async getFloorList({ commit }) {
        let res = await reqGetFloorList()
        if (res.code == 200) {
            // 提交mutation
            commit("GETFLOORLIST", res.data)
        }
    }

}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },

    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorLIst) {
        state.floorLIst = floorLIst
    }

}
const getters = {}

export default {

    state,
    actions,
    mutations,
    getters
}