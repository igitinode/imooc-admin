<template>
  <el-card class="container">
    <el-row :gutter="32">
      <el-col :span="6">
        <trend-data-vue :data="chartTrendData" />
      </el-col>
      <el-col :span="18">
        <trend-chart-vue :data="chartTrendData" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import trendDataVue from './trend-data.vue'
import trendChartVue from './trend-chart.vue'
</script>

<style lang="scss" scoped>
.container {
  height: 286px;
  background-color: #bcbfc3;
}
</style>
