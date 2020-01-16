<template>
  <div>
    <div ref="chart" :class="className" :style="{height:height,width:width}" />
  </div>
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
    setOptions({ yesterday, today } = {}) {
      console.log(yesterday, today)
      this.chart.setOption({
        xAxis: {
          data: ['1', '2', '3', '4', '5', '6', '7', '8 ', '9 ', '10 ',
            '11 ', '12 ', '13 ', '14 ', '15 ', '16 ', '17 ', '18 ', '19 ', '20 ',
            '21 ', '22 ', '23 ', '24 ', '25 ', '26 ', '27 ', '28 ', '29 ', '30 ',
            '31 ', '32 ', '33 ', '34 ', '35 ', '36 ', '37 ', '38 ', '39 ', '40 ',
            '41 ', '42 ', '43 ', '44 ', '45 ', '46 ', '47 ', '48 ', '49 ', '50 ',
            '51 ', '52 ', '53 ', '54 ', '55 ', '56 ', '57 ', '58 ', '59 ', '60 ',
            '61 ', '62 ', '63 ', '64 ', '65 ', '66 ', '67 ', '68 ', '69 ', '70 ',
            '71 ', '72 ', '73 ', '74 ', '75 ', '76 ', '77 ', '78 ', '79 ', '80 ',
            '81 ', '82 ', '83 ', '84 ', '85 ', '86 ', '87 ', '88 ', '89 ', '90 ',
            '91 ', '92 ', '93 ', '94 ', '95 ', '96 '],
          boundaryGap: false,
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

          // formatter: function(par) {
          //   return `实际负荷</br>时间：${par[0].axisValue}</br> 负荷：${par[0].data}KW`
          // },
          padding: [5, 10]
        },
        yAxis: {
          name: 'KW',
          axisTick: {
            show: false
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
          data: ['昨天', '今天'],
          x: '45%',
          textStyle: {
            color: '#fff'
          }
        },
        dataZoom: [{ // 内置于坐标系中，使用户可以在坐标系上通过鼠标拖拽、鼠标滚轮、手指滑动（触屏上）来缩放或漫游坐标系
          type: 'inside',
          start: 0,
          end: 100
        }, {
          start: 0,
          end: 100,
          // handleIcon 手柄的 icon 形状，支持路径字符串
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%', //  控制手柄的尺寸，可以是像素大小，也可以是相对于 dataZoom 组件宽度的百分比，默认跟 dataZoom 宽度相同。
          handleStyle: {
            color: 'pink',
            shadowBlur: 3, // shadowBlur图片阴影模糊值，shadowColor阴影的颜色
            shadowColor: 'red',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [{
          name: '昨天', // expected
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
          data: yesterday,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '今天', // actual
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
          data: today,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
