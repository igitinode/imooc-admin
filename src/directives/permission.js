// 自定义功能权限指令8.13
// https://cn.vuejs.org/guide/reusability/custom-directives#%E7%AE%80%E4%BB%8B
// 后台接口返回个人信息数据权限格式
/**
 * {
  role: [
    {
      id: '1',
      title: '超级管理员'
    }
  ],
  _id: '671d4a40cab6e0426873d510',
  id: '612710a9ec87aa543c9c3420',
  username: 'super-admin',
  title: '超级管理员',
  avatar: 'https://res.lgdsunday.club/my-avatar.jpg',
  permission: {
    menus: [
      'userManage',
      'roleList',
      'permissionList',
      'articleRanking',
      'articleCreate'
    ],
    points: [
      'distributeRole',
      'importUser',
      'removeUser',
      'distributePermission'
    ]
  }
}
 */

import store from '@/store'
// 指令格式：v-permission="['importUser', 'removeUser']"
// binding 就是传进来的数组
function checkPermission(el, binding) {
  // 获取绑定的值，此处为权限
  const { value } = binding
  // 获取所有的功能指令/功能权限
  // points 后端返回的权限字段
  const points = store.getters.userInfo.permission.points
  // 当传入的指令集为数组时
  if (value && value instanceof Array) {
    // 匹配对应的指令
    const hasPermission = points.some(point => {
      return value.includes(point)
    })
    // 如果无法匹配，则表示当前用户无该指令，那么删除对应的功能按钮
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    // eslint-disabled-next-line
    throw new Error('v-permission value is ["admin","editor"]')
  }
}

export default {
  // 在绑定元素的父组件被挂载后调用
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  // 在包含组件的 VNode 及其子组件的 VNode 更新后调用
  update(el, binding) {
    checkPermission(el, binding)
  }
}
