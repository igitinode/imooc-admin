// 说明：通过本 index.js 来注册 icons 图标
// https://webpack.docschina.org/guides/dependency-management/#requirecontext
// 通过 require.context() 函数来创建自己的 context

import SvgIcon from '@/components/SvgIcon'

// 1. 导入所有的 svg 图标
const svgRequire = require.context('./svg', false, /\.svg$/)
// 此时返回一个 require 的函数，可以接受一个 request 的参数，用于 require 的导入。
// 该函数提供了三个属性，可以通过 require.keys() 获取到所有的 svg 图标
// 遍历图标，把图标作为 request 传入到 require 导入函数中，完成本地 svg 图标的导入
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))

// 2. 完成SvgIcon 的全局注册
/**
 * 默认导出一个匿名函数，传入全局的app,向全局app注册组件
 */
export default app => {
  app.component('svg-icon', SvgIcon)
}
