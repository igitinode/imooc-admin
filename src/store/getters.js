// 功能：提供快捷访问方式，减少...的引用
// 引入全局的样式变量，并提供给组件快捷访问，避免样式被绑死
import variables from '@/styles/variables.module.scss'

// 注意，getters 的属性其实是从 state 里面获取过来重新定义的
const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  /**
   *
   * @returns true 表示用户信息已存在
   */
  hasUserInfo: state => {
    // 不能简单使用 return !state.user.userInfo
    // 因为用户信息初始值是一个对象必须要格式化过,不等于空对象
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: state => variables
}

export default getters
