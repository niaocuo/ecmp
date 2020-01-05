<template>
  <!--
    path:transformerMonitoring:配变监测
    path:linemonitoring:线路监测
    path:switchMonitoring:开关监测
     -->
  <PageLayout :tree-data="treeData" @handleNodeClick="handleNodeClick">
    <div slot="leftTree">
      <el-form ref="treeform" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="客户名称">
          <el-input v-model="formInline.name" size="mini" style="width:150px" placeholder="客户名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="onSubmit('treeform')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div slot="rightContent" class="rightContent">
      <div ref="topsearch" class="top-search-form">
        <!-- 设备档案 -->
        <ExhArchives :equipment="equipment" :title="title" />
      </div>
      <div class="top-search-form rightContent-item">
        <!-- tab 折线图 -->
        <TablineEcharts :tabs-option="tabsOption" :mt-id="mtId" />
      </div>
    </div>
  </PageLayout>
</template>
<script>
import PageLayout from '@/components/PageLayout'
import ExhArchives from './component/ExhArchives'
import TablineEcharts from './component/TablineEcharts'
import { getTransformerByTrId } from '@/api/transformer'
import { getRbsByBsId } from '@/api/rbs'
import { getRBreakerByBreakerId } from '@/api/rBreaker'
import { getAreaToEquipmentTree } from '@/api/station'
export default {
  components: { PageLayout, ExhArchives, TablineEcharts },
  data() {
    return {
      logPageId: 1, // 树id
      treeData: [],
      formInline: {
        name: '' // 客户名称
      },
      pathName: this.$route.name,
      mtId: 0,
      equipment: {
        name: '',
        serialNumber: '',
        type: '',
        capacity: ''
      },
      title: '变压器容量'
    }
  },
  computed: {
    tabsOption() {
      let tabsOption
      const transformerMonitoringTabOption = [
        {
          label: '油温',
          name: '1'
        },
        {
          label: '功率因数',
          name: '2'
        },
        {
          label: '功率',
          name: '3'
        }
      ] // 配变监测 tabs
      const linemonitoringTabOption = [
        {
          label: '相电压',
          name: '4'
        },
        {
          label: '线电压',
          name: '5'
        },
        {
          label: '频率',
          name: '6'
        }
      ] // 线路监测 tabs
      const switchMonitoringTabOption = [
        {
          label: '电流',
          name: '7'
        },
        {
          label: '功率',
          name: '8'
        },
        {
          label: '功率因数',
          name: '9'
        }
      ] // 开关监测 tabs
      switch (this.pathName) {
        case 'transformerMonitoring': // 配变监测
          tabsOption = transformerMonitoringTabOption
          break
        case 'linemonitoring': // 线路监测
          tabsOption = linemonitoringTabOption
          break
        case 'switchMonitoring': // 开关监测
          tabsOption = switchMonitoringTabOption
          break
      }
      this.getAreaToEquipmentTree(0)
      return tabsOption
    }
  },
  methods: {
    // 搜索 ref=formName：表单名称
    onSubmit(formName) {
      console.log(formName)
    },
    // 查询左侧树数据
    async getAreaToEquipmentTree(deviceType) {
      const result = await getAreaToEquipmentTree(deviceType)
      this.treeData = result.data
    },
    // 树节点点击
    async handleNodeClick(data) {
      let result = {}
      switch (data.type) {
        case 3:
          result = await getTransformerByTrId(data.entityId)
          this.equipment.name = result.data.trName
          this.title = '变压器容量'
          this.equipment.serialNumber = result.data.trNo
          this.equipment.type = result.data.trType === '1' ? '干式' : '油浸式'
          this.equipment.capacity = result.data.trCapacity
          if (result.data.rmeteruseinfo != null) {
            this.mtId = result.data.rmeteruseinfo.mtId
          } else {
            this.mtId = 0
          }
          break
        case 4:
          result = await getRbsByBsId(data.entityId)
          this.equipment.name = result.data.bsName
          this.title = '电压等级'
          this.equipment.serialNumber = result.data.bsNo
          switch (result.data.voltType) {
            case '1':
              this.equipment.capacity = '10kV'
              break
            case '2':
              this.equipment.capacity = '0.4kV'
              break
            case '3':
              this.equipment.capacity = '0.38kV'
              break
            case '4':
              this.equipment.capacity = '0.22kV'
              break
          }
          switch (result.data.bsType) {
            case '1':
              this.equipment.type = '母线'
              break
            case '2':
              this.equipment.type = '进线'
              break
            case '3':
              this.equipment.type = '出线'
              break
            case '4':
              this.equipment.type = '电网线路'
              break
          }
          if (result.data.rmeteruseinfo != null) {
            this.mtId = result.data.rmeteruseinfo.mtId
          } else {
            this.mtId = 0
          }
          break
        case 5:
          result = await getRBreakerByBreakerId(data.entityId)
          this.equipment.name = result.data.breakerName
          this.title = '分合闸状态'
          this.equipment.serialNumber = result.data.bkNo
          switch (result.data.breakerType) {
            case '1':
              this.equipment.type = '普通开关'
              break
            case '2':
              this.equipment.type = '小车开关'
              break
            case '3':
              this.equipment.type = '母联/分段/旁路开关'
              break
            case '4':
              this.equipment.type = '变压器分支'
              break
            case '5':
              this.equipment.type = '电容器'
              break
          }
          this.equipment.capacity = result.data.status === '0' ? '分闸' : '合闸'
          if (result.data.rmeteruseinfo != null) {
            this.mtId = result.data.rmeteruseinfo.mtId
          } else {
            this.mtId = 0
          }
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.rightContent{
  &>div{
    background: #264861;
    border-radius: 10px;
    padding: 15px;
    color: #FFF;
  }
  .rowbutton{
    cursor: pointer;
    &:hover{
      color: #409EFF;
    }
  }
  .rightContent-item{
    margin-top: 15px
  }
}

</style>
<style lang="scss">
.rightContent{
  .el-form-item{
      margin-bottom: 0
    }
  .el-tabs__item{
    color: #fff;
  }
}
</style>
