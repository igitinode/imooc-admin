<template>
  <!-- 1. 创建 DOM 容器，并指定大小（指定 ref 方便获取） -->
  <div class="trend-chart-container" ref="target"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 2. 导入 `ECharts` 模块：
import * as echarts from 'echarts'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const i18n = useI18n()
// 3. 利用 echarts.init(target) 方法，获取 mChart 实例：
// target.value 获取到的是一个 DOM 节点
const target = ref(null)
let mChart
// 组件挂载之后才能获取到有效 DOM
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})

/**
 * 图表渲染方法
 */
const renderChart = () => {
  // 4. 构建 options 配置对象（echarts 渲染的核心，不同的 options 意味着不同的图表体现）
  // https://echarts.apache.org/zh/option.html#title
  const options = {
    // 11 鼠标移入之后的提示框配置
    tooltip: {
      // 鼠标移入到坐标轴时，触发提示框
      trigger: 'axis',
      // 移入坐标轴时，提示框展示内容的配置项
      axisPointer: {
        // 显示十字准星指示器
        type: 'cross',
        // 指示器样式
        crossStyle: {
          // 色值
          color: '#999'
        }
      }
    },
    // 22 图例配置
    legend: {
      // 图例数据
      data: [i18n.t('msg.chart.monthIncome'), i18n.t('msg.chart.dayIncome')],
      // 图例位置
      right: 0
    },
    // 33 echarts 网格绘制的位置，对应 上、右、下、左
    grid: {
      top: 20,
      right: 0,
      bottom: 0,
      left: 0,
      // 计算边距时，包含标签
      containLabel: true
    },
    // 44 X 轴配置
    xAxis: {
      // 坐标轴类型，category：类目轴
      type: 'category',
      // 坐标轴数据
      data: props.data.monthAmountList.map(item => item.time),
      // 刻度尺配置
      axisTick: {
        // 不显示坐标轴刻度
        show: false
      }
    },
    // 55 y 轴配置
    yAxis: {
      // Y 轴类型，value：数值轴
      type: 'value',
      // 最小值
      min: 0,
      // 最大值
      max: function (value) {
        // 取整
        return parseInt(value.max * 1.2)
      },
      // 刻度上展示的文字
      axisLabel: {
        formatter: `{value} ${i18n.t('msg.chart.unit')}`
      }
    },
    // 66 图表类型
    series: [
      // 第一个图表
      {
        // 图表名字，对应 legend.data[0]
        name: i18n.t('msg.chart.monthIncome'),
        // 图表类型
        type: 'bar',
        // 柱的宽度
        barWidth: 20,
        // 提示框展示配置
        tooltip: {
          // 提示框展示的内容
          valueFormatter: function (value) {
            return value + i18n.t('msg.chart.unit')
          }
        },
        // 数据源
        data: props.data.monthAmountList.map(item => item.amount)
      },
      // 第二个图表
      {
        // 图表名字，对应 legend.data[1]
        // 日收益曲线
        name: i18n.t('msg.chart.dayIncome'),
        // 图表类型
        type: 'line',
        // 颜色
        color: '#6EC6D0',
        // 平滑
        smooth: true,
        // 提示框展示配置
        tooltip: {
          // 提示框展示的内容
          valueFormatter: function (value) {
            return value + i18n.t('msg.chart.unit')
          }
        },
        // 数据源
        data: props.data.dailyCurve.map(item => item.amount)
      }
    ]
  }
  // 5. 最后利用 mChart.setOption 方法配置 options
  mChart.setOption(options)
}

// 国际化
watchSwitchLang(renderChart)
</script>

<style lang="scss" scoped>
.trend-chart-container {
  height: 100%;
}
</style>
