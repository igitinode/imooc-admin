import { createI18n } from 'vue-i18n'
import zhLocale from './lang/zh'
import enLocale from './lang/en'
import store from '@/store'

// 1.创建 message 数据源
const messages = {
  en: {
    msg: {
      // 结构
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

// 国际化缓存读取
function getLanguage() {
  // 有可能会是 undefined，设置一个默认值 zh
  return (store && store.getters && store.getters.language) || 'zh'
}
// 2.创建 locale 语言变量
// const locale = 'zh'

// 3.初始化 i18n 实例
const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数, 在模版中直接使用 {{ $t('msg.test') }} 访问
  globalInjection: true,
  locale: getLanguage(),
  messages
})

// 4.导出 i18n 实例  src/main.js 去注册
export default i18n
