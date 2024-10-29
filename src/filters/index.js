// 局部过滤器替代方案
// https://v3-migration.vuejs.org/zh/breaking-changes/filters.html
// dayjs 是一个方法
import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'
// 导入 简体中文语言包
import 'dayjs/locale/zh-cn'
import store from '@/store'

export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

// 加载相对时间插件
dayjs.extend(rt)
// 处理相对时间
function relativeTime(val) {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs()
    .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}

// vue3 全局属性
// https://cn.vuejs.org/api/application#app-config
export default app => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
