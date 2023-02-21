import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'

// 三级联动组件---全局组件  
// 引入
import TypeNav from "components/typeNav/TypeNav.vue";
// 及注册
// 第一个参数：组件的name, 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
    // 测试数据请求
    // import { reqCategoryList } from 'api'
    // reqCategoryList()
    // console.log(reqCategoryList());

// 引入store数据仓库
import store from './store'



Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    // 注册路由router后，组件身上个都会有一个$route和$router属性
    router,

    // 注册store后，组件身上都会有一个$store属性
    store,
}).$mount('#app')