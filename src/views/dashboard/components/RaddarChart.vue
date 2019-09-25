<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import 'echarts-liquidfill'// 在这里引入
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
      default: '300px'
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
        series: [{
          type: 'liquidFill',
          radius: '70%',
          name: 'Liquid Fill',
          data: [0.9],
          itemStyle: {
            normal: {
              color: '#2ec7c9'
            }
          },
          label: {
            normal: {
              color: '#2fc3e1', // transprant
              show: true,
              fontSize: 18,
              formatter: function(params) {
                const str = '采集成功率: ' + params.data * 100 + '%'
                return str
              }
            }
          },
          outline: {
            borderDistance: 0,
            itemStyle: {
              borderWidth: 5,
              borderColor: '#2ec7c9',
              shadowBlur: 20,
              shadowColor: 'rgba(46, 199, 201, 0.5)'
            }
          }
        }]
      })
    }
  }
}
</script>
