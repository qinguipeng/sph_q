// 所有的API进行统一管理

import request from './request'
import mockRequest from './mockRequest'



// 三级联动的接口
// /api/product/getBaseCategoryList   get  无参数
export const reqCategoryList = () => {
    // 发请求
    return request({
        url: "/api/product/getBaseCategoryList",
        methods: "get"
    })
}


//请求banner（home首页轮播图数据）
export const reqGetBannerList = () => mockRequest.get("/banner")