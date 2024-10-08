// 自定义 svg 图标形式组件 // 功能: 1. 显示外部 svg 图标 // 2. 显示项目内部的
svg 图标

<template>
  <!-- 展示外部图标 -->
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    :class="className"
  ></div>
  <!-- 展示内部图标 -->
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { isExternal as external } from '@/utils/validate'

// defineProps 和 defineEmits 都是只在 <script setup> 中才能使用的编译器宏。
// 他们不需要导入且会随着 <script setup> 处理过程一同被编译掉
// import { defineProps } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  // icon 图标
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  }
})

// 获得下列三个计算属性

/**
 * 判断当前图标是否为外部图标
 * 判断当前计算属性的来源
 */
const isExternal = computed(() => external(props.icon))

/**
 * 外部图标样式
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))

/**
 * 内部图标
 */
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
