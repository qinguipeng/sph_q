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
import Trade from 'pages/trade/Trade.vue'

// 引入store
import store from 'store'


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
    }, {
        path: "/trade",
        component: Trade,
        meta: { show: false, title: "结算" },
        name: "trade"
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
router.beforeEach(async(to, from, next) => {
    // to and from are both route objects. must call `next`.
    document.title = to.meta.title
        // next()
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    // 如果用户已经登录，就不能去登录界面，应该是去首页
    if (token) {
        // 登录了
        if (to.path == '/login' || to.path == '/rigister') {
            next('/home')
        } else {
            // 除了去/login、/rigister以外
            if (name) {
                // 如果登录了有用户信息放行
                next()
            } else {
                try {
                    // 没有用户信息，派发action，让仓库存储用户信息再跳转
                    await store.dispatch('getUserInfo');
                    next()
                } catch (error) {
                    // 程序走到这说明token失效了，获取不到用户的信息
                    // 清除token
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }

        }
    } else { next() }
})

export default router