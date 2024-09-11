import request from '@/utils/request'

/**
 * 封装登录
 * return Promise 实例
 */
export const login = data => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 * 请求拦截器统一处理 token 字段
 * return Promise 实例
 */
export const getUserInfo = () => {
  return request({
    url: '/sys/profile'
  })
}
