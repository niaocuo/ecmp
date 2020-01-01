<template>
  <div :class="className" class="echarts" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/views/dashboard/components/mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '196px'
    }
  },
  data() {
    return {
      chart: null
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
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '0',
          textStyle: {
            color: '#fff'
          },
          data: ['峰', '谷', '平']
        },
        color: ['#d1494d', '#417336 ', '#23aae1'],
        series: [
          {
            name: '分时电量',
            center: ['50%', '44%'], // 距离左右，上下距离的百分比
            type: 'pie',
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 35, name: '峰' },
              { value: 35, name: '谷' },
              { value: 30, name: '平' }
            ]
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
</style>
