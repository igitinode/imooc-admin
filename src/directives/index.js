// 员工信息打印：第三方打印指令
import print from 'vue3-print-nb'

export default app => {
  app.use(print)
}
