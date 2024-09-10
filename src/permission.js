// function:处理路由守卫
import router from './router'
import store from './store'

// 白名单，没有任何权限的时候也可以进入，401 404 也可以不用登录就访问
const whiteList = ['/login']

/**
 * 路由前置守卫
 * to: 要到哪里去
 * from： 你从哪里来
 * next：是否要去？
 */
router.beforeEach((to, from, next) => {
  // 1. 用户已登录，则不允许进入 login
  // 2. 用户未登录，只允许进入 login
  // 用户是否已登录，根据 token 的值
  // 快捷访问token，避免这种格式 store.state.user.token
  if (store.getters.token) {
    // 1. 用户已登录，则不允许进入 login
    if (to.path === '/login') {
      next('/')
    } else {
      // 不是的话就正常跳转
      next()
    }
  } else {
    // 用户未登录
    // 2. 用户未登录，只允许进入 login
    // 未登录，查看当前的路径是否在白名单里面, 是就允许访问
    if (whiteList.indexOf(to.path) > -1) {
      next() // 在白名单里面，直接跳转
    } else {
      next('/login') // 未登录，也不再白名单中，直接跳转到登录界面
    }
  }
})
