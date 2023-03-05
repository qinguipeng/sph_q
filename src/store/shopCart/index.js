import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from 'api'
import { Promise } from 'core-js'
const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, payload) {
        state.cartList = payload
    },

}
const actions = {
    // 获取购物车数据列表
    async getCartList({ commit }) {
        let res = await reqCartList()
        if (res.code == 200) {
            commit("GETCARTLIST", res.data)
        }
    },

    // 删除购物车某个产品
    // 方法1：
    async deleteCartListBySkuId({ commit }, skuId) {
        let res = await reqDeleteCartById(skuId)
        if (res.code == 200) {
            return 'ok';
        } else {
            return Promise.reject()
        }
    },

    // 方法2：
    // deleteCartListBySkuId({ commit }, skuId) {
    //     reqDeleteCartById(skuId).then((result) => {

    //         if (result.code == 200) {

    //             // return 'ok';

    //         } else {
    //             return Promise.reject(new Error('faild'))
    //         }
    //     }).catch((err) => {
    //         throw err
    //     });
    // }


    // 修改购物车某一个产品的选中状态
    async updateCheckedById({ commint }, { skuId, isChecked }) {
        let res = await reqUpdateCheckedById(skuId, isChecked);
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }

    },



    // 删除选中商品*************使用context，上下文，本仓库的上下文，可获取当前仓库的所有与数据
    // 以及Promise.all
    deleteAllCheckedSku({ dispatch, getters }) {
        // console.log(context); //{getters: {…}, state: {…}, rootGetters: {…}, dispatch: ƒ, commit: ƒ, …}
        // 获取购物车全部sku
        // console.log(getters.cartList.cartInfoList);
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {

            if (item.isChecked == 1) {
                let promise = dispatch("deleteCartListBySkuId", item.skuId)
                PromiseAll.push(promise)
            } else {
                return ''
            }
            return Promise.all(PromiseAll)
        });
    },



    // 点击修改全选按钮的状态
    updateAllCartChecked({ dispatch, state }, isChecked) {
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
                let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked });
                PromiseAll.push(PromiseAll)
            })
            // 回调结果
        return Promise.all(PromiseAll)
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