import ElementPlus from 'element-plus'
// element-plus 从1.0 升级到 1.1 样式位置发生了变化
// import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/dist/index.css'

export default app => {
  app.use(ElementPlus)
}
