// 用来指定初始的 列数据
import i18n from '@/i18n'

const t = i18n.global.t

// 导出函数,每次国际化之后调用之后都动态获取
export default () => [
  {
    label: t('msg.article.ranking'),
    prop: 'ranking'
  },
  {
    label: t('msg.article.title'),
    prop: 'title'
  },
  {
    label: t('msg.article.author'),
    prop: 'author'
  },
  {
    label: t('msg.article.publicDate'),
    prop: 'publicDate'
  },
  {
    label: t('msg.article.desc'),
    prop: 'desc'
  },
  {
    label: t('msg.article.action'),
    prop: 'action'
  }
]
