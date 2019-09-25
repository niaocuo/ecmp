<template>
  <div>
    <div class="dataMonth">
      <el-date-picker
        v-model="value3"
        size="mini"
        class="dataMonth"
        placeholder="请选择日期"
      />
    </div>
    <div ref="chart" :class="className" :style="{height:height,width:width}" />
  </div>
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
      default: '300px'
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
      chart: null,
      value3: ''
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
          axisTick: {
            show: false
          }
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
          name: 'KW',
          axisTick: {
            show: false
          },
          splitLine: {
            show: false // 背景网格
          }
        },
        legend: {
          data: ['今天', '昨天'],
          x: '45%'
        },
        series: [{
          name: '今天', // expected
          symbol: 'none', // 去掉折线图中的节点
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              },
              areaStyle: {
                color: 'rgba(226,85,126,0.5)'
              }
            }
          },
          smooth: true,
          type: 'line',
          data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '昨天', // actual
          smooth: true,
          symbol: 'none', // 去掉折线图中的节点
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: 'rgba(56,136,250,0.5)'
              }
            }
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dataMonth{
  position: absolute;
  right: 90px;
  top: 5px;
  z-index: 9;
}
</style>
