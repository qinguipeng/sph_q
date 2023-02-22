// 引入mockjis
import Mock from 'mockjs'
// 把JSON数据格式引入进来
// 在webpack中，默认对外暴露的有：图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'

// mock数据
// Mock的mock(url,data)方法
Mock.mock("/mock/banner", { code: 200, data: banner }) //模拟轮播图数据
Mock.mock("/mock/floor", { code: 200, data: floor })