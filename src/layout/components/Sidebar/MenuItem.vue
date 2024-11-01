<template>
  <!-- 图标 -->
  <svg-icon :icon="icon"></svg-icon>
  <!-- 文本 -->
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import {} from 'vue'
import { generateTitle } from '@/utils/i18n'

defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
