import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'userManage',
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: '/user/manage', // 用户管理
      component: () => import('@/views/user-manage/index'),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage'
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
}
