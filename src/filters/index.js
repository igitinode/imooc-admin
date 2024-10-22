// 局部过滤器替代方案
// // https://v3-migration.vuejs.org/zh/breaking-changes/filters.html
import dayjs from 'dayjs'

export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }

  return dayjs(val).format(format)
}

// vue3 全局属性
// https://cn.vuejs.org/api/application#app-config
export default app => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
