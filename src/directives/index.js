// 员工信息打印：第三方打印指令
import print from 'vue3-print-nb'
import permission from './permission'

export default app => {
  // 注册使用第三方打印指令
  app.use(print)
  // 注册自定义功能权限指令，可以在所有受限功能里面使用这个指令
  app.directive('permission', permission)
}
