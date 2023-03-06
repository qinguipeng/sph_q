import axios from 'axios'

// 1.引入数据请求进度条nprogress
import nprogress from 'nprogress'
// console.log(nprogress);
// 打开控制台可以看到nprogress是一个对象，{里面有start()和done()方法}
// 3.引入nprogress样式
import "nprogress/nprogress.css"


import store from '@/store'

// 利用axios对象的create方法创建一个axios实例
const request = axios.create({
    baseURL: "http://gmall-h5-api.atguigu.cn",
    timeout: 5000
})

// 请求拦截去
request.interceptors.request.use((config) => {
    // config大当中包含一个请求头headers
    if (store.state.detail.uuid_toKen) {
        // 请求头添加一个字段（userTempId后台老师商量好的）
        config.headers.userTempId = store.state.detail.uuid_toKen
    }
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }

    // 2.nprogress进度条开始
    nprogress.start();
    return config
})




// 响应拦截器
request.interceptors.response.use((res) => {
    // 2.nprogress进度条结束
    nprogress.done();



    // 成功
    return res.data;

}, (err) => {
    // 响应失败的回调函数
    // return Promise.reject(new Error('faile'))



    // 或抛出错误
    // throw err
})

export default request