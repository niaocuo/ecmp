<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
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
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
            '12', '13', '14', '15', '16', '17', '18', '19', '20', '21',
            '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
          // boundaryGap: false,
          name: '日',
          type: 'category',
          axisPointer: {
            type: 'shadow'
          }

          // axisTick: {
          //   show: false
          // }
        },
        grid: {
          left: 10,
          right: 25,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          min: 0,
          name: 'kWh',
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['昨天', '今天']
        },
        series: [
          // {
          //   name: '昨天',

          //   itemStyle: {
          //     color: '#3ce8fc' // 柱子颜色
          //   },
          //   smooth: true,
          //   type: 'bar',
          //   data: expectedData,
          //   animationDuration: 2800,
          //   animationEasing: 'cubicInOut'
          // },
          {
            name: '今天',
            smooth: true,
            type: 'bar',
            barWidth: '50%',
            itemStyle: {
              color: '#3888fa' // 柱子颜色
            },

            // itemStyle: {
            //   normal: {
            //     color: '#3888fa',
            //     lineStyle: {
            //       color: '#3888fa',
            //       width: 2
            //     },
            //     areaStyle: {
            //       color: '#f3f8ff'
            //     }
            //   }
            // },
            data: actualData,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    }
  }
}
</script>
