<template>
  <div>
    <!-- 环境安防 -->
    <div id="echart-envir" />
  </div>
</template>
<script>
var echarts = require('echarts')
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.drawEchart()
  },
  methods: {
    drawEchart() {
      var chart = echarts.init(document.getElementById('echart-envir'))
      var seriesLabel = {
        normal: {
          show: true,
          textBorderColor: '#333',
          textBorderWidth: 2
        }
      }
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '14%',
          bottom: '3%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          name: '数量',
          // boundaryGap: [0, 0.01],
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff' // 更改坐标轴颜色
            }
          },
          splitLine: {
            show: false // 背景网格
          }
        },
        yAxis: {
          type: 'category',
          name: '设备类型',
          data: ['视频', '温湿度器', '水浸', '烟感'],
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff' // 更改坐标轴颜色
            }
          }
        },
        series: [
          {
            type: 'bar',
            data: [23, 31, 12, 50],
            itemStyle: {
              color: '#2959ab' // 柱子颜色
            },
            label: seriesLabel,
            barWidth: 30
          }
        ]
      }
      chart.setOption(option)
    }
  }
}
</script>
<style scoped>
#echart-envir{
    height:280px;
}
</style>
