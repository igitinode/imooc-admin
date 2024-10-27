import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index'
import ArticleCreaterRouter from './modules/ArticleCreate'
import ArticleRouter from './modules/Article'
import PermissionListRouter from './modules/PermissionList'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/UserManage'

/**
 * 私有路由表：权限路由
 */
export const privateRoutes = [
  RoleListRouter,
  UserManageRouter,
  PermissionListRouter,
  ArticleCreaterRouter,
  ArticleRouter
]

/**
 * 公开路由表：无权限路由
 */
export const publicRoutes = [
  {
    path: '/login', // 登录界面
    component: () => import('@/views/login/index')
  },
  {
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    path: '/', // 首页
    redirect: '/profile', // 重定向到个人中心
    component: layout,
    children: [
      // 个人中心
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      // 404
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      // 401
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),

  // 私有路由表 和 共有路由表  进行统一的数组合并
  routes: publicRoutes
})

export default router
