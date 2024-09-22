<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from './utils/theme'
const store = useStore()
// element-plus 新主题立即生效，手动刷新也生效
generateNewStyle(store.getters.mainColor).then(nesStyle => {
  writeNewStyle(nesStyle)
})
</script>

<style></style>
