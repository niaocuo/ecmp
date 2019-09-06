<template>
  <div>
    <!-- 实时负荷 -->
    <div id="echart-pan" />
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
      const chart = echarts.init(document.getElementById('echart-pan'))
      // var seriesLabel = {
      //   normal: {
      //     show: true,
      //     textBorderColor: '#333',
      //     textBorderWidth: 2
      //   }
      // }
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          name: '小时',
          boundaryGap: false,
          data: ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          axisLine: {
            lineStyle: {
              color: '#fff' // 更改坐标轴颜色
            }
          }
        },
        yAxis: {
          type: 'value',
          name: 'KW',
          axisLine: {
            lineStyle: {
              color: '#fff' // 更改坐标轴颜色
            }
          },
          splitLine: {
            show: false // 背景网格
          }
        },
        series: [{
          data: [20, 232, 301, 434, 290, 330, 520, 550, 620, 680, 720],
          type: 'line',
          color: ['#2959ab'],
          symbol: 'none', // 去掉折线图中的节点
          smooth: true, // true 为平滑曲线，false为直线
          areaStyle: {
            color: '#2959ab' // 柱子颜色
          }
        }]
      }
      chart.setOption(option)
    }
  }
}
</script>
<style scoped>
#echart-pan{
    height:280px;
}
</style>
