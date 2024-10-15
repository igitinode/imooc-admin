<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from './utils/theme'
import { watchSwitchLang } from './utils/i18n'

const store = useStore()
// element-plus 新主题立即生效，手动刷新也生效
generateNewStyle(store.getters.mainColor).then(nesStyle => {
  writeNewStyle(nesStyle)
})

// 更新个人信息国际化, 重新从接口获取信息
watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<style></style>
