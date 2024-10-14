<template>
  <div :class="{ show: isShow }" class="header-search">
    <svg-icon
      id="guide-search"
      class-name="search-icon"
      icon="search"
      @click.stop="onShowClick"
    />
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { filterRoutes } from '@/utils/route'
import { generateRoutes } from './FuseData'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
// HeaderSearch 应该具备国际化能力
import { watchSwitchLang } from '@/utils/i18n'

// 检索数据源:左侧菜单
const router = useRouter()
let searchPool = computed(() => {
  // 获得左侧菜单所有的路由
  const routes = filterRoutes(router.getRoutes())
  return generateRoutes(routes)
})

/**
 * 搜索库相关
 * 第一个参数是 list 数据源
 * 第二个参数是 配置对象
 */

let fuse
const initFuse = searchPool => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}

// 初始化 fuse
initFuse(searchPool.value)

// 控制 search 显示
const isShow = ref(false)
// el-select 实例
const headerSearchSelectRef = ref(null)
const onShowClick = () => {
  isShow.value = !isShow.value
  // 获得焦点
  headerSearchSelectRef.value.focus()
}

// search 相关
const search = ref('')
// 搜索方法
const searchOptions = ref([])
const querySearch = query => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}
// 选中回调
const onSelectChange = val => {
  router.push(val.path)
}

/**
 * 关闭 search 的处理事件
 */
const onClose = () => {
  // 失去焦点
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}

/**
 * 监听 search 打开，处理 close 事件
 */
watch(isShow, val => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

// 支持国际化，当语言变化
watchSwitchLang(() => {
  // 数据源重新赋值
  searchPool = computed(() => {
    // 获得左侧菜单所有的路由
    const routes = filterRoutes(router.getRoutes())
    return generateRoutes(routes)
  })
  // 语言切换 再次初始化 fuse
  initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
