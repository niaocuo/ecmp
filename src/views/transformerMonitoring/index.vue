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
        <ExhArchives />
      </div>
      <div class="top-search-form rightContent-item">
        <!-- tab 折线图 -->
        <TablineEcharts :tabs-option="tabsOption" :tree-node-id="Treenodeid" />
      </div>
    </div>
  </PageLayout>
</template>
<script>
import PageLayout from '@/components/PageLayout'
import ExhArchives from './component/ExhArchives'
import TablineEcharts from './component/TablineEcharts'

import { getStationTree } from '@/api/station'
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
      Treenodeid: -1
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
      return tabsOption
    }
  },

  mounted() {
    this.getStationTree()
  },
  methods: {
    // 搜索 ref=formName：表单名称
    onSubmit(formName) {
      console.log(formName)
    },
    // 查询左侧树数据
    async getStationTree() {
      const result = await getStationTree(this.logPageId)
      this.treeData = result.data
    },
    // 树节点点击
    handleNodeClick(nodedata) {
      this.Treenodeid = nodedata.id
    }
  }
}
</script>
<style lang="scss" scoped>
.rightContent{
  &>div{
    background: #fff;
    border-radius: 10px;
    padding: 15px;
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
}
</style>
