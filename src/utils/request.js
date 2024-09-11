/**
 * 封装 axios
 */

import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'

// 判断是否超时
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(
  // 请求成功处理函数
  config => {
    // 添加 icode, 慕课网是课程菜单获取
    // 统一注人
    config.headers.icode = 'D14A56B294C3AA0D'
    // 必须返回 config

    // 在这里统一注入token
    if (store.getters.token) {
      // 请求之前统一处理是否超时登录
      if (isCheckTimeout()) {
        // 超时, 退出，token 的失效主动处理
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效, 请重新登录'))
      }

      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  // 请求失败处理函数
  error => {
    // 拦截失败处理逻辑
    ElMessage.error(error.message)
    return Promise.reject(new Error(error))
  }
)

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
