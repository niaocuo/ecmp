<template>
  <!-- 告警记录 -->
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
        <el-form ref="rightform" :inline="true" :model="rightformInline" class="demo-form-inline">
          <el-form-item label="告警级别">
            <el-select v-model="rightformInline.alarmLevel" size="mini" style="width: 150px;" placeholder="告警级别">
              <el-option label="全部" value="all" />
              <el-option v-for="item in equipmentLevelList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="告警类别">
            <el-select v-model="rightformInline.alarmType " size="mini" style="width: 150px;" placeholder="告警类别">
              <el-option label="全部" value="all" />
              <el-option v-for="item in logTypeList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="设备类型">
            <el-select v-model="rightformInline.deviceType" size="mini" style="width: 150px;" placeholder="设备类型">
              <el-option label="全部" value="all" />
              <el-option v-for="item in equipmentTypeList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="发生时间">
            <el-date-picker v-model="rightformInline.happenTimer" size="mini" placeholder="发生时间" style="width: 150px;" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="onSubmit()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="top-search-form rightContent-item">
        <!-- 告警表格 -->
        <el-table
          v-loading="logTableListLoading"
          :data="logTableList"
          element-loading-text="Loading"
          :style="`width:100%; min-height:${tableHeight}`"
          border
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="序号" type="index" width="50" />
          <el-table-column align="center" label="用户编号" width="95" />
          <el-table-column align="center" label="用户名称" width="95" />
          <el-table-column align="center" label="告警描述" show-overflow-tooltip />
          <el-table-column align="center" label="设备类别" width="95" />
          <el-table-column align="center" label="发生值" width="63" />
          <el-table-column align="center" label="发生时间" prop="timer" width="156" />
          <el-table-column label="告警级别" width="95" align="center">
            <template slot-scope="scope">
              <span :style="scope.row.level | logLevel">{{ scope.row.level | logLevelText }}</span>
            </template>
          </el-table-column>
          <el-table-column label="处理状态" width="110" align="center">
            <template slot-scope="scope">
              {{ scope.row.pageviews }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="110" align="center">
            <template slot-scope="scope">
              <span class="rowbutton" @click="leaflets(scope.row.id)">派单</span> |
              <span class="rowbutton" @click="ignore(scope.row.id)">忽略</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </PageLayout>
</template>
<script>
import PageLayout from '@/components/PageLayout'
import { getAreaToEquipmentTree } from '@/api/station'
import { getLabesByCodeSortId } from '@/api/pcode'
import { getRAlarmInfo } from '@/api/rAlarmInfo'
export default {
  components: { PageLayout },
  filters: {
    logLevel(level) {
      switch (level) {
        case 1:
          return 'color:#909399'
        case 2:
          return 'color:#e6a23c;'
        case 3:
          return 'color:red'
      }
    },
    logLevelText(level) {
      switch (level) {
        case 1:
          return '一般告警'
        case 2:
          return '重要告警'
        case 3:
          return '紧急告警'
      }
    }
  },
  data() {
    return {
      treeData: [],
      formInline: {
        name: '' // 客户名称
      },
      rightformInline: {
        deviceId: 0,
        alarmLevel: '', // 告警级别
        alarmType: '', // 告警类别
        deviceType: '', // 设备类型
        happenTimer: '' // 发生时间
      },
      logTypeList: [],
      equipmentTypeList: [],
      equipmentLevelList: [],
      topsearchHeight: 71,
      logTableList: [
        {
          id: 1,
          timer: '2019-11-24 22:20:00',
          level: 1// 告警级别 一般告警：1
        },
        {
          id: 2,
          level: 2 // 告警级别 重要告警：2
        },
        {
          id: 3,
          level: 3 // 告警级别 紧急告警：3
        }
      ],
      logTableListLoading: true
    }
  },
  computed: {
    tableHeight() {
      // :header-cell-style="headerStyle"
      const clientHeight = document.body.clientHeight
      const tableh = clientHeight - this.topsearchHeight - 176
      return tableh + 'px'
    }
  },
  mounted() {
    this.init()
    this.getAreaToEquipmentTree()
    this.topsearchHeight = this.$refs['topsearch'].clientHeight
    // 表格数据Loading
    this.logTableListLoading = false
  },
  methods: {
    init() {
      getLabesByCodeSortId(10049).then((result) => {
        this.equipmentTypeList = result.data
      })
      getLabesByCodeSortId(10027).then((result) => {
        this.equipmentLevelList = result.data
      })
      getLabesByCodeSortId(10035).then((result) => {
        this.logTypeList = result.data
      })
    },
    // 搜索 ref=formName：表单名称
    onSubmit() {
      getRAlarmInfo(this.rightformInline).then((result) => {
        console.log(result)
      })
    },
    // 查询左侧树数据
    async getAreaToEquipmentTree() {
      const result = await getAreaToEquipmentTree()
      this.treeData = result.data
    },
    // 树节点点击
    handleNodeClick(data) {
      this.rightformInline.deviceId = data.entityId
      switch (data.type) {
        // 区划
        case 0:
          break
        // 用户
        case 1:
          break
        // 配电所
        case 2:
          break
        // 变压器
        case 3:
          this.rightformInline.deviceType = '3'
          this.onSubmit()
          break
        // 母线
        case 4:
          this.rightformInline.deviceType = '1'
          this.onSubmit()
          break
        // 开关
        case 5:
          this.rightformInline.deviceType = '2'
          this.onSubmit()
          break
      }
    },
    // 表格操作
    // leaflets: 派单
    // ignore: 忽略
    leaflets(logcolId) {

    },
    ignore(logcolId) {

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
