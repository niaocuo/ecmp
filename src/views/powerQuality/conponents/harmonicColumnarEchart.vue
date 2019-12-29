<!--谐波柱状图-->
<template>
  <div style="margin-top:20px" :class="className" :style="{height:height,width:width}" />
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
      default: '400px'
    },
    axisData: {
      type: Array,
      default() {
        return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
      }
    },
    barData: {
      type: Object,
      default() {
        return {
          Arate: [79, 52, 200, 334, 390],
          Brate: [80, 52, 200, 334, 390],
          Crate: [79, 52, 200, 334, 390]
        }
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
          name: '最大A相电流总畸变率',
          type: 'bar',
          data: this.barData.Arate,
          animationDuration
        },
        {
          name: '最大B相电流总畸变率',
          type: 'bar',
          data: this.barData.Brate,
          animationDuration
        },
        {
          name: '最大C相电流总畸变率',
          type: 'bar',
          itemStyle: {
            color: '#e2557e' // 柱子颜色
          },
          data: this.barData.Crate,
          animationDuration
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
          right: '2%',
          bottom: '8%',
          containLabel: true
        },
        legend: {
          data: ['最大A相电流总畸变率', '最大B相电流总畸变率', '最大C相电流总畸变率'],
          x: '40%',
          y: '94%',
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [{
          type: 'category',
          data: this.axisData,
          axisTick: {
            alignWithLabel: true
          }

        }],
        yAxis: [{
          name: '%',
          type: 'value',
          axisTick: {
            show: false
          },
          splitArea: { show: false }// 网格区域
        }],
        series: this.seriesData
      })
    }
  }
}
</script>
