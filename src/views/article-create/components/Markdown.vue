<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <!-- 提交按钮 -->
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle, editArticle } from './commit'

const props = defineProps({
  title: {
    required: true,
    type: String
  },
  detail: {
    type: Object
  }
})

const emits = defineEmits(['onSuccess'])

// Editor实例
let mkEditor
// 处理离开页面切换语言导致 dom 无法被获取
// el 等到dom渲染完成之后才能调用
let el
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})

const store = useStore()
const initEditor = () => {
  mkEditor = new MkEditor({
    el,
    height: '500px',
    // 样式
    previewStyle: 'vertical',
    // 国际化
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  // 渲染编辑器
  mkEditor.getMarkdown()
}

// 语言切换，编辑器的内部功能按钮提示也进行语言变换
watchSwitchLang(() => {
  if (!el) return
  // 先保存用户输入的内容
  const htmlStr = mkEditor.getHTML()
  // 清理掉
  mkEditor.destroy()
  initEditor()
  // 把值放回去
  mkEditor.setHTML(htmlStr)
})

// 处理提交(包含提交和编辑两种情况)
const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    // 编辑文章
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    // 创建文章
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML()
    })
  }
  // 提交成功之后，清理掉富文本的内容
  mkEditor.reset()
  emits('onSuccess')
}

// 检测数据变化，存在 detail 时，把 detail 赋值给 mkEditor
// 编辑相关
watch(
  () => props.detail,
  val => {
    if (val && val.content) {
      mkEditor.setHTML(val.content)
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
