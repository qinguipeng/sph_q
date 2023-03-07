import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 三级联动组件---全局组件  
// 引入
import TypeNav from "components/typeNav/TypeNav.vue";
import Carousel from 'components/carousel/Carousel.vue';
import Pagination from 'components/pagination/Pagination.vue';
// 引入elementUI
import { Button, MessageBox } from 'element-ui';

// 及注册
// 第一个参数：组件的name, 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button);
// ElementUI注册组件，挂载在Vue原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 测试数据请求
// import { reqCategoryList } from 'api'
// console.log(reqCategoryList());

// import { reqGetSearchInfo } from 'api'
// console.log(reqGetSearchInfo());


// 引入store数据仓库
import store from './store'
//
import "@/mock/mockServer"
//引入swiper样式，有多个组件需要用到swiper，所以样式可以在入口文件一次引入，全局可用
import "swiper/css/swiper.css"
// 统一接收api文件夹里面全部请求函数,也叫统一引入
import * as API from 'api'
// 


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    // 注册路由router后，组件身上个都会有一个$route和$router属性
    router,
    // 注册store后，组件身上都会有一个$store属性
    store,
    // 配置全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;

    },


}).$mount('#app')