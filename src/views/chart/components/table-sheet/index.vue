<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <s2 :data="sheetData"></s2>
    </el-col>
    <el-col :span="6">
      <sheet-label
        class="mb-20"
        v-for="(item, index) in regionsData"
        :key="item.id"
        :data="item"
        :isSelected="currentRegionsIndex === index"
        @click="onChangeRegion(index)"
      ></sheet-label>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import S2 from './components/S2.vue'
import SheetLabel from './components/SheetLabel.vue'
import { getChartRegions, getChartSheet } from '@/api/chart'
import { watchSwitchLang } from '@/utils/i18n'

/**
 * 获取大区数据
 */
const regionsData = ref([])
const getChartRegionsData = async () => {
  const { regions } = await getChartRegions()
  regionsData.value = regions
  // 获取该大区对应的数据
  // 等所有大区数据获取到了之后，默认先查询第一个大区的表格数据
  getChartSheetData(regionsData.value[0].id)
}
getChartRegionsData()

// 切换语言，数据重新获取
watchSwitchLang(getChartRegionsData)

// 选中高亮
// 获取大区数据
const currentRegionsIndex = ref(0)

/**
 * 切换大区
 */
const onChangeRegion = index => {
  currentRegionsIndex.value = index
  // 切换大区，重新获取该大区对应的数据
  getChartSheetData(regionsData.value[index].id)
}

/**
 * 大区对应的表格数据
 */
const sheetData = ref([])
const getChartSheetData = async id => {
  const res = await getChartSheet(id)
  sheetData.value = res
}
</script>

<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}
</style>
