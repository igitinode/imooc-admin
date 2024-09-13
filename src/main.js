import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// 导入初始化样式表
import '@/styles/index.scss'

// 导入 svgIcon
import installIcons from '@/icons'

// 导入路由鉴权
import './permission'

// 导入 i18n实例
import i18n from '@/i18n'

const app = createApp(App)
installElementPlus(app)

// 注册全局内部图标组件
installIcons(app)

app.use(store).use(router).use(i18n).mount('#app')
