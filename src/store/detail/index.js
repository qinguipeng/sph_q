import { reqGoodsInfo } from 'api'


const state = {
    goodInfo: {},

}
const mutations = {
    GETGOODINFO(state, payload) {
        state.goodInfo = payload
    }
}
const actions = {
    // 获取产品详情信息的请求
    async getGoodInfo(state, skuId) {
        let res = await reqGoodsInfo(skuId)
        if (res.code == 200) {
            state.commit('GETGOODINFO', res.data)
        }
    }

}
const getters = {

    categoryView(state) {
        //比如 state.goodInfo初始值是空对象，对象goodInfo.categoryView为undefined，所以在组件中使用时就会报错，报错的时候数据还没有回来，但是报错完以后仓库中就有数据，有数据了就会将goodInfo.categoryView显示出来
        return state.goodInfo.categoryView || {}
    },
    // 简化产品描述信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 简化商品属性选项信息
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }


}

export default {
    state,
    mutations,
    actions,
    getters
}