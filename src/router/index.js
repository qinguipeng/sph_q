import Vue from 'vue'
import VueRouter from 'vue-router'


// 使用插件
Vue.use(VueRouter)

import Home from 'pages/home/Home.vue'
import Search from 'pages/search/Search'
import Login from 'pages/login/Login.vue'
import Rigister from 'pages/rigister/Rigister.vue'
import Detail from 'pages/detail/Detail.vue'
import AddCartSuccess from 'pages/addCartSuccess/AddCartSuccess.vue'
import ShopCart from 'pages/shopCart/ShopCart.vue'

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
        meta: { show: true, title: "首页" }

    },
    {
        path: "/search/:keyword?",
        component: Search,
        meta: { show: true, title: "搜索" },
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
        meta: { show: false, title: "登录" }
    },
    {
        path: "/rigister",
        component: Rigister,
        meta: { show: false, title: "注册" }
    },
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: { show: false, title: "商品详情" }
    }, {
        path: "/addcartsuccess",
        component: AddCartSuccess,
        meta: { show: false, title: "添加购物车成功" },
        name: "addcartsuccess"
    }, {
        path: "/shopcart",
        component: ShopCart,
        meta: { show: false, title: "购物车" },
        name: "shopcart"
    }

]


const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { y: 0 }
    }
})

//全局导航守卫

router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    document.title = to.meta.title
    next()
})

export default router