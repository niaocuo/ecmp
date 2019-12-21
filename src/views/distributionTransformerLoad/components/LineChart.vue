<template>
  <div>
    <div ref="chart" :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
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
      default: '400px'
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
      this.chart = echarts.init(this.$refs.chart, 'macarons')
      this.setOptions(this.chartData)
    },
    onSubmit() {

    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          name: 'h',
          data: ['1', '2', '3', '4', '5', '6', '7',
            '8', '9', '10', '11', '12', '13', '14',
            '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
          boundaryGap: false,
          nameTextStyle: {
            color: '#fff'
          },
          /* 改变x轴颜色*/
          axisLine: {
            lineStyle: {
              width: 1 // 这里是为了突出显示加上的
            }
          },
          axisLabel: {
            textStyle: {
              color: '#fff' // 坐标的字体颜色
            }
          },
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 20,
          right: 25,
          bottom: 40,
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
          name: '负载率',
          axisTick: {
            show: false
          },
          nameTextStyle: {
            color: '#fff'
          },
          /* 改变y轴颜色*/
          axisLine: {
            lineStyle: {
              width: 0 // 这里是为了突出显示加上的
            }
          },
          axisLabel: {
            textStyle: {
              color: '#fff' // 坐标的字体颜色
            }
          },
          splitLine: {
            show: false // 背景网格
          }
        },
        legend: {
          data: ['负载率'],
          x: '50%',
          y: '95%',
          textStyle: {
            color: '#fff'
          }
        },
        series: [{
          name: '负载率', // expected
          symbol: 'none', // 去掉折线图中的节点
          itemStyle: {
            normal: {
              color: 'aqua',
              lineStyle: {
                color: '#3888fa',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
