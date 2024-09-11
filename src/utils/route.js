/**
 * import { useRouter } from 'vue-router'
 * const router = useRouter()
 * 从返回的数据来看，它与我们想要的数据结构相去甚远。
 * 出现这个问题的原因，是因为它返回的是一个"完整的路由表"
 * 这个路由表距离我们想要的存在两个问题：
 *   1. 存在重复的路由数据
 *   2. 不满足该条件 meta && meta.title && meta.icon 的数据不应该存在
 *
 * 创建 utils/route 文件，创建两个方法分别处理对应的两个问题：
 *   1. filterRouters
 *   2. generateMenus
 */

// 来自 nodejs 的 path
import path from 'path'

/**
 *
 * 所有的子集路由
 */
const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
export const filterRoutes = routes => {
  // 获取到所有的子集路由
  const childrenRoutes = getChildrenRoutes(routes)

  // 根据子集路由进行查重操作
  return routes.filter(route => {
    // 根据 route 在 childrenRoutes 中进行查重，把所有重复路由表 剔除
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 */
function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

/**
 * 根据 routes(filterRoutes) 数据，返回对应的 menu 数据规则
 * @param {*} routes 已经是 filterRoutes() 过的数据
 */
export const generateMenus = (routes, basePath = '') => {
  const result = []
  // 不满足该条件 `meta && meta.title && meta.icon` 的数据不应该存在
  // 遍历路由表
  routes.forEach(item => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 不存在 children，存在meta || 存在 children，存在meta
    // 因为最终的 menu 需要进行跳转，此时需要合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)

    // 额外处理情况
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find(item => item.path === routePath)

    // 当前路由尚未加入到 result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      // 要添加路由的条件
      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })

  return result
}
