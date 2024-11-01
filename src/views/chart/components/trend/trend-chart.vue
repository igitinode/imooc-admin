<template>
  <!-- 1. 创建 DOM 容器，并指定大小（指定 ref 方便获取） -->
  <div class="trend-chart-container" ref="target"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 2. 导入 `ECharts` 模块：
import * as echarts from 'echarts'

// 3. 利用 echarts.init(target) 方法，获取 mChart 实例：
const target = ref(null)
let mChart
// 挂载之后才能获取到 DOM
onMounted(() => {
  console.log(target.value)
  mChart = echarts.init(target.value)
  renderChart()
})

const renderChart = () => {
  // 4. 构建 options 配置对象（echarts 渲染的核心，不同的 options 意味着不同的图表体现）
  // https://echarts.apache.org/zh/option.html#title
  const options = {
    // 图表标题配置
    title: {
      // 标题文本
      text: 'ECharts 入门示例'
    },
    // 图例配置
    legend: {
      // 图例数据
      data: ['销量']
    },
    // X 轴配置
    xAxis: {
      // 数据
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    // Y 轴配置
    yAxis: [{}],
    // 图表类型（可以指定多个）
    series: [
      {
        // 图表名字，对应 legend.data[0]
        name: '销量',
        // 图表的类型
        type: 'bar',
        // 图表的数据
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  }
  // 5. 最后利用 mChart.setOption 方法配置 options
  mChart.setOption(options)
}
</script>

<style lang="scss" scoped>
.trend-chart-container {
  height: 100%;
}
</style>
