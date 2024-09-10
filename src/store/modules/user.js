import { login } from '@/api/sys'
import md5 from 'md5'

export default {
  namespaced: true, // 此模块的单独模块，不会被合并到主模块里面去
  state: () => ({}),
  mutations: {},
  actions: {
    /**
     * 登录请求动作
     */
    login(context, userInfo) {
      const { username, password } = userInfo
      // 无论登录成功还是失败，都希望在组建里面进行处理，
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then(data => {
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
