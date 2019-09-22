<template>
  <div>
    <!-- 运行概况 -->
    <div class="top">
      <el-row :gutter="10">
        <el-col :span="12">
          <div class="top-item">
            <el-row :gutter="30">
              <el-col :span="12">监测点数量</el-col>
              <el-col :span="12" class="info">10个</el-col>
            </el-row>
          </div>
          <div id="caiji" />
        </el-col>
        <el-col :span="12">
          <div class="top-item">
            <el-row>
              <el-col :span="12">网关 <br>数量</el-col>
              <el-col :span="12" class="info">1台</el-col>
            </el-row>
          </div>
          <div id="zhengduan" />
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
        color: ['#333', '#e1e869'],
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
                  color: '#fff',
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
        color: ['#333', '#00ffdb'],
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
                  color: '#fff',
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
    padding: 20px
}
.top-item{
	height: 60px;
	border: solid 1px #639efc;
    padding: 10px 30px;
    // padding-top:20px;
}
.info{
    margin-top: 5px;
    text-align: right;
    font-size: 20px;
}
#caiji,#zhengduan{
    height: 119px;
    width: 119px;
    margin: 0 auto;
    margin-top: 20px;
}
</style>
