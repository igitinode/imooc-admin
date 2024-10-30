/**
 * 因为 `markdown` 或者是 富文本 最终都会处理提交事件，所以我们可以把这两件事情合并到一个模块中实现
 */

import { createArticle } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
const t = i18n.global.t

export const commitArticle = async data => {
  const res = await createArticle(data)
  ElMessage.success(t('msg.article.createSuccess'))
  return res
}
