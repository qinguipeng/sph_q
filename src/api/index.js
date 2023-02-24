// 所有的API进行统一管理

import request from './request'
import mockRequest from './mockRequest'



// 三级联动的接口
// /api/product/getBaseCategoryList   get  无参数
export const reqCategoryList = () => {
    // 发请求
    return request({
        url: "/api/product/getBaseCategoryList",
        method: "get"
    })
}


//请求banner（home首页轮播图数据）.get(url)
export const reqGetBannerList = () => mockRequest.get("/banner")



// 获取floor数据
export const reqGetFloorList = () => { return mockRequest.get('/floor') }





// 获取search模块数据 

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

// 当前接口给服务器传递paras参数，至少是一个空对象
export const reqGetSearchInfo = (params) => {
    // 发请求
    return request({
        url: "/api/list",
        method: "post",
        data: params
    })
}