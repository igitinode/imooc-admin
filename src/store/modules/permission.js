// // 专门处理权限路由的模块
import { publicRoutes, privateRoutes } from '@/router'

export default {
  namespaced: true,
  state: () => ({
    // 路由表：初始拥有静态路由权限
    routes: publicRoutes
  }),
  mutations: {
    /**
     * 增加路由。根据后台返回的权限，动态增加到路由表里面
     */
    setRoutes(state, newRoutes) {
      // 永远在静态路由的基础上增加新路由
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限筛选路由
     * 筛选之后，获取到的需要通过 addRoute 进行添加的路由表数组
     * @param {*} menus 权限数据
     * https://router.vuejs.org/zh/api/interfaces/Router.html#Methods-addRoute
     */
    filterRoutes(context, menus) {
      const routes = []
      // 路由权限匹配
      menus.forEach(key => {
        // 权限名 与 路由的 name 匹配
        routes.push(...privateRoutes.filter(item => item.name === key))
      })
      // 最后添加 所有不匹配路由，全部进入 404的路有配置
      // 固定配置
      // 注意：该配置必须要在所有路由（动态路由）指定之后
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })

      context.commit('setRoutes', routes)

      return routes
    }
  }
}
