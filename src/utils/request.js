/**
 * 封装 axios
 */

import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(config => {
  // 添加 icode, 慕课网是课程菜单获取
  config.headers.icode = 'D14A56B294C3AA0D'
  // 必须返回 config
  return config
})

// 响应拦截器
// http://axios-js.com/zh-cn/docs/index.html#%E6%8B%A6%E6%88%AA%E5%99%A8
service.interceptors.response.use(
  response => {
    // 拦截成功处理逻辑
    const { success, message, data } = response.data
    // 1、要根据success的成功与否决定下面的操作
    if (success) {
      return data // 成功反馈解析后的数据
    } else {
      // 失败（请求成功，业务失败），消息提示
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  error => {
    // 拦截失败处理逻辑
    ElMessage.error(error.message)
    return Promise.reject(new Error(error))
  }
)

export default service
