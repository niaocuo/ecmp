<template>
  <div>
    <div class="top">
      <el-row :gutter="10">
        <el-col :span="12">
          <div id="caiji" />
        </el-col>
        <el-col :span="12">
          <div id="zhengduan" />
        </el-col>
        <el-col :span="24" style="margin-top:10px">
          <el-table :data="tableData" size="mini" border style="margin-bottom:10px">
            <!-- <el-table-column label="序号" width="50" type="index" /> -->
            <el-table-column label="用户" width="120" prop="name" align="center" />
            <!-- <el-table-column label="配电所" width="70" prop="substation" align="center" /> -->
            <!-- <el-table-column label="设备" width="80" prop="equipment" align="center" /> -->
            <el-table-column label="告警类型" prop="alarmtype" align="center" />
            <!-- <el-table-column label="描述" prop="describe" align="center" /> -->
            <el-table-column label="发生时间" prop="occurrencetime" align="center" />
            <el-table-column label="处理状态" prop="processingstate" align="center" />
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
      tableData: [
        { id: '1', name: '测试用户名称', substation: '南京', equipment: '测试类型', alarmtype: '一般告警', describe: '来呢西人', occurrencetime: '2019-09-30', processingstate: '已处理' },
        { id: '1', name: '测试用户名称', substation: '南京', equipment: '测试类型', alarmtype: '一般告警', describe: '来呢西人', occurrencetime: '2019-09-30', processingstate: '已处理' },
        { id: '1', name: '测试用户名称', substation: '南京', equipment: '测试类型', alarmtype: '一般告警', describe: '来呢西人', occurrencetime: '2019-09-30', processingstate: '已处理' },
        { id: '1', name: '测试用户名称', substation: '南京', equipment: '测试类型', alarmtype: '一般告警', describe: '来呢西人', occurrencetime: '2019-09-30', processingstate: '已处理' }
      ]
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
                  fontSize: 14
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
                  fontSize: 20
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
                  fontSize: 14
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
                  fontSize: 20
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
    height: 100px;
    width: 100px;
    margin: 0 auto;
}
</style>
