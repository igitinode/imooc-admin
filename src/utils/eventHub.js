// https://github.com/developit/mitt
// 作为事件中心,不同组件之间的信息通信
import mitt from 'mitt'

/**
 * 注意：
 * 这种方式在 Vue3 中，已经没有原生的实现，可以借助 mitt 进行实现。但是这种方式并不适合大范围的使用，因为很有可能会导致出现事件紊乱的错误。
 */
export default mitt()
