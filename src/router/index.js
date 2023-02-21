import Vue from 'vue'
import VueRouter from 'vue-router'


// 使用插件
Vue.use(VueRouter)

import Home from 'pages/home/Home.vue'
import Search from 'pages/search/Search'
import Login from 'pages/login/Login.vue'
import Rigister from 'pages/rigister/Rigister.vue'

const routes = [
    // 注册路由组件

    {

        path: "",
        redirect: "/home"
    },
    {
        path: "/home",
        component: Home,
        // 元数据meta
        meta: { show: true }

    },
    {
        path: "/search/:keyword?",
        component: Search,
        meta: { show: true },
        name: 'search',
        // 路由组件能不能传递props数据？答：可以
        // 1.props:Boolean类型写法,只可以传递params参数
        // props: true,

        // 2.props:{}对象写法
        props: { a: 1, b: 2 }
    },
    {
        path: "/login",
        component: Login,
        meta: { show: false }
    },
    {
        path: "/rigister",
        component: Rigister,
        meta: { show: false }
    }
]


const router = new VueRouter({
    routes,
})


export default router