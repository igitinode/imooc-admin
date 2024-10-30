import { ref } from 'vue'
import Sortable from 'sortablejs'

// 排序相关
export const tableRef = ref(null)

/**
 * 初始化排序
 */
export const initSortable = (tableData, cb) => {
  // 设置拖拽效果
  const el = tableRef.value.$el.querySelectorAll(
    '.el-table__body-wrapper > table > tbody'
  )[0]
  // 1. 要拖拽的元素 el
  // 2. 配置对象 { }
  Sortable.create(el, {
    // 拖拽时类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束的回调方法
    onEnd(event) {}
  })
}
