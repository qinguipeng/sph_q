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