import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index'

/**
 * 私有路由表：权限路由
 */
const privateRoutes = [
  // 用户相关的
  {
    path: '/user',
    component: layout,
    redirect: '/user/manage', // 重定向
    meta: {
      title: 'user',
      icon: 'personnel'
    },
    children: [
      {
        path: '/user/manage', // 用户管理
        name: 'userManage',
        component: () => import('@/views/user-manage/index'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage'
        }
      },
      {
        path: '/user/role', // 角色列表
        name: 'userRole',
        component: () => import('@/views/role-list/index'),
        meta: {
          title: 'roleList',
          icon: 'role'
        }
      },
      {
        path: '/user/permission', // 权限列表
        name: 'userPermission',
        component: () => import('@/views/permission-list/index'),
        meta: {
          title: 'permissionList',
          icon: 'permission'
        }
      },
      {
        path: '/user/info/:id', // 用户信息
        name: 'userInfo',
        component: () => import('@/views/user-info/index'),
        // https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%B8%83%E5%B0%94%E6%A8%A1%E5%BC%8F
        // 当 props 设置为 true 时，route.params 将被设置为组件的 defineProps 定义的 props里面。
        props: true,
        meta: {
          title: 'userInfo'
        }
      },
      {
        path: '/user/import', // 导入
        name: 'import',
        component: () => import('@/views/import/index'),
        meta: {
          title: 'excelImport'
        }
      }
    ]
  },
  // article 相关的
  {
    path: '/article',
    component: layout,
    redirect: '/article/ranking', // 重定向
    meta: {
      title: 'article',
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking', // 文章排名
        name: 'articleRanking',
        component: () => import('@/views/article-ranking/index'),
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking'
        }
      },
      {
        path: '/article/:id', // 文章详情
        name: 'articleDetail',
        component: () => import('@/views/article-detail/index'),
        meta: {
          title: 'articleDetail'
        }
      },
      {
        path: '/article/create', // 文章创建
        name: 'articleCreate',
        component: () => import('@/views/article-create/index'),
        meta: {
          title: 'articleCreate',
          icon: 'article-create'
        }
      },
      {
        path: '/article/editor/:id', // 文章编辑
        name: 'articleEditor',
        component: () => import('@/views/article-create/index'),
        meta: {
          title: 'articleEditor'
        }
      }
    ]
  }
]

/**
 * 公开路由表：无权限路由
 */
const publicRoutes = [
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
  routes: [...publicRoutes, ...privateRoutes]
})

export default router
