// 所有的API进行统一管理

import request from './request'
import mockRequest from './mockRequest'




//*************** 三级联动数据的接口函数
// /api/product/getBaseCategoryList
//    get  无参数
export const reqCategoryList = () => {
    // 发请求
    return request({
        url: "/api/product/getBaseCategoryList",
        method: "get"
    })
}


//***************请求banner（home首页轮播图数据）接口函数  .get(url)
// mock数据
export const reqGetBannerList = () => mockRequest.get("/banner")



// 获取floor数据
export const reqGetFloorList = () => { return mockRequest.get('/floor') }





//***************获取search模块数据 接口函数
// 地址：/api/list  请求方式：POST ，带参数如下
//  {
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }

// 当前接口给服务器传递params参数，至少是一个空对象
export const reqGetSearchInfo = (params) => {
    // 发请求
    return request({
        url: "/api/list",
        method: "post",
        data: params
    })
}

// 获取商品详情信息的接口 地址：/api/item/{ skuId }   方式：GET   参数必选：skuId
export const reqGoodsInfo = function(skuId) {
    return request({
        url: `/api/item/${ skuId }`,
        method: "get"
    })
}


// 将产品加入购物车或者更新一个产品的个数
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({
    url: `/api/cart/addToCart/${ skuId }/${ skuNum }`,
    method: "post"
})



// 获取购物车列表数据的接口 地址：/api/cart/cartList    GET
export const reqCartList = function() {
    return request({
        url: '/api/cart/cartList',
        method: 'get'
    })
}



// 删除购物车商品接口   /api/cart/deleteCart/{skuId}   DELETE
export const reqDeleteCartById = (skuId) => {
    request({
        url: `/api/cart/deleteCart/${skuId}`,
        method: "DELETE"
    })
}


// 8.切换商品选中状态   /api/cart/checkCart/{skuID}/{isChecked}    GET.

export const reqUpdateCheckedById = (skuId, isChecked) => {
    request({
        url: `/api/cart/checkCart/${skuId }/${isChecked}`,
        method: 'GET'
    })
}

//15 获取验证码  /api/user/passport/sendCode/{phone} GET
export const reqGetCode = (phone) => request({
    url: `/api/user/passport/sendCode/${phone}`,
    method: 'get'
})

// 16 请求地址 /api/user/passport/register   POST   参： phone  password code
export const reqUserRegister = (data) => {
    request({
        url: '/api/user/passport/register',
        data,
        method: 'POST'
    })
}


// 2 登录      /api/user/passport/login   POST       phone  password
export const reqUserLogin = (data) => request({
    url: '/api/user/passport/login',
    data,
    method: "POST"
})


// 16.4 获取用户的信息 需要带着用户的token向服务器要用户信息   /api/user/passport/auth/getUserInfo  
export const reqUserInfo = () => request({
    url: '/api/user/passport/auth/getUserInfo',
    method: 'GET'
})



// 17.退出登陆   /api/user/passport/logout   GET
export const reqLogout = () => request({
    url: '/api/user/passport/logout',
    method: 'GET'
})


// 获取用户地址信息   /api/user/userAddress/auth/findUserAddressList  get
export const reqAdressInfo = () => request({
    url: '/api/user/userAddress/auth/findUserAddressList',
    method: 'get'
})


// 10.获取订单交易页信息  /api/order/auth/trade    GET
export const reqOrderInfo = () => request({
    url: '/api/order/auth/trade',
    method: 'get'
})


//12.提交订单    /api/order/auth/submitOrder?tradeNo={tradeNo}   POST
export const reqSubmitOrder = (tradeNo, data) => request({
    url: `api/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'POST'
})


// 13.获取订单支付信息   /api/payment/weixin/createNative/{orderId}   GET   参 orderId
export const reqPayInfo = (orderId) => request({
    url: `/api/payment/weixin/createNative/${orderId}`,
    method: 'get'
})



// 14.查询支付订单状态    /api/payment/weixin/queryPayStatus/{orderId}    GET  参orderId
export const reqPaymentStatus = (orderId) => request({
    url: `/api/payment/weixin/queryPayStatus/${orderId}`,
    method: "GET"
})