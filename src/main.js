import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// 导入初始化样式表
import '@/styles/index.scss'

// 导入 svgIcon
import installIcons from '@/icons'

const app = createApp(App)
installElementPlus(app)

// 注册全局内部图标组件
installIcons(app)

app.use(store).use(router).mount('#app')
