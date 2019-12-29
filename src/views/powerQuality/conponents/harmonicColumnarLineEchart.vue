<template>
  <!-- 电能质量-电压偏差 折线 -->
  <div style="margin-top:20px;">
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
    setOptions({ THDUa, THDUb, THDUc } = {}) {
      this.chart.setOption({
        xAxis: {
          // name: 'h',
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
          left: 25,
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
        yAxis: [{
          type: 'value',
          name: '电流总谐波畸变率%',
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
          },
          splitArea: { show: false }// 网格区域
        }],
        legend: {
          data: ['THDUa', 'THDUb', 'THDUc'],
          x: '43%',
          y: '95%',
          textStyle: {
            color: '#fff'
          }
        },
        series: [{
          name: 'THDUa', // expected
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
          data: THDUa,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: 'THDUb', // actual
          smooth: true,
          symbol: 'none', // 去掉折线图中的节点
          type: 'line',
          itemStyle: {
            normal: {
              color: '#985155',
              lineStyle: {
                color: '#985155',
                width: 2
              }
            }
          },
          data: THDUb,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
        {
          name: 'THDUc', // actual
          smooth: true,
          symbol: 'none', // 去掉折线图中的节点
          type: 'line',
          itemStyle: {
            normal: {
              color: '#d96b2e',
              lineStyle: {
                color: '#d96b2e',
                width: 2
              }
            }
          },
          data: THDUc,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
