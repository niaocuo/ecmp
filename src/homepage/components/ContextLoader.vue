<template>
  <div>
    <!-- 配变重过载 -->
    <div id="echart-context" />
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
      const chart = echarts.init(document.getElementById('echart-context'))
      // var seriesLabel = {
      //   normal: {
      //     show: true,
      //     textBorderColor: '#333',
      //     textBorderWidth: 2
      //   }
      // }
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['变压器轻载数量', '变压器轻载数量2', '平均负载率'],
          textStyle: {// 图例文字的样式
            color: '#fff'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow'
            },
            axisLine: {
              lineStyle: {
                color: '#fff' // 更改坐标轴颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '数量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value}'
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
          {
            type: 'value',
            name: '负载率',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} %'
            },
            axisLine: {
              lineStyle: {
                color: '#fff' // 更改坐标轴颜色
              }
            }

          }
        ],
        series: [
          {
            name: '变压器轻载数量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            itemStyle: {
              color: '#3ce8fc' // 柱子颜色
            }
          },
          {
            name: '变压器轻载数量2',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            itemStyle: {
              color: '#e2557e' // 柱子颜色
            }
          },
          {
            name: '平均负载率',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
            color: ['#dbce1e']
          }
        ]
      }
      chart.setOption(option)
    }
  }
}
</script>
<style scoped>
#echart-context{
    height:257px;
}
</style>
