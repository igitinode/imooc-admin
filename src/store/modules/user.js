import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { TOKEN } from '@/constant'
import router from '@/router'

// 本地缓存 LocalStorage 的操作
import { setItem, getItem, removeAllItem } from '@/utils/storage'

// 保存登录时间戳
import { setTimeStamp } from '@/utils/auth'

// 本地缓存处理方案：2- Vuex 全局状态管理
export default {
  namespaced: true, // 此模块的单独模块，不会被合并到主模块里面去
  state: () => ({
    // 初始值, 刷新以及重进浏览器的时候自动获取token
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      // 将 token 存一份在 localStorage 中
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
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
          username,
          password: md5(password)
        })
          .then(data => {
            // 调用 mutations 的 setToken 方法
            // 将 token 保存在 mutations 里面
            // 因为添加了相应拦截器 utils/request.js,
            // 所以data不用再多次... data.data.data.token

            this.commit('user/setToken', data.token)
            // 跳转到 layout 界面
            router.push('/')
            // 保存登录时间
            setTimeStamp()
            resolve()
          })
          .catch(err => {
            // 有 icode 就不用打开了
            // 开放测试数据后门
            // this.commit('user/setToken', 'ceshi-token')
            // router.push('/')
            reject(err)
          })
      })
    },
    /**
     * 获取用户信息
     */
    async getUserInfo(context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    /**
     * 退出登录
     */
    logout() {
      // 1. 清理掉当前用户缓存数据
      // 1.1 清理 token
      this.commit('user/setToken', '')
      // 1.2 清理 userInfo
      this.commit('user/setUserInfo', {})
      // 1.3 删除本地缓存
      removeAllItem()
      // 2. 清理掉权限相关配置
      // TODO
      // 返回到登录页
      router.push('/login')
    }
  }
}
