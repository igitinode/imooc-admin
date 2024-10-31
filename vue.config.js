const { defineConfig } = require('@vue/cli-service')

// 标准路径处理函数
const path = require('path')
function resolve(dir) {
  // __dirname: 当前文件vue.config.js 文件所在的路径
  return path.join(__dirname, dir)
}

// https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
module.exports = defineConfig({
  transpileDependencies: true,

  // webpack devServer 提供了代理的功能，该代理可以把所有请求到当前服务中的请求，转发（代理）到了另外的一个服务器上
  devServer: {
    // 配置反向代理
    proxy: {
      // 当地址中有/api的时候会触发代理机制
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club/', // 要代理的服务器地址  这里不用写 api
        changeOrigin: true // 是否跨域
      }
    },
    // 方案一：直接禁止全屏运行时报错出现，非常非常暴力，但管用。报错没有消失，而是被我们隐藏了
    // https://blog.csdn.net/qq_43768851/article/details/141401708
    // client: {
    //   overlay: false
    // }

    // 方案二：只解决这一个单独的报错，其他的错误正常抛出
    // https://stackoverflow.com/questions/77201262/resizeobserver-loop-completed-with-undelivered-notifications-causing-cypress-t
    // https://webpack.js.org/configuration/dev-server/#overlay
    client: {
      overlay: {
        runtimeErrors: error => {
          const ignoreErrors = [
            'ResizeObserver loop completed with undelivered notifications.'
          ]
          return !ignoreErrors.includes(error.message)
        }
      }
    }
  },

  configureWebpack: config => {},
  chainWebpack: config => {
    // 设置 svg-sprite-loader
    // config 为 webpack 配置对象
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule('svg')
      // 忽略
      .exclude.add(resolve('src/icons'))
      // 结束
      .end()
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule('icons')
      // 正则，解析 .svg 格式文件
      .test(/\.svg$/)
      // 解析的文件
      .include.add(resolve('src/icons'))
      // 结束
      .end()
      // 新增了一个解析的loader
      .use('svg-sprite-loader')
      // 具体的loader
      .loader('svg-sprite-loader')
      // loader 的配置
      .options({
        symbolId: 'icon-[name]'
      })
      // 结束
      .end()
    // 新增规则，处理 element-plus 2 错误
    config.module
      // element-plus-2 针对什么的规则，可以自由定义
      .rule('element-plus-2')
      // 规则匹配的文件
      .test(/\.mjs$/)
      // https://webpack.docschina.org/configuration/module/#ruletype
      // javascript/auto 固定写法
      .type('javascript/auto')
      .include.add(/node_modules/)
      .end()
  }
})
