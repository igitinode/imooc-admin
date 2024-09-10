import { login } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'

export default {
  namespaced: true, // 此模块的单独模块，不会被合并到主模块里面去
  state: () => ({
    // 初始值, 刷新以及重进浏览器的时候自动获取token
    token: getItem(TOKEN) || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      // 将 token 存一份在 localStorage 中
      setItem(TOKEN, token)
    }
  },
  actions: {
    /**
     * 登录请求动作
     */
    login(context, userInfo) {
      const { username, password } = userInfo
      // 无论登录成功还是失败，都希望在组建里面进行处理，
      return new Promise((resolve, reject) => {
        login({
          icode: 'hellosunday',
          username,
          password: md5(password)
        })
          .then(data => {
            // 调用 mutations 的 setToken 方法
            // 将 token 保存在 mutations 里面
            this.commit('user/setToken', data.data.data.token)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
