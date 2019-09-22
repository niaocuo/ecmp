<template>
  <div>
    <!-- 运行概况 -->
    <div class="top">
      <el-row :gutter="10">
        <el-col :span="12">
          <div id="caiji" />
        </el-col>
        <el-col :span="12">
          <div id="zhengduan" />
        </el-col>
        <el-col :span="24">
          <el-table>
            <el-table-column label="序号" width="50" />
            <el-table-column label="用户" width="50" />
            <el-table-column label="配电所" width="70" />
            <el-table-column label="设备" width="50" />
            <el-table-column label="告警类型" width="100" />
            <el-table-column label="描述" />
            <el-table-column label="发生时间" width="100" />
            <el-table-column label="处理状态" width="100" />
          </el-table>
        </el-col>
      </el-row>
    </div>
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
      var chart = echarts.init(document.getElementById('caiji'))
      var chart2 = echarts.init(document.getElementById('zhengduan'))
      const option1 = {
        tooltip: {
          trigger: 'item',
          show: false,
          formatter: '{b} : <br>{c}起({d}%)',
          backgroundColor: 'rgba(0,0,0,0.3)', // 背景
          padding: [8, 10], // 内边距
          extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.87);' // 添加阴影
        },
        color: ['#fff', '#e1e869'],
        series: [{
          type: 'pie',
          radius: ['100%', '82%'],
          // center: ['40%', '60%'],
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: 1,
            label: {
              normal: {
                formatter: '采集成功率\n\n',
                textStyle: {
                  color: '#000',
                  top: -20,
                  fontSize: 16
                }
              }
            }
          }, {
            value: 99,
            // name: '采集成功率',
            label: {
              normal: {
                formatter: '\n{c}%',
                textStyle: {
                  color: '#e1e869',
                  lineHeight: 30,
                  fontSize: 24
                }
              }
            }
          }]
        }]
      }
      const option2 = {
        tooltip: {
          trigger: 'item',
          show: false,
          formatter: '{b} : <br>{c}起({d}%)',
          backgroundColor: 'rgba(0,0,0,0.3)', // 背景
          padding: [8, 10], // 内边距
          extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.87);' // 添加阴影
        },
        color: ['#fff', '#00ffdb'],
        series: [{
          type: 'pie',
          radius: ['100%', '82%'],
          // center: ['40%', '60%'],
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: 1,
            label: {
              normal: {
                formatter: '终端在线率\n\n',
                textStyle: {
                  color: '#000',
                  top: -20,
                  fontSize: 16
                }
              }
            }
          }, {
            value: 99,
            // name: '采集成功率',
            label: {
              normal: {
                formatter: '\n{c}%',
                textStyle: {
                  color: '#00ffdb',
                  lineHeight: 30,
                  fontSize: 24
                }
              }
            }
          }]
        }]
      }
      chart.setOption(option1)
      chart2.setOption(option2)
    }
  }
}
</script>

<style lang="scss" scoped>
.top{
    padding:0, 20px
}
.top-item{
	height: 79px;
	border: solid 1px #639efc;
    padding: 30px;
    padding-top:20px;
}
.info{
    margin-top: 5px;
    text-align: right;
    font-size: 20px;
}
#caiji,#zhengduan{
    height: 129px;
    width: 129px;
    margin: 0 auto;
}
</style>
