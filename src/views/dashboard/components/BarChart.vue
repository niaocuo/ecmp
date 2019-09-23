<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    barNumber: {
      type: String,
      default: 'one'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    axisData: {
      type: Array,
      default() {
        return ['变压器', '线路', '水浸', '烟感', '视频']
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    seriesData() {
      if (this.barNumber !== 'one') {
        return [
          {
            name: '总数',
            type: 'bar',
            data: [79, 52, 200],
            animationDuration
          }
        ]
      } else {
        return [
          {
            name: '总数',
            type: 'bar',
            data: [79, 52, 200, 334, 390],
            animationDuration
          },
          {
            name: '故障数',
            type: 'bar',
            itemStyle: {
              barBorderColor: 'tomato',
              color: 'rgba(0,0,0, 0)' // 柱子颜色
            },
            data: [79, 52, 200, 334, 390],
            animationDuration
          }
        ]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 30,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.axisData,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          name: '个',
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: this.seriesData
      })
    }
  }
}
</script>
