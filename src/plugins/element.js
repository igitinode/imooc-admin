import ElementPlus from 'element-plus'
// element-plus 从1.0 升级到 1.1 样式位置发生了变化
// import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/dist/index.css'

// 升级 element 引入国际化包的支持
// 切换之后，只能手动刷新浏览器才生效，这是限制
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'

import store from '@/store'

export default app => {
  app.use(ElementPlus, { locale: store.getters.language === 'en' ? en : zhCn })
}
