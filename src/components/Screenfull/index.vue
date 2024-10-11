<template>
  <div>
    <svg-icon
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="onToggle"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// 导入第三方全屏插件
import screenfull from 'screenfull'

// 是否全屏
const isFullscreen = ref(false)

// 监听 screenfull 变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// 切换事件
const onToggle = () => {
  screenfull.toggle()
}

// 设置侦听器
// on:绑定监听
onMounted(() => {
  screenfull.on('change', change)
})

// 删除侦听器
// off:取消监听
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style lang="scss" scoped></style>
