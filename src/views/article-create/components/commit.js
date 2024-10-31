/**
 * 因为 `markdown` 或者是 富文本 最终都会处理提交事件，所以我们可以把这两件事情合并到一个模块中实现
 */

import { createArticle, articleEdit } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
const t = i18n.global.t

// 创建文章
export const commitArticle = async data => {
  const res = await createArticle(data)
  ElMessage.success(t('msg.article.createSuccess'))
  return res
}

// 编辑文章
export const editArticle = async data => {
  const res = await articleEdit(data)
  ElMessage.success(t('msg.article.editorSuccess'))
  return res
}
