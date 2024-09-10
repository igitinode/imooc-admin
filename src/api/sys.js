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
