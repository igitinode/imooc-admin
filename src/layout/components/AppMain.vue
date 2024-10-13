<template>
  <div class="app-main">
    <!-- 指定路由出口 -->
    <!-- 带有切换动画，并且具备组件缓存的，官方文档：代码是固定的 -->
    <router-view v-slot="{ Component, route }">
      <!-- 路由切换动画 fade-transform 来自 styles/transition -->
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { isTags } from '@/utils/tags'
import { useStore } from 'vuex'
import { generateTitle, watchSwitchLang } from '@/utils/i18n'

const route = useRoute()

/**
 * 生成 tagsView 国际化 title
 */
const getTitle = route => {
  let title = ''
  // route 有两种情况，包含 meta 和 不包含 meta
  if (!route.meta) {
    // 让当前路径的最后一个元素作为 titile
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}

// 监听路由的变化，更新 tagsView
// 存储数 tagsView 据源
const store = useStore()

watch(
  route,
  (to, from) => {
    // tagsView 并不是所有的路由都要保存，比如登录页面、404等
    if (!isTags(to.path)) return

    // to 数据太多，只需要解构需要保存的数据
    const { fullPath, meta, name, params, path, query } = to
    // 触发了添加 tagsView
    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    // 当组件被创建的时候就自动执行一次 watch，初始化
    immediate: true
  }
)

// 监听国际化回调
watchSwitchLang(() => {
  store.getters.tagsViewList.forEach((route, index) => {
    // tag 解构 route，然后重新覆盖国际化的 title
    store.commit('app/changeTagsView', {
      index,
      tag: {
        ...route,
        title: getTitle(route)
      }
    })
  })
})
</script>

<style lang="scss" scoped>
.app-main {
  // 浏览器可视区域的高度: 100vh
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
