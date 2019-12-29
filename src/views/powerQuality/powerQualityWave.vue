<template>
  <!-- 电能质量-(谐波电流,谐波电压) path:powerQualityWave-->
  <div class="app-container">
    <TopSelect @valueChange="topSelevtChange" />
    <el-radio-group v-model="radio" class="line-radio-group" size="mini" @change="handleSetLineChartData(radio)">
      <el-radio-button label="messages">谐波电流 </el-radio-button>
      <el-radio-button label="newVisitis">谐波电压 </el-radio-button>
    </el-radio-group>
    <div v-if="radio === 'messages'" class="quality-content">

      <harmoniCurrent :select-data="selectData" />
    </div>
    <div v-if="radio === 'newVisitis'" class="quality-content">
      <harmonicVoltage :select-data="selectData" />
    </div>
  </div>
</template>

<script>
import TopSelect from './conponents/topSelect'
import harmoniCurrent from './conponents/harmoniCurrent' // 电流
import harmonicVoltage from './conponents/harmonicVoltage' // 电压

export default {
  components: { TopSelect, harmoniCurrent, harmonicVoltage },
  data() {
    return {
      timer: '',
      radio: 'messages',
      selectData: {}
    }
  },
  methods: {
    // 监听头部下拉条件及查询按钮
    topSelevtChange(data) {
      console.log(data)
      this.selectData = data
    },
    // 切换
    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type]

    }
  }
}
</script>

<style lang="scss" scoped>
.quality-content{
  font-size: 0;
  margin: 20px 0;
  label{
    text-align: right;
    font-size: 14px;
    color: #ffffff;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }

}

</style>

