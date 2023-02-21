const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // 关闭ESLINT校验工具
    lintOnSave: false,
    // 跨域问题设置代理服务器
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             // target，目的服务器地址
    //             target: "http://gmall-h5-api.atguigu.cn",
    //             // pathRewrite: { "^/api": '' }
    //         }
    //     }
    // }
})

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'pages': '@/pages',
                'components': '@/components',
                'api': '@/api',
                'store': '@/store',
                'assets': '@/assets',
                'common': '@/common',
            }
        }
    }
}