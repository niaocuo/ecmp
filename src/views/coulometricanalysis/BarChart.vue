<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/views/dashboard/components/mixins/resize'

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
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    },
    echartsValue: {
      type: Array,
      default() {
        return [79, 52, 200]
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
            name: '电量',
            type: 'bar',
            stack: 'vistors',
            barWidth: '20%',
            data: this.echartsValue,
            animationDuration
          }
        ]
      } else {
        return [
          {
            name: '电量',
            type: 'bar',
            stack: 'vistors',
            barWidth: '30%',
            data: this.echartsValue,
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
