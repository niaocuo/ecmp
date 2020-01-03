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
      type: Object,
      required: true,
      default() {
        return {}
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
      return [
        {
          name: '电量',
          type: 'bar',
          yAxisIndex: 0,
          stack: 'vistors',
          barWidth: '20%',
          data: this.echartsValue.electricity,
          options:{
            tooltips:{
              enabled: false,
              custom:()=>{
                alert(2)
              }
            }
          },
          animationDuration,
        },
        {
          name: '电费',
          type: 'line',
          symbol: 'none', // 去掉折线图中的节点
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#e7b53c',
              lineStyle: {
                color: '#e7b53c',
                width: 2
              }
            }
          },
          data: this.echartsValue.yearOnYear,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }
      ]
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
          left: '0',
          right: '0',
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
          name: 'kWh',
          type: 'value',
          axisTick: {
            show: false
          },
          splitArea: { show: false }// 网格区域
        },
        {
          name: '元',
          type: 'value',
          axisTick: {
            show: false
          }
        }
        ],
        series: this.seriesData
      })
    },
    // echart hover 事件
    echartHover(params){
      console.log(params)
    }
  }
}
</script>
