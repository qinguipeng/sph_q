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
import Pay from 'pages/pay/Pay.vue'
import PaySuccess from 'pages/paySuccess/PaySuccess.vue'
import Center from 'pages/center/Center.vue'
// 引入二级路由组件
import MyOrder from 'pages/center/myOrder/MyOrder.vue'
import GroupOrder from 'pages/center/groupOrder/GroupOrder.vue'


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
        name: "trade",
        beforeEnter: (to, from, next) => {
            // 去交易页面必须是从购物车而来
            if (from.path == "/shopcart") {
                next()
            } else {
                // 不是从购物车而来就停留在当前路由
                next(false)
            }
            // next()
        }
    }, {
        path: "/pay",
        component: Pay,
        meta: { show: false, title: "支付" },
        name: "pay",
        beforeEnter: (to, from, next) => {
            // ...
            if (from.path == "/trade") {
                next()
            } else {
                next(false)
            }
        }

    }, {
        path: "/paysuccess",
        component: PaySuccess,
        meta: { show: false, title: "支付成功" },
        name: "paysuccess"
    }, {
        path: "/center",
        component: Center,
        meta: { show: false, title: "个人中心" },
        name: "center",
        // 二级路由
        children: [{
            //重定向
            path: '/center',
            redirect: '/center/myorder',


        }, {
            path: 'myorder',
            component: MyOrder,
            meta: { show: false, title: "我的订单" },
        }, {
            path: 'grouporder',
            component: GroupOrder,
            meta: { show: false, title: "团购订单" },
        }]
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
    } else {
        // 如果没带token，说明未登录，不能去交易相关/trade、支付相关/pay、/paysuccess、个人中心/center,
        // 未登录去上面的页面就得跳转去登录/login
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf("/pay") != -1 || toPath.indexOf("/center") != -1) {
            // 把未登录时想去但是没有去成的参数存在路由query参数中
            next('/login?redirect=' + toPath)
        } else {
            next()
        }


    }
})

export default router