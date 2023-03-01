import Vue from 'vue'
import Vuex from 'vuex'
// 使用vuex
Vue.use(Vuex)

// 引入小仓库
import home from './home';
import search from './search'
import detail from './detail'


// 对外暴露一个Vuex的Store实例
export default new Vuex.Store({
    //实现仓库模块化开发存储数据

    modules: {
        home,
        search,
        detail
    }
})