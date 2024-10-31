<template>
  <!-- 全局国际化处理 -->
  <el-config-provider :locale="store.getters.language === 'en' ? en : zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from './utils/theme'
import { watchSwitchLang } from './utils/i18n'
// https://element-plus.org/zh-CN/guide/i18n.html#configprovider
// zhCn 中文
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'

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
